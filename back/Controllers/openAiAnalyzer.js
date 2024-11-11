import { OpenAI } from "langchain/llms/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";

import express from 'express'
import http from 'http'
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
dotenv.config()

import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



/* Get endpoint to check current status 
app.get('/api/health', async (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
  })
})
 */
export const analyze = async (req, res) => {
    try {
  
        const llmA = new OpenAI({ modelName: "gpt-4o"});
        const chainA = loadQAStuffChain(llmA);
        const directory = path.join(__dirname, '../busquedas/', req.params.uuidSearch, '/', req.params.uuidProcess)
        const loadedVectorStore = await FaissStore.load(
          directory,
          new OpenAIEmbeddings()
          );
          const jobDescription = req.body.jobDescription
          const question = `El archivo analizado es un cv. necesito que compares el cv con la descripcion del puesto: "${jobDescription}". Devuelve un porcentaje de afinidad y una justificacion, ademas el nombre y apellido, email y telefono. formato de respuesta debe ser: cumple_los_requisitos: si o no,  coincidencia: porcetaje_de_afinidad, justificacion: justificacion del analisis, nombre: nombre del candidato, email: email del candidato, telefono: telefono del candidato. devuelve el resultado en formato json. si no sabes la respuesta. devuelve un json con el formato justificacion: no se la respuesta. no incluyas json o backticks en la respuesta`; //question goes here. 

          const result = await loadedVectorStore.similaritySearch(question, 1);
          const resA = await chainA.call({
            input_documents: result,
            question,
          });
          console.log(resA.text)
          res.json({res:JSON.parse(resA.text)}); // Send the response as JSON
    } 
      
      catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
  }