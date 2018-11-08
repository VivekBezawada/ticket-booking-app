const CONSTANTS = require('../constants').CONSTANTS;

exports.resetSeats = () => {
    let seats  = [];
    
    for(let i=0;i<CONSTANTS.TOTAL_NUMBER_OF_SEATS;i++) {
        seats[i] = 0; // Opening all Seats
    }
    
    return seats;
}