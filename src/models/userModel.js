const { Schema, model } = require("mongoose");

//Modelo que crea un objeto en base al esquema de usuario.
const userSchema = new Schema({
    name: {
        type: String,
        required: true //Required obliga a colocar este campo.
    },
    email: {
        type: String,
        required: true,
        unique: true //Permite que el correo ingresado no pueda ser repetido.
    },
    //La contraseña debería encriptarse, pero es de ejemplo.
    password: {
        type: String,
        required: true
    },
    //Un usuario puede pertenecer a varios grupos ([]).
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group", //referenciando al grupo.
    }]
}, {
    versionKey: false, //Elimina el campo __v.
    timestamps: true //Agrega el campo del tiempo de creación y de modificación
});

const User = model("User", userSchema); //User es el alias para el referencing.

module.exports = User;