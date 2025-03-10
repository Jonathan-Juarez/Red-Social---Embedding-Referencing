require('dotenv').config();
const express = require("express");
const ConnectDB = require('./config/db')
const app = express();
const userRoute = require('./routes/userRoute')
const groupRoute = require('./routes/groupRoute')
const eventRoute = require('./routes/eventRoute')

app.use(express.json()); //En este app se usará json.

app.use('/api', userRoute); //Usar ruta de usuario.
app.use('/api', groupRoute); //Usar ruta de grupo.
app.use('/api', eventRoute); //Usar ruta de evento.

//Iniciar el servidor.
const PORT = process.env.PORT || 3005
app.listen(PORT, async () => { //Escucha al port y devuelve un valor asíncrono.
    await ConnectDB();
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`); //Dirección base del servidor.
});
