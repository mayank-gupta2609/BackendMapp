const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config()
// 'mongodb://localhost:27017/mAppDB?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected")
    })
}

module.exports = connectToMongo