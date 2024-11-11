import express from 'express'
import dotenv from 'dotenv'
import router from "./Router/router.js";
import cors from 'cors'
import { connection } from './Database/db.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended : true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}))
app.use('/api',router)

app.listen(process.env.PORT, () =>{
    console.log('Corriendo en el puerto ' + process.env.PORT)
})

const  fixTimeout = async () => {
    try {
        const conn = await connection.getConnection()
        const [result] = await conn.execute('SELECT 1 + 1 AS solution')
        conn.release();
    } catch (error){
        console.log(error)
    }
    
}

setInterval(() => {
}, 10000)



