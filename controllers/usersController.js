const { Users, Thoughts } = require('../models');

module.exports = {
    //Get All Users
    async getUsers(req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({_id: req.params.userId})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });            

            if(!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create a user
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a user
    async deleteUser(req, res) {
        try {
            const user = await Users.findOneAndDelete({_id:req.params.userId});

            if (!user) {
                res.status(404).json({ message: 'No User with that ID' });
            }
            //Delete the thoughts from that user for 10 bonus points
            await Thoughts.deleteMany({_id:{$in:user.thoughts}});
            res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                {_id:req.params.userId},
                {$set: req.body},
                {runValidators:true, new:true}
            );

            if(!user) {
                res.status(404).json({ message: 'No User with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create a new friend
    async createNewFriend(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet:{friends:req.params.friendId}},
                {runValidators:true, new:true}
            );

            if(!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    //Delete a Friend
    async deleteFriend(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull:{friends:req.params.friendId}},
                {runValidators:true, new:true}
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    } 
}