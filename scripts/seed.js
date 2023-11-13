const { sql } = require('@vercel/postgres');
const {
  procesos, } = require('../app/lib/placeholder-data.js');

async function seedProcesos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS procesos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR NOT NULL,
    descripcion VARCHAR NOT NULL
  );
`;

    console.log(`Created "procesos" table`);

    const insertedProcesos = await Promise.all(
      procesos.map(
        (proceso) => {
          console.log(proceso);
          console.log(`Inserting proceso with titulo: ${proceso.titulo}`);
          return client.sql`
        INSERT INTO procesos (titulo, descripcion)
        VALUES (${proceso.titulo}, ${proceso.descripcion})
        ON CONFLICT (id) DO NOTHING;
      `;
        }),
    );

    console.log(`Seeded ${insertedProcesos.length} procesos`);

    return {
      createTable,
      procesos: insertedProcesos,
    };
  } catch (error) {
    console.error('Error seeding procesos:', error);
    throw error;
  }
}


async function main() {
  const client = await sql.connect();
  await seedProcesos(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

