const mongoose = require('mongoose');

//Schema to create the user Model
const usersSchema = new mongoose.Schema(
    {
        username: {
            type: String,            
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type:String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'thoughts' 
        }], 
        friends: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users' 
        }], 
    }
);

usersSchema.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;