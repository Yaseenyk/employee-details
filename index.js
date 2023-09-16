const express = require('express');
const Routes = require('./routes/route');
const auth = require('./routes/auth');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport');
const db = require('./Database/db');
require('./config/passport')(passport);
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',Routes);
app.use('/auth',auth);
app.use(passport.initialize())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(8000,()=>{
    console.log('server started')
})