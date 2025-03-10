const { Schema, model } = require("mongoose");

//Modelo que crea un objeto en base al esquema de grupo.
const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Descripción de grupo indefinido."
    },
    //Un grupo puede conformarse por varios miembros.
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    //Un grupo puede organizar varios eventos ([]).
    events: [{
        type: Schema.Types.ObjectId,
        ref: "Event", //referenciando al evento.
    }]
}, {
    versionKey: false, //Elimina el campo __v.
    timestamps: true //Agrega el campo del tiempo de creación y de modificación
});

const Group = model("Group", groupSchema); //Group es el alias para el referencing.

module.exports = Group;