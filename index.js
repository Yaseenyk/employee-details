const express = require('express');
const Routes = require('./routes/route');
const auth = require('./routes/auth');
const app = express();
const db = require('./Database/db');
app.use(express.json())
app.use('/',Routes)
app.use('/auth',auth);

app.listen(8000,()=>{
    console.log('server started')
})