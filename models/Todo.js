const {Schema , model} = require('mongoose');

const todoSchema = new Schema(
    {
        title: String, // no mongoose tem que declarar assim, não com '' a string
        // completed: {type: String, required: true, unique: true},
        completed: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);

module.exports = model('Todo',todoSchema);