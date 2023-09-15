const mongoose = require('mongoose');
const {DB_CONNECTION} = require('../config/config');

mongoose.connect(DB_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


const db = mongoose.connection;

db.on('error',()=>{
    console.log('Error in Connection')
});

db.once('open',()=>{
    console.log("connected to DB");
})