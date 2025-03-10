const userModel = require('../models/userModel');
const groupModel = require('../models/groupModel');

//Crear un usuario.
const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body); //Está instanciando. Deolverá a newUser lo que traiga el body teniendo presente el esquema definido.
        const userSave = await newUser.save(); //Ya no requiere createOne, solo con .save.

        const groups = req.body.groups; //Se toma el valor ingresado en el campo groups del userModel.

        //Evalua si está definido members y que el arreglo no esté vacío.
        if (groups && groups.length > 0) {
            await groupModel.updateMany(
                { _id: { $in: groups } }, //Busca entre los grupos uno que coincida con una id que está en el campo groups.
                { $push: { members: userSave._id } } //$push permite agregar el ID del miembro al campo members del groupModel sin eliminar los anteriores.
            );
        };

        res.status(201).json({
            userSave
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el usuario."
        });
    }
};

//Buscar todos los usuarios.
const findUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los usuarios."
        });
    }
};

//Buscar usuario por ID.
const findUserID = async (req, res) => {
    try {
        const user = await userModel.findByID(req.params.id);
        if (!user)
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el usuario."
        });
    }
};

//Actualizar usuario por ID.
const updateUserID = async (req, res) => {
    try {
        const userUpdated = await userModel.findByIDAndUpdate(req.params.id, req.body, { new: true }); //Todo lo que traiga el cuerpo es lo que va a actualizar y retorne el objeto actualizado.
        if (!userUpdated)
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        res.status(200).json({
            userUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el usuario."
        });
    }
};

//Eliminar usuario por ID.
const deleteUserID = async (req, res) => {
    try {
        const userDeleted = await userModel.findByIDAndDelete(req.params.id); // Eliminar el usuario por ID.
        if (!userDeleted)
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        res.status(200).json({
            userDeleted
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el usuario."
        });
    }
};

module.exports = {
    createUser,
    findUser,
    findUserID,
    updateUserID,
    deleteUserID
};