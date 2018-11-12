const mongoose = require('mongoose');
const configModel = mongoose.model('Config');
const bookingModel = mongoose.model('Booking');
const responseHandler = require('../handlers/responseHandler');
const TICKET_STATES = ['open','closed'];

exports.getTicketsInfo = async (req,res) => {
    const configData = await configModel.findOne({});

    if(!configData) {
        return responseHandler.getResponse(500, 'Unable to fetch config data',null,res);
    }

    const allTickets = configData.seats;

    let openTickets = [];
    let closedTickets = [];
    for(let i=0;i<allTickets.length;i++) {
        if(allTickets[i] == 0) {
            openTickets.push(i+1);
        } else {
            closedTickets.push(i+1);
        }
    }

    let message = 'Successfully retrieved tickets info';

    if(!openTickets.length) {
        message = 'There are no open tickets';
    }

    if(!closedTickets.length) {
        message = 'There are no closed tickets';
    }

    const ticketsInfo = req.query.ticketType == TICKET_STATES[1]?closedTickets:openTickets;

    return responseHandler.getResponse(200,message,ticketsInfo,res);
}

exports.getTicketStatus = async (req,res) => {
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

        if(req.query.getDetails) {
            if(ticketStatus == TICKET_STATES[0]) {
                return responseHandler.getResponse(200,'There is no person associated with this ticket number',null,res);
            } else {
                const bookingData = await bookingModel.findById(configData.seats[ticketNumber-1]).populate('user');

                if(!bookingData) {
                    return responseHandler.getResponse(500, 'Unable to fetch user data',null,res);
                }

                const userData = {
                    'name'  :   bookingData.user.name,
                    'age'  :   bookingData.user.age,
                    'gender'  :   bookingData.user.gender,
                    'ticketNumber' : ticketNumber,
                    'pnr' : bookingData.pnr
                }

                return responseHandler.getResponse(200,'Successfully retrieved ticket status',userData,res);
            }
        } 

        return responseHandler.getResponse(200,'Successfully retrieved ticket status',{status:ticketStatus},res);
    } else {
        return responseHandler.getResponse(200, 'Enter a valid ticket number',null,res);
    }
}