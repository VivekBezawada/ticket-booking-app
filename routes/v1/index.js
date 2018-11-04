const express = require('express');
const router = express.Router();

// Since there are very few routes, 
// all of the routes are being
// implemented in one file 
// instead of creating different folders
const errorHandler = require('../../handlers/errorHandler');

const configController = require('../../controllers/configController');
const ticketController = require('../../controllers/ticketController');

router.get('/setup',configController.setup);
// No Middleware is needed as I am verifying credentials from Config Collection
router.post('/resetSeats', errorHandler.catchErrors(configController.resetAllSeats));

router.get('/tickets', ticketController.getTicketsInfo);
router.get('/ticket/:ticketNumber', ticketController.getTicketStatus);

module.exports = router;