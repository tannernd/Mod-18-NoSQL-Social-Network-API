const mongoose = require('mongoose');
const moment = require('moment');
const reactionsSchema = require('./Reactions');



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
            get: (date) => moment(date).format('MM/DD/YYYY hh:mm:ss a')
        },
        username: {
            type:String,
            required: true
        },
        reactions:[reactionsSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
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