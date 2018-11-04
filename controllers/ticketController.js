const mongoose = require('mongoose');
const configModel = mongoose.model('Config');
const responseHandler = require('../handlers/responseHandler');

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
        message = 'There are no open tickets';
    }

    const ticketsInfo = req.query.ticketType == 'closed'?closedTickets:openTickets;

    return responseHandler.getResponse(200,message,ticketsInfo,res);
}