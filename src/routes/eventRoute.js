const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/createEvent', eventController.createEvent);
router.get('/findEvent', eventController.findEvent);
router.get('/findEvent/:id', eventController.findEventID);
router.put('/updateEvent/:id', eventController.updateEventID);
router.delete('/deleteEvent/:id', eventController.deleteEventID);

module.exports = router;