import pkg from 'pg';
let db;
const { Pool } = pkg;

export const connectDB = async () => {
  try {
    db = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'task',
      password: '1234',
      port:  5432
    });

    await db.connect();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    console.log('Disconnecting from the database...');
    await db.end();
    console.log('Disconnected from the database successfully');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    throw error;
  }
};

export const insert = async (table, data) => {
  try {
    const query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(${Object.keys(data).map((d, index) => `$${index + 1}`)}) RETURNING *`;
    const values = Object.values(data);
    console.log(`\nInsert query ->> ${query}`);
    const results = await db.query(query, values);
    return results.rows[0];
  } catch (error) {
    console.error(`\nInsert error ->> ${error}`);
    throw new Error('INTERNAL_SERVER_ERROR');
  }
};


export const insertBulk = async (table, data) =>{

  console.log('nInsertBulkdata',data)
  return new Promise((resolve, reject) => {
    const values = data.map((element) => `(${Object.values(element).map((e) => `'${String(e).replace(/'/g, "'")}'`)})`),
      query = `INSERT INTO ${table}(${Object.keys(data[0]).join(",")}) VALUES ${values.join(",")} RETURNING *`;

    console.log(`\nInsertBulk query ->> ${query}`);

    db.query(query, (error, results) => {
      if (error) {
        console.log(`\nInsertBulk error ->> ${error}`);
        return reject("INTERNAL_SERVER_ERROR");
      } else {
        return resolve(results.rows);
      }
    });
  });
}
