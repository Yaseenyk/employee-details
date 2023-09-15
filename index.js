const express = require('express');
const Routes = require('./routes/route');
const app = express();
const db = require('./Database/db');
app.use(express.json())
app.use('/',Routes)

app.listen(8000,()=>{
    console.log('server started')
})