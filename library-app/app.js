//  express
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books')
const PORTNUMBER = process.env.PORTNUMBER || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// mongoose

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => console.log("MongoDB connected") )
.catch(err => console.log(err));

// routes
app.use('/books', bookRoutes);

// render
app.get('/', (req, res)=>{
    res.render('index');
});

// port
app.listen(PORTNUMBER, () => console.log(`Server running on port ${PORTNUMBER}`));
console.log(`https://localhost:${PORTNUMBER} or http://localhost:3000`);