const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const CONSTANTS = require('../../constants').CONSTANTS;

describe.skip('Verifying APIs --> Booking APIs', function(){
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
