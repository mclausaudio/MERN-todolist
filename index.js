const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
      
var todoRoutes = require("./routes/todos");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
      
      
app.get('/', function(req, res){
    res.send("HI from expres");
});

app.use('/api/todos', todoRoutes);







     
app.listen(process.env.PORT, function() {
    console.log('Server running on ' + process.env.PORT);
})

