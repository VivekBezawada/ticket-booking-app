const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Verifying APIs --> Config', function(){
    it.skip('Reset Tickets using correct credentials returns true', function(done){
        chai.request('localhost:8081/')
            .get('/')
            .end((err,res) => {
                console.log(res);
                res.should.have.status(200)
                done();
            })
    })
})
