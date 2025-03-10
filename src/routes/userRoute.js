const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createUser', userController.createUser);
router.get('/findUser', userController.findUser);
router.get('/findUser/:id', userController.findUserID);
router.put('/updateUser/:id', userController.updateUserID);
router.delete('/deleteUser/:id', userController.deleteUserID);

module.exports = router;