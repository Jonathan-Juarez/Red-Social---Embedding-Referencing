const eventModel = require('../models/eventModel');
const groupModel = require('../models/groupModel');

//Crear un evento.
const createEvent = async (req, res) => {
    try {
        const newEvent = new eventModel(req.body); //Está instanciando. Devolverá a newEvent lo que traiga el body teniendo presente el esquema definido.
        const eventSave = await newEvent.save(); //Ya no requiere createOne, solo con .save.

        const participants = req.body.participants.map(p => p.user); //Se toma el valor ingresado en el campo participants del groupModel y obtiene los ID de los usuarios participantes.

        //Evalua si está definido participants y que el arreglo no esté vacío.
        if (participants && participants.length > 0) {
            await groupModel.updateMany(
                { members: { $in: participants } }, //Busca grupos donde los miembros coincidan con los participantes.
                { $push: { events: eventSave._id } } //$push permite agregar el ID del evento al campo events del groupModel sin eliminar los anteriores.
            );
        };

        res.status(201).json({
            eventSave
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el evento."
        });
    }
};

//Buscar todos los eventos.
const findEvent = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).json({
            events
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los eventos."
        });
    }
};

//Buscar evento por ID.
const findEventID = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event)
            return res.status(404).json({
                error: "evento no encontrado."
            });
        res.status(200).json({
            event
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el evento."
        });
    }
};

//Actualizar evento por ID.
const updateEventID = async (req, res) => {
    try {
        const eventUpdated = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); //Todo lo que traiga el cuerpo es lo que va a actualizar y retorne el objeto actualizado.
        if (!eventUpdated)
            return res.status(404).json({
                error: "evento no encontrado."
            });
        res.status(200).json({
            eventUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el evento."
        });
    }
};

//Eliminar evento por ID.
const deleteEventID = async (req, res) => {
    try {
        const eventDeleted = await eventModel.findByIdAndDelete(req.params.id); // Eliminar el evento por ID.
        if (!eventDeleted)
            return res.status(404).json({
                error: "evento no encontrado."
            });
        res.status(200).json({
            eventDeleted
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el evento."
        });
    }
};

module.exports = {
    createEvent,
    findEvent,
    findEventID,
    updateEventID,
    deleteEventID
};