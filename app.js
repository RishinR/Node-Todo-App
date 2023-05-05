const express = require('express');
const mongoose = require('mongoose');

const app = express();

//connect to mongodb
mongoose.connect('mongodb+srv://Rishin:Rishin%402002@cluster0.cfa3mts.mongodb.net/node_system', {
    useNewurlParser: true,
    useunifiedTopology: true,
});

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.use(require('./routes/index'));
app.use(require('./routes/todo'))
app.use(require('./routes/login'))
// listen to server
app.listen(3000, ()=>{
    console.log('listening on http://localhost:3000');
});