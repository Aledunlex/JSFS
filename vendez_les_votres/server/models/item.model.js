const mongoose = require('mongoose');

// definition of schema
const itemSchema = new mongoose.Schema({
    name : {
              type : String,
              required : true,
              unique : true
            },
    soldBy : {
                type : User,
                required : true
               },
    _id : {
              type : int,
              required : true
            },
    price : {
              type : int,
              required : true
            }
});


module.exports = itemSchema;

// model
const dbConnection = require('../controllers/db.controller');
const Item = dbConnection.model('Item',itemSchema,'items');

module.exports.model = Item;
