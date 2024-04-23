const express = require('express');
const path = require('path');
const routes = require('./Back/routes.js');
const db = require('./Back/bd.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/Back', express.static(path.join(__dirname, 'Back')));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
