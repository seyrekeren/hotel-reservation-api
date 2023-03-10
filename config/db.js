const mongoose = require('mongoose');

const db = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/hotel-api-db",)
    .then(() => console.log('Connected db!')).catch()
}
module.exports = db;

