const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    soldBy: {
        type: User, //jsp si ça se fait
        required: true
    },
    price: {
        type: int,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);