const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [ true, 'The thought text is mandatory' ],
            min: 1,
            max: [ 128, 'Thoughts must have a maximum of 128 characters' ]
        },
        createdAt: {
            type: Date,
            default: Default.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [ true, 'Username is required']
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(
    function() {
        return this.reactions.length;
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;