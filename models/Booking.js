const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseHidden = require('mongoose-hidden');

const bookingSchema = new Schema({
    pnr : {
        type : String,
        required : true
    }, 
    ticketNumber : {
        type : Number,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

bookingSchema.plugin(timestamps);
bookingSchema.plugin(mongooseHidden,{
    hidden:{
        _id         :   true,
        createdAt   :   true,
        updatedAt   :   true
    }
});

const Booking = mongoose.model('Booking', bookingSchema,'bookings');
module.exports = Booking;