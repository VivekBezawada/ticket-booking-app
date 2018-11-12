const mongoose = require('mongoose');
const bookingModel = mongoose.model('Booking');
const userModel = mongoose.model('User');
const configModel = mongoose.model('Config');
const sanitationHandler = require('../handlers/sanitationHandler');
const TICKET_STATES = ['open','closed'];
const responseHandler = require('../handlers/responseHandler');
const utilitiesHandler = require('../handlers/utilitiesHandler');
const randomstring = require("randomstring");

exports.updateTicket = async (req,res) => {
    const ticketNumber = req.params.ticketNumber;
    if(!ticketNumber) {
        return responseHandler.getResponse(200, 'Please provide a ticket number',null,res);
    }

    if(ticketNumber >= 1 && ticketNumber <= 40) {
        const configData = await configModel.findOne({});

        if(!configData) {
            return responseHandler.getResponse(500, 'Unable to fetch config data',null,res);
        }

        const ticketStatus = configData.seats[ticketNumber-1] == 0? TICKET_STATES[0] : TICKET_STATES[1];
        
        if(ticketStatus == TICKET_STATES[0]) {
            const userObject = sanitationHandler.verifyUserData(req.body);

            if(!userObject) {
                return responseHandler.getResponse(500, 'Some fields are missing for User Object',null,res);
            }

            const writeUserData = await new userModel(userObject).save();

            if(!writeUserData) {
                return responseHandler.getResponse(500, 'Unable to add user details',null,res);
            }

            const bookingData = {
                user : writeUserData._id,
                ticketNumber : ticketNumber,
                pnr : randomstring.generate(5)
            };

            const writeBookingData = await new bookingModel(bookingData).save();

            if(!writeBookingData) {
                return responseHandler.getResponse(500, 'Unable to add booking details',null,res);
            }

            configData.seats[ticketNumber-1] = writeBookingData._id;
            const updateConfigData = await configModel.updateOne({},{$set:{'seats':configData.seats}});

            if(!updateConfigData) {
                return responseHandler.getResponse(500, 'Unable to update ticket',null,res);
            }
            
            return responseHandler.getResponse(200,'Successfully updated ticket details',{status:true},res);
        } else {
            const query = {ticketNumber : ticketNumber, isActiveBooking : true};
            const bookingData = await bookingModel.find(query);

            if(!bookingData) {
                return responseHandler.getResponse(500, 'Booking is not found',null,res);
            }

            const updateBookingData = await bookingModel.updateOne(query,{$set:{isActiveBooking:false}});

            if(!updateBookingData) {
                return responseHandler.getResponse(500, 'Unable to update ticket',null,res);
            }
            
            configData.seats[ticketNumber-1] = 0;
            const updateConfigData = await configModel.updateOne({},{$set:{'seats':configData.seats}});

            if(!updateConfigData) {
                return responseHandler.getResponse(500, 'Unable to update ticket',null,res);
            }

            return responseHandler.getResponse(200,'Successfully updated ticket details',{status:true},res);
        }
    } else {
        return responseHandler.getResponse(200, 'Enter a valid ticket number',null,res);
    }
}