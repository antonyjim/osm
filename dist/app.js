"use strict";
exports.__esModule = true;
var express = require("express");
var routes_index_1 = require("./routes/routes.index");
var app = express();
var port = 8080;
app.use('/', routes_index_1.router);
app.listen(port, function () {
    console.log("Listening on port " + port);
});
