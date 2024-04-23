
const sqlite3 = require('sqlite3').verbose();

const BD_FILE = './Back/baseDatosSintomasEnfermedades.db';

const db = new sqlite3.Database(BD_FILE, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos.');
    }
});

module.exports = db;