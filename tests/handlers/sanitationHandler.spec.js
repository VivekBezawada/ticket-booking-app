const expect = require('chai').expect;
const sanitationHandler = require('../../handlers/sanitationHandler');

describe('Check Valid Object', function(){
    it('verify truthiness', function(){
        const data = {
            name    :   'Vivek',
            age     :   null,
            gender  :   "male"
        }
        const userObj = sanitationHandler.verifyUserData(data);
        expect(userObj).to.be.a('null');
    })

    it('incorrect object', function() {
        const data = {
            age     :   null,
            gender  :   "male"
        }
        const userObj = sanitationHandler.verifyUserData(data);
        expect(userObj).to.be.a('null');
    })

    it('not passing object', function() {
        const userObj = sanitationHandler.verifyUserData({});
        expect(userObj).to.be.a('null');
    })

    it('verify truthiness correct object', function(){
        const data = {
            name    :   'Vivek',
            age     :   23,
            gender  :   "male"
        }
        const userObj = sanitationHandler.verifyUserData(data);
        expect(userObj).to.be.not.null;
        expect(userObj).to.be.an('object');
    })
})