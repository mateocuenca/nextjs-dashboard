import { connection } from "../Database/db.js";
import { response } from "express";
import {v4 as uuidv4} from 'uuid';
import fs  from 'fs';
import { injestDocs } from "./loader.js";
import { OpenAI } from "langchain/llms/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
dotenv.config()

import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getProcesses = async (req, res = response) => {
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Process`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getProcess = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Process WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getCandidateProcess = async (req, res = response) => {

    const searchId = req.params.searchId;

    try{
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT s.id as searchId , ss.id as stateId, ss.description  FROM SearchStates ss 
                                            inner join Searches s on ss.searchId = s.id
                                            where s.uuid = '${searchId}'`);

        

        let columns = result
        console.log(columns);
        
        for (let index = 0; index < columns.length; index++) {
            let element = columns[index];
            
            const [result2] = await conn.execute(`SELECT p.id as processId, p.candidate_name as candidateName, p.candidate_phone as phone, p.candidate_email as email, p.analysys,  p.coincidence, ss.description
                                                    FROM Process p
                                                    INNER JOIN Searches s ON p.searchId = s.id
                                                    INNER JOIN SearchStates ss ON p.status = ss.id
                                                    WHERE s.uuid = '${searchId}'
                                                    And ss.id = ${element.stateId};`);

            element.cards = result2
            columns[index] = element
        }
        
        console.log(columns);
        
        
        conn.release();
        res.status(200).json(columns);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }


}

export const addProcess = async (req, res) => {
    const searchId = req.body.searchId;
    const coincidence = req.body.coincidence;
    const cv = req.body.cv;
    const analysys = req.body.analysys;
    const busqueda = req.body.busqueda
    const uuid = uuidv4()

    try {
        const nombreTemp = uuid
        const directorio = `./busquedas/${busqueda}/${nombreTemp}`

        
        if (!fs.existsSync(directorio)) {
                fs.mkdirSync(directorio); 
        }
        const filePath = path.join(directorio, 'cv.pdf');
            // Decodifica y escribe el archivo
        fs.writeFile(filePath, cv, 'base64', (err) => {
        if (err) {
            console.error('Error al guardar el archivo PDF:', err);
        } else {
            console.log('Archivo PDF guardado exitosamente en:', filePath);
        }
        });

        const conn = await connection.getConnection();

        // Obtener el Job description
        const [jobDescription] = await conn.query(
            `SELECT s.description FROM Searches s WHERE s.uuid = ?`,
            [busqueda]
        );

        await injestDocs (undefined, directorio)

        const llmA = new OpenAI({ modelName: "gpt-4o"});
        const chainA = loadQAStuffChain(llmA);
        const directory = path.join(__dirname, '../busquedas/', busqueda, '/', uuid)
        const loadedVectorStore = await FaissStore.load(
          directory,
          new OpenAIEmbeddings()
          );

          const question = `Devuelve el resultado en formato json. El archivo analizado es un cv. necesito que compares el cv con la descripcion del puesto: "${jobDescription[0].description}". Devuelve un porcentaje de afinidad sin simbolo de %, solo el numero  y una justificacion, ademas el nombre y apellido, email y telefono. formato de respuesta debe ser: cumple_los_requisitos: si o no,  coincidencia: porcetaje_de_afinidad, justificacion: justificacion del analisis, nombre: nombre del candidato, apellido: apellido del candidato, email: email del candidato, telefono: telefono del candidato. devuelve el resultado en formato json. si no sabes la respuesta. devuelve un json con el formato justificacion: no se la respuesta. no incluyas json o backticks en la respuesta`; //question goes here.

          const result = await loadedVectorStore.similaritySearch(question, 1);
          const resA = await chainA.call({
            input_documents: result,
            question,
          });
          console.log(resA.text)
          const res1 = JSON.parse(resA.text)


        const [insert] = await conn.execute('INSERT INTO Process (uuid, candidate_name, candidate_lastname, candidate_phone, candidate_email, searchId, coincidence, cv, analysys) values (?, ?, ?, ?, ?, ?, ? ,?, ?)', [uuid, res1.nombre,res1.apellido, res1.telefono, res1.email, searchId, res1.coincidencia, cv, res1.justificacion]);
        
        conn.release();

        // Obtén el ID de la fila recién insertada
        const processId = insert.insertId;


        // Determinar y asignar el estado inicial
        const [states] = await conn.query(
            `SELECT ss.id FROM SearchStates ss WHERE searchId = ? LIMIT 1`,
            [searchId]
        );

        if (states.length > 0) {
            await conn.query(
                'UPDATE Process SET status = ? WHERE id = ?',
                [states[0].id, processId]
            );
        }

        conn.release();


        res.status(200).json({
            success: true,
            processId,
            result: { nombre: res1.nombre, apellido: res1.apellido, email: res1.email, telefono: res1.telefono }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editProcess = async (req, res = response) => {
    console.log(req.body)
    const id = req.params.id;
    const fieldsToUpdate = req.body.fieldsToUpdate;
    const answers = req.body.answers
    const processId = req.body.processId


    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE Process SET ? WHERE id = ?`, [fieldsToUpdate, id]);

        // Manejo opcional de answers
        const answers = req.body.answers || [];
        const processId = req.body.processId;

        if (answers.length > 0 && processId) {
            for (let i = 0; i < answers.length; i++) {
                const [result1] = await connection.query('INSERT INTO rrhh.CandidateAnswers (processId, questionId, answerId) VALUES (?, ?, ?)', [processId, answers[i].clave, answers[i].valor]);

            }
        }

        const [search] = await connection.query(`SELECT searchId from Process p WHERE id = ?`, [ id ]);

        const [states] = await connection.query(`SELECT ss.id FROM SearchStates ss 
                                                    WHERE searchId = ?`, [ search[0].searchId]);

        // const [insertState] = await connection.query('UPDATE Process SET status =  ? WHERE id = ?', [states[0].id, id]);
;

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteProcess = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Process WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

