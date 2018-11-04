const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseHidden = require('mongoose-hidden');

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required :true
    }
})

userSchema.plugin(timestamps);
userSchema.plugin(mongooseHidden,{
    hidden:{
        _id         :   true,
        createdAt   :   true,
        updatedAt   :   true
    }
});

const User = mongoose.model('User', userSchema,'users');
module.exports = User;