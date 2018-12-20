"use strict";
exports.__esModule = true;
var path_1 = require("path");
var express = require("express");
var staticRoutes = express.Router();
exports.staticRoutes = staticRoutes;
staticRoutes.use('/', express.static(path_1.join(__dirname, path_1.join('../../public'))));
