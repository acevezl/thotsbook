const { Schema, model } = require ('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [ true, 'Username is required'],
            trim: true
        },
        email: {
            type: String,
            unique: [ true, 'This e-mail is already registered' ],
            required: [ true, 'E-mail is required' ],
            trim: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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

UserSchema.virtual('friendCount').get(
    function() {
        return this.friends.length;
    }
);

UserSchema.virtual('thoughtCount').get(
    function() {
        return this.thoughts.length;
    }
);

UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next (new Error('Username already exists'));
    } else {
        next();
    }
});

const User = model('User', UserSchema);

module.exports = User;