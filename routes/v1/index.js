const express = require('express');
const router = express.Router();

// Since there are very few routes, 
// all of the routes are being
// implemented in one file 
// instead of creating different folders
const errorHandler = require('../../handlers/errorHandler');

const configController = require('../../controllers/configController');

router.get('/setup',configController.setup);

router.post('/resetSeats', errorHandler.catchErrors(configController.resetAllSeats));

module.exports = router;