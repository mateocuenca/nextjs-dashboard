

import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import fs from 'fs'
import axios from 'axios'
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import * as dotenv from 'dotenv'
dotenv.config()

// Función para descargar el archivo desde una URL
async function downloadFile(url, dest) {
  const writer = fs.createWriteStream(dest);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  // Escribir el archivo en el sistema de archivos
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

export const injestDocs = async (url, directorio) => {
  const cvDirectory = directorio
  

  const tempFilePath = path.resolve(cvDirectory, 'cv.pdf'); // Ruta temporal

  
  //await downloadFile(url, tempFilePath);

  const loader = new PDFLoader(tempFilePath); //you can change this to any PDF file of your choice.
  const docs = await loader.load();
  console.log('docs loaded')
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const docOutput = await textSplitter.splitDocuments(docs)
  let vectorStore = await FaissStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings(),
    )
    console.log(vectorStore)
    console.log('saving...')

    await vectorStore.save(cvDirectory);
    console.log('saved!')

}



