const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const CONSTANTS = require('../../constants').CONSTANTS;

describe('Verifying APIs --> Status', function(){
    it('Returns true if application is working normally', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body.status).to.be.equal('Application is working normally');
                done();
            })
    });
})

describe.skip('Verifying APIs --> Initial Setup / Reset Seats', function(){

    let seats = [];
    for(let i=0;i<CONSTANTS.TOTAL_NUMBER_OF_SEATS;i++) {
        seats[i] = "0";
    }

    it('Returns true if the seats are of length 40 and are empty', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/v1/setup')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('result');
                expect(res.body.result.seats.length).to.be.equal(CONSTANTS.TOTAL_NUMBER_OF_SEATS);
                expect(res.body.result.seats).to.be.deep.equal(seats);
                done();
            })
    })

    it('Returns true for admin', function(done){
        chai.request(CONSTANTS.SERVER)
            .post('/v1/resetSeats')
            .send({'username':'admin', 'password':'admin123'})
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('result');
                expect(res.body.result.status).to.be.equal(true);
                done();
            })
    })

    it('Returns false for non-admin', function(done){
        chai.request(CONSTANTS.SERVER)
            .post('/v1/resetSeats')
            .send({'username':'admin', 'password':'admin1234'})
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('result');
                expect(res.body.result).to.be.null;
                done();
            })
    })
})
