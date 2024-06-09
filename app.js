if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
// app.use(bodyParser.json());



app.use('/', require('./routes/root'));
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));


mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server Listening On Port: ${PORT}`);
    });
}); 
