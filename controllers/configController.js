const mongoose = require('mongoose');
const configModel = mongoose.model('Config');
const responseHandler = require('../handlers/responseHandler');
const utilitiesHandler = require('../handlers/utilitiesHandler');
const sanitationHandler = require('../handlers/sanitationHandler');

exports.setup =async (req,res) => {
    const configObject = {
        seats       :   utilitiesHandler.resetSeats(), // Initialising or Resetting
        username    :   process.env.USERNAME,
        password    :   process.env.PASSWORD
    }
    const writeConfigObject = await new configModel(configObject).save();

    if(!writeConfigObject) {
        return responseHandler.getResponse(500, 'Unable to write Config Data',null,res);
    }
    return responseHandler.getResponse(200,'Successfully added Config Data',writeConfigObject,res);
}

exports.resetAllSeats = async (req,res) => {
    // Since this is simple test application,
    // I am not using Passport or using any sessions
    // for Authentication. Manually verifying from config
    if(!sanitationHandler.verifyConfigData(req.body)) {
        return responseHandler.getResponse(500, 'Some fields are missing',null,res);
    }

    const configData = await configModel.findOne({});

    if(!configData) {
        return responseHandler.getResponse(500, 'Unable to fetch config data',null,res);
    }

    if(configData.username == req.body.username && configData.password == req.body.password ) {
        const updateConfigOcject = await configModel.findOneAndUpdate({},utilitiesHandler.resetSeats());

        if(!updateConfigOcject) {
            return responseHandler.getResponse(500, 'Unable to update Config Data',null,res);
        }

        return responseHandler.getResponse(200,'Successfully reset Seats in Config Data',updateConfigOcject,res);
    }

    return responseHandler.getResponse(500, 'Username / Password are incorrect',null,res);
}