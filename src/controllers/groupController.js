const groupModel = require('../models/groupModel');
const userModel = require('../models/userModel');

//Crear un grupo.
const createGroup = async (req, res) => {
    try {

        const newGroup = new groupModel(req.body); //Está instanciando. Devolverá a newGroup lo que traiga el body teniendo presente el esquema definido.
        const groupSave = await newGroup.save(); //Ya no requiere createOne, solo con .save.

        const members = req.body.members; //Se toma el valor ingresado en el campo members del groupModel.

        //Evalua si está definido members y que el arreglo no esté vacío.
        if (members && members.length > 0) {
            await userModel.updateMany(
                { _id: { $in: members } }, //Busca entre los usuarios uno que coincida con una id que está en el campo members.
                { $push: { groups: groupSave._id } } //$push permite agregar el ID del grupo al campo groups del userModel sin eliminar los anteriores
            );
        };

        res.status(201).json({
            groupSave
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el grupo."
        });
    }
};

//Buscar todos los grupos.
const findGroup = async (req, res) => {
    try {
        const groups = await groupModel.find();
        res.status(200).json({
            groups
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los grupos."
        });
    }
};

//Buscar grupo por ID.
const findGroupID = async (req, res) => {
    try {
        const group = await groupModel.findByID(req.params.id);
        if (!group)
            return res.status(404).json({
                error: "grupo no encontrado."
            });
        res.status(200).json({
            group
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el grupo."
        });
    }
};

//Actualizar grupo por ID.
const updateGroupID = async (req, res) => {
    try {
        const groupUpdated = await groupModel.findByIDAndUpdate(req.params.id, req.body, { new: true }); //Todo lo que traiga el cuerpo es lo que va a actualizar y retorne el objeto actualizado.
        if (!groupUpdated)
            return res.status(404).json({
                error: "grupo no encontrado."
            });
        res.status(200).json({
            groupUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el grupo."
        });
    }
};

//Eliminar grupo por ID.
const deleteGroupID = async (req, res) => {
    try {
        const groupDeleted = await groupModel.findByIDAndDelete(req.params.id); // Eliminar el grupo por ID.
        if (!groupDeleted)
            return res.status(404).json({
                error: "grupo no encontrado."
            });
        res.status(200).json({
            groupDeleted
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el grupo."
        });
    }
};

module.exports = {
    createGroup,
    findGroup,
    findGroupID,
    updateGroupID,
    deleteGroupID
};