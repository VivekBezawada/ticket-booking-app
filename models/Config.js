const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseHidden = require('mongoose-hidden');

const configSchema = new Schema({
    seats : [{
        type : String,
        default : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }]
})

configSchema.plugin(timestamps);
configSchema.plugin(mongooseHidden,{
    hidden:{
        _id         :   true,
        createdAt   :   true,
        updatedAt   :   true
    }
});

const Config = mongoose.model('Config', configSchema,'config');
module.exports = Config;