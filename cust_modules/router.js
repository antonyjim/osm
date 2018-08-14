var express = require('express');
var fs = require('fs');

var route = express.Router();

var neo = fs.readFile('./napages/neo.json', 'utf8', function (err, data) {
    if (err) throw err;
    neo = JSON.parse(data);
});

route.get('/', function (req, res) {
    res.render('index', {
        title: 'Tire-HQ',
        neo: neo
    });
});

route.get ('/addna', function (req, res) {
    res.render('addna', {
        title: 'Add a National Account'
    })
})

route.post('/verify', function(req, res) {
    /*var newNa = {
        Name: req.body.naname,
        Number : req.body.nano,
        Nonsig : req.body.nans,
        Address : req.body.addr1,
        Address2 : req.body.addr2,
        Zip : req.body.zip,
        City : req.body.city,
        State : req.body.state,
        Req1 : req.body.req1,
        Req1P : req.body.req1p,
        Merch : req.body.authmerch
    }*/

    var newNa = req.body;

    fs.writeFile(__dirname + '/../napages/' + newNa.Number + '.json', JSON.stringify(newNa), 'utf8', err => {
        if (err) {throw err;};
    });

    res.render('nasuccess', {
        title: 'Success!',
        error: 0,
        naData: newNa
    })
    for (var data in newNa) {
        console.log(newNa[data]);
    }
})



module.exports = route;