var express = require('express');
var fs = require('fs');
var querystring = require('querystring');

var route = express.Router();

var deliveriesfile = fs.readFile('./public/deliveries/adoc.json', 'utf8', (err, data) => {
    if (err) {throw err};
    deliveriesfile = JSON.parse(data);
}) 

route.get('/', (req, res) => {
    let t = false;
    for (let a of deliveriesfile) {
        if (a.dtype == req.query.type.toUpperCase()){
            t = true;
            res.render('deliverydata/delivery', {
                title: a.ddesc,
                deliverydata: a,
                docno: req.query.docno,
                date: req.query.date,
                nano: req.query.nano
            });
            break;
        }
    } if (t == false) {
       res.render('404', {
           title: 'Not Found'
       });
    }
});

route.post('/bt', (req, res) => {
    var nabtdata;
    if (req.body.dtype.toUpperCase() == 'A') {
        var readnabtdata = new Promise ((resolve, reject) => {
            fs.readFile('./napages/' + req.body.nationalaccount + '.json', 'utf8', (err, data) => {
                if (err) {
                    reject(3);
                } else {
                    nabtdata = JSON.parse(data);
                    resolve(0);
                }
                
            });
        })

        readnabtdata.then( resolve => {
            if (!req.body.drtype) {
                res.redirect(302, '/delivery?type=a&docno=' + req.body.docno + '&date=' + req.body.date + '&nano=' + req.body.nationalaccount + '&err=2');
            } else if (!req.body.docno || !req.body.date) {
                res.redirect(302, '/delivery?type=a&docno=' + req.body.docno + '&date=' + req.body.date + '&nano=' + req.body.nationalaccount + '&err=5');
            }else {
                res.render('deliverydata/deliverybt', {
                    title: "Billing Info",
                    deliverydata: nabtdata,
                    docno: req.body.docno,
                    date: req.body.date,
                    dtype: 'a',
                    ddesc: 'National Account',
                    back: '/delivery?type=a&docno=' + req.body.docno + '&date=' + req.body.date + '&nano=' + req.body.nationalaccount,
                });
            }
        }, reason => {
            res.redirect(302, '/delivery?type=a&docno=' + req.body.docno + '&date=' + req.body.date + '&nano=' + req.body.nationalaccount + '&err=' + reason);
        });
    } else if (req.body.dtype.toUpperCase() == 'B') {
        res.render('deliverydata/deliverybt', {
            title: "Billing Info",
            docno: req.body.docno,
            date: req.body.date,
            dtype: 'b',
            ddesc: 'Government Delivery',
            back: '/delivery?type=b&docno=' + req.body.docno + '&date=' + req.body.date
        });
    } else if (req.body.dtype.toUpperCase() == 'C') {
        res.render('deliverydata/deliverybt', {
            title: "Billing Info",
            deliverydata: nabtdata,
            docno: req.body.docno,
            date: req.body.date,
            dtype: 'b',
            ddesc: 'Government Delivery',
            back: '/delivery?type=b&docno=' + req.body.docno + '&date=' + req.body.date
        });
    } else if (req.body.dtype.toUpperCase() == 'D') {
        res.render('deliverydata/deliverybt', {
            title: "Billing Info",
            deliverydata: nabtdata,
            docno: req.body.docno,
            date: req.body.date,
            dtype: 'b',
            ddesc: 'Government Delivery',
            back: '/delivery?type=b&docno=' + req.body.docno + '&date=' + req.body.date
        });
    }
    
 
    

});

module.exports = route;