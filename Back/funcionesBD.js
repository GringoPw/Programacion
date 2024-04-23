// agrgeo un nuevo sint y su rel con la enfermedad
app.post('/agregar-sintoma', (req, res) => {
    const nuevoSintoma = req.body.nuevoSintoma;
    const enfermedadId = req.body.enfermedadId;

    // agregar el nuevo síntoma y su relación con la enfermedad en la base de datos
    db.run('INSERT INTO sintomas (descripcion) VALUES (?)', [nuevoSintoma], function(err) {
        if (err) {
            console.error('Error al agregar el síntoma:', err.message);
            res.status(500).send('Error al agregar el síntoma');
            return;
        }
        
        const sintomaId = this.lastID; // Obtiene el ID del nuevo síntoma insertado
        
        // agrgeo la rel en la tabla relacionSintEnf
        db.run('INSERT INTO relacionSintEnf (sintoma_id, enfermedad_id) VALUES (?, ?)', [sintomaId, enfermedadId], function(err) {
            if (err) {
                console.error('Error al relacionar el síntoma con la enfermedad:', err.message);
                res.status(500).send('Error al relacionar el síntoma con la enfermedad');
                return;
            }

            console.log('Síntoma agregado y relacionado con la enfermedad correctamente');
            res.status(200).send('Síntoma agregado y relacionado con la enfermedad correctamente');
        });
    });
});


