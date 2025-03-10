const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/createGroup', groupController.createGroup);
router.get('/findGroup', groupController.findGroup);
router.get('/findGroup/:id', groupController.findGroupID);
router.put('/updateGroup/:id', groupController.updateGroupID);
router.delete('/deleteGroup/:id', groupController.deleteGroupID);

module.exports = router;