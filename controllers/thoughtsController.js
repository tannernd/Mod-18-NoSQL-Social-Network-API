const { Reactions, Thoughts, Users } = require('../models');

module.exports = {
    //Get All thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({_id: req.params.thoughtId})
            .select('-__v');

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            const user = await Users.findOneAndUpdate(
                {_id:req.body.userId},
                { $addToSet: { thoughts: thought._id } },
            )

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({_id:req.params.thoughtId});

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$set: req.body},
                {runValidators:true, new:true}
            );

            if(!thought) {
                res.status(404).json({ message: 'No Thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionsId } } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}