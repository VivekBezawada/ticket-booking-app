const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const CONSTANTS = require('../../constants').CONSTANTS;

describe('Verifying APIs --> Booking APIs', function(){
    it('Returns true for a valid response on update ticket', function(done){
        const userData = {
            name    :   'vivek',
            age     :   23,
            gender  :   'male'
        }
        chai.request(CONSTANTS.SERVER)
            .put('/v1/ticket/1')
            .send(userData)
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                expect(res.body.message).to.be.equal('Successfully updated ticket details');
                expect(res.body.result).to.have.property('status');
                expect(res.body.result.status).to.be.a('Boolean');
                done();
            })
    });

    it('Returns true for a valid response on update ticket with invalid payload', function(done){
        const userData = {
        }
        chai.request(CONSTANTS.SERVER)
            .put('/v1/ticket/2')
            .send(userData)
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('result');
                expect(res.body.message).to.be.equal('Some fields are missing for User Object');
                expect(res.body.result).to.be.null;
                done();
            })
    });

    it('Returns true for a valid response on update ticket with invalid ticket number', function(done){
        const userData = {
        }
        chai.request(CONSTANTS.SERVER)
            .put('/v1/ticket/test')
            .send(userData)
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
