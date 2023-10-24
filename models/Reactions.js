const mongoose = require('mongoose');
const moment = require('moment');

//Scema to create reactions subdocument
const reactionsSchema = new mongoose.Schema(
    {
        reactionId:{
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            default: () => new mongoose.Schema.Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: true, 
            max_length: 280,
        },
        username: {
            type: String, 
            required: true
        },
        createdAt:{
            type:Date,
            default: moment(),
            get: (date) => moment(date).format('MM/DD/YYYY')
        }
    }
);

module.exports = reactionsSchema