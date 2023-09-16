const express = require('express');
const Routes = require('./routes/route');
const auth = require('./routes/auth');
const app = express();
const passport = require('passport');
const db = require('./Database/db');
require('./config/passport')(passport);
app.use(express.json())
app.use('/',Routes)
app.use('/auth',auth);
app.use(passport.initialize())
app.listen(8000,()=>{
    console.log('server started')
})