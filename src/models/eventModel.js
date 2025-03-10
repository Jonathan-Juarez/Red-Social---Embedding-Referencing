const { Schema, model } = require("mongoose");

//Modelo que crea un objeto en base al esquema de grupo.
const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Descripción de evento indefinido." //Si no se especifica, colocará el mensaje default.
    },
    //Fecha del evento (no de creación o modificación).
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    //El evento puede tener varios participantes (No es lo mismo que un miembro).
    participants: [{
        user: {
            type: Schema.Types.ObjectId, //Referenciando al usuario que participará en el evento.
            required: true
        },
        statusInEvent: {
            type: String,
            default: "Inscrito" //Si no se especifica, de predeterminado estará inscrito.
        },
        role: {
            type: String,
            default: "Invitado", //Si no se especifica, se colocará como invitado.
        }
    }],
}, {
    versionKey: false, //Elimina el campo __v.
    timestamps: true //Agrega el campo del tiempo de creación y de modificación
});

const Event = model("Event", eventSchema); //Event es el alias para el referencing.

module.exports = Event;