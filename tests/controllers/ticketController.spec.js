const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const CONSTANTS = require('../../constants').CONSTANTS;

describe('Verifying APIs --> Ticket APIs', function(){
    it('Returns true for a valid response on ticket type open', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/v1/tickets')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                done();
            })
    });


    it('Returns true for a valid response on ticket type closed', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/v1/tickets?ticketType=closed')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                done();
            })
    });

    it('Returns true for a valid response on ticket status', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/v1/ticket/1')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                expect(res.body.message).to.be.equal('Successfully retrieved ticket status');
                expect(res.body.result).to.have.property('status')
                done();
            })
    });

    it('Returns true for a valid response on ticket status for invalid seat number', function(done){
        chai.request(CONSTANTS.SERVER)
            .get('/v1/ticket/hello')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                expect(res.body.message).to.be.equal('Enter a valid ticket number');
                expect(res.body.result).to.be.null;
                done();
            })
    });
})
