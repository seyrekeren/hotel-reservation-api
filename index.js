const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const db = require('./config/db.js')
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');
const userRoutes = require('./routes/user');



const app = express();

dotenv.config();
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser());


db();

const port = 3000;
app.listen(port, () => {
    console.log('server is run ',port)
})

app.use('/', authRoutes);
app.use('/', hotelRoutes);
app.use('/', roomRoutes);
app.use('/', userRoutes);