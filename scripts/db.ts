import { Proceso } from "@/app/lib/definitions";
const { sql } = require('@vercel/postgres');

async function addProceso(proceso: Proceso) {
    const client = await sql.connect();

    try {
        console.log(proceso);
        console.log(`Inserting proceso with titulo: ${proceso.titulo}`);
        console.log(`Inserting proceso with descripcion: ${proceso.descripcion}`);

        return client.sql`
        INSERT INTO procesos (titulo, descripcion)
        VALUES (${proceso.titulo}, ${proceso.descripcion})
        ON CONFLICT (id) DO NOTHING;
      `;

    } catch (error) {
        console.error('Error adding proceso:', error);
    } finally {
        await client.end();
    }
}

export { addProceso }