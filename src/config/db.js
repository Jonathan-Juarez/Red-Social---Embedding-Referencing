require("dotenv").config(); //Carga la configuración de dontenv. Una sola instancia para tod el proyecto.
const mongoose = require("mongoose");

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB mongoose.");
    } catch (error) {
        console.log("Error al conectar a MongoDB", error);
    }
}

module.exports = ConnectDB;