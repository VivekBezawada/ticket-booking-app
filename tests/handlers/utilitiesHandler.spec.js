const expect = require('chai').expect;
const utilitiesHandler = require('../../handlers/utilitiesHandler');
require('dotenv').config({path:'variables.env'});

describe('Check Reset Seats', function() {
    it ('should be the total seats', function() {
        var seats = utilitiesHandler.resetSeats();
        expect(seats).to.be.an('array');
        expect(seats).to.be.length(process.env.TOTAL_NUMBER_OF_SEATS);
    })
})