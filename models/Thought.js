const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [ true, 'Request body is missing' ],
            trim: true,
            max: [ 280, 'Reactions must have a maximum of 280 characters' ]
        },
        username: {
            type: String,
            required: [ true, 'Username is required' ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

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
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [ true, 'Username is required']
        },
        reactions: [ReactionSchema]
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