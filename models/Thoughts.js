const mongoose = require('mongoose');
const moment = require('moment');

//Scema to create reactions subdocument
const reactionsSchema = new mongoose.Schema(
    {
        reactionId:{
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true
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

//Schema to create the thoughts Model
const thoughtsSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            max_length: 280,
        },
        createdAt:{
            type:Date,
            default: moment(),
            get: (date) => moment(date).format('MM/DD/YYYY')
        },
        reactions:[reactionsSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

thoughtsSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thoughts = mongoose.model('thoughts', thoughtsSchema);

module.exports = Thoughts;