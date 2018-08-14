
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var fs = require('fs');
var route = require('./cust_modules/router.js');
var deliveries = require('./cust_modules/deliveries.js');

var app = express();
var port = '80';

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    console.log(req.headers);
    next();
})

//Set Static Files
app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use('/napages/', express.static(path.join(__dirname, 'napages')));


//Router File
app.use('/', route);
app.use('/delivery/', deliveries);
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found'
    })
})
//Functions
var normalize = function (param) {
    if (isNaN(param)) {
        return 3000;
    } else if (param == 0) {
        return 3000;
    } else {
        return param;
    }
}

app.listen(normalize(port), function() {
    console.log('Server started on port ' + normalize(port));
})

