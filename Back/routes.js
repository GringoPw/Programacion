const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("./bd.js");

router.get("/", (req, res) => {
  // Construye la ruta completa al archivo HTML
  const htmlPath = path.join(__dirname, "..", "Front", "Programa3.html");
  // Envía el archivo HTML al cliente
  res.sendFile(htmlPath);
});

router.get("/enfermedades", (req, res) => {
  db.all("SELECT * FROM enfermedades", [], (err, rows) => {
    if (err) {
      console.error("Error al obtener las enfermedades:", err.message);
      return res.status(500).send("Error al obtener las enfermedades");
    }
    res.json(rows);
  });
});

router.get("/sintomas", (req, res) => {
  // Consulta SQL para obtener todos los síntomas de todas las enfermedades
  const sql = `
        SELECT s.id AS id, s.descripcion AS sintoma
        FROM sintomas AS s

    `;

  // Ejecutar la consulta SQL
  db.all(sql, [], (err, rows) => {
    // Manejar errores
    if (err) {
      console.error("Error al obtener los síntomas:", err.message);
      return res.status(500).send("Error al obtener los síntomas");
    }

    // Enviar los resultados como respuesta en formato JSON
    res.json(rows);
  });
});

router.post("/agregar-sintomas-a-enfermedad", (req, res) => {
    const { sintomas, enfermedadId } = req.body;
    console.log("Síntomas:", sintomas);
    console.log("ID de enfermedad:", enfermedadId);

    // Insertar relaciones entre los síntomas y la enfermedad en la tabla de relación
    const insertQuery = "INSERT INTO relacionSintEnf (sintoma_id, enfermedad_id) VALUES (?, ?)";
    sintomas.forEach(sintoma => {
        db.run(insertQuery, [sintoma.id, enfermedadId], (err) => {
            if (err) {
                console.error("Error al insertar la relación entre el síntoma y la enfermedad:", err.message);
                return res.status(500).send("Error al insertar la relación entre el síntoma y la enfermedad");
            }
        });
    });

    res.status(200).send("Síntomas asociados correctamente a la enfermedad");
  
});

router.get("/agregar-enfermedad", (req, res) => {
  const nuevaEnfermedad = req.query.nombre;

  if (!nuevaEnfermedad) {
    return res.status(400).send("Debe proporcionar el nombre de la enfermedad");
  }

  db.run(
    "INSERT INTO enfermedades (nombre) VALUES (?)",
    [nuevaEnfermedad],
    function (err) {
      if (err) {
        console.error("Error al agregar la enfermedad:", err.message);
        return res.status(500).send("Error al agregar la enfermedad");
      }
      res.send(`Enfermedad "${nuevaEnfermedad}" agregada exitosamente`);
    }
  );
});

router.post("/agregar-sintoma", (req, res) => {
  const nuevoSintoma = req.body.nuevoSintoma;

  db.run(
    "INSERT INTO sintomas (descripcion) VALUES (?)",
    [nuevoSintoma],
    function (err) {
      if (err) {
        console.error("Error al agregar el síntoma:", err.message);
        res.status(500).send("Error al agregar el síntoma");
        return;
      }

      // Mensaje de éxito
      res.status(200).send("Síntoma agregado correctamente");
    }
  );
});

module.exports = router;
