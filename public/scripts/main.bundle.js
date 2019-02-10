/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/client/view/index.jsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/view/admin/Customer.jsx":
/*!********************************************!*\
  !*** ./src/client/view/admin/Customer.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Customer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.jsx */ "./src/client/view/admin/Users.jsx");
/* harmony import */ var _common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common/PillLayout.jsx */ "./src/client/view/common/PillLayout.jsx");
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../common/forms.jsx */ "./src/client/view/common/forms.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Customer =
/*#__PURE__*/
function (_Component) {
  _inherits(Customer, _Component);

  function Customer(props) {
    var _this;

    _classCallCheck(this, Customer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Customer).call(this, props));
    _this.state = {
      error: false,
      errorMessage: '',
      loaded: false,
      fields: {
        nsNonsig: '',
        nsTradestyle: ''
      },
      modifiedFields: [],
      customer: props.match.params.customer
    };

    _this.getCustomer();

    return _this;
  }

  _createClass(Customer, [{
    key: "getCustomer",
    value: function getCustomer() {
      var _this2 = this;

      _lib_API_js__WEBPACK_IMPORTED_MODULE_4__["default"].GET({
        path: '/api/q/sys_customer/' + this.state.customer,
        query: {
          fields: 'nsNonsig,nsTradeStyle,nsAddr1,nsAddr2,nsState,nsCity,nsPostalCode,nsCountry'
        }
      }).then(function (response) {
        if (response.errors.length > 0) {
          _this2.setState({
            error: true,
            errorMessage: response.errors[0].message,
            loaded: true
          });
        } else {
          _this2.setState({
            fields: response.data['sys_customer'],
            loaded: true
          });
        }
      }).catch(function (e) {
        _this2.setState({
          error: true,
          errorMessage: e.message,
          loaded: true
        });
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var state = _objectSpread({}, this.state);

      state.fields[e.target.id] = e.target.value;
      this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var pills = {
        general: {
          id: 'general',
          label: 'General',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "General Information"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
            className: "form-row",
            name: "generalInformation"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsNonsig,
            label: "Nonsig",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsTradeStyle,
            label: "Tradestyle",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsAddr1,
            label: "Address",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsAddr2,
            label: "Address (2)",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsCity,
            label: "City",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsState,
            label: "State",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsPostalCode,
            label: "Postal Code",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            id: "nsNonsig",
            value: this.state.fields.nsCountry,
            label: "Country",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            attributes: {
              readOnly: 'readonly'
            }
          })))
        },
        users: {
          id: 'users',
          label: 'Users',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Users"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, " View users associated with this customer. "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Users_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
            customer: this.props.match.params.customer
          }))
        },
        brands: {
          id: 'brands',
          label: 'Brands',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Brands"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null))
        },
        logs: {
          id: 'logs',
          label: 'History',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "History"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "View actions that have been taken on this customer"))
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        pills: pills
      }, this.state)));
    }
  }]);

  return Customer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/Customers.jsx":
/*!*********************************************!*\
  !*** ./src/client/view/admin/Customers.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../common/Table.jsx */ "./src/client/view/common/Table.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/alerts.jsx */ "./src/client/view/common/alerts.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Customers =
/*#__PURE__*/
function (_Component) {
  _inherits(Customers, _Component);

  function Customers(props) {
    var _this;

    _classCallCheck(this, Customers);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Customers).call(this, props));
    _this.state = {
      loaded: false,
      error: false,
      message: '',
      id: 'nsNonsig',
      cols: ['sys_id', 'nsNonsig', 'nsTradestyle', 'nsAddr1', 'nsCity', 'nsState'],
      customers: []
    };
    return _this;
  }

  _createClass(Customers, [{
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        message: this.state.message,
        alertType: "danger"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        table: "sys_customer_list",
        cols: this.state.cols,
        hideActions: true
      }));
    }
  }]);

  return Customers;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/**
 * queries will be set up as /api/q/:table?{query}
 * query should be formatted as query string like so:
 * columnName={eq|ne|gt|lt|gte|lte|lk|nlk}^value
 * 
 * The /api/q routes should return an object with the following metadata:
 * {
 *  error: boolean,
 *  message: 'Retrieved',
 *  route: '/api/q/{table}',
 *  result: [
 *      {results}
 * ]
 * }
 */


/* harmony default export */ __webpack_exports__["default"] = (Customers);

/***/ }),

/***/ "./src/client/view/admin/Users.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/admin/Users.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/alerts.jsx */ "./src/client/view/common/alerts.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Users =
/*#__PURE__*/
function (_Component) {
  _inherits(Users, _Component);

  function Users(props) {
    var _this;

    _classCallCheck(this, Users);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Users).call(this, props));
    _this.state = {
      id: 'sys_id',
      cols: {
        'Username': {
          boundTo: 'username',
          type: 'string',
          id: true
        },
        'First Name': {
          boundTo: 'userFirstName',
          type: 'string'
        },
        'Last Name': {
          boundTo: 'userLastName',
          type: 'string'
        },
        'Default Customer': {
          boundTo: 'userDefaultNonsig',
          type: 'string'
        },
        'Email': {
          boundTo: 'email',
          type: 'string'
        },
        'Last Login': {
          boundTo: 'userLastLogin',
          type: 'date'
        },
        'Locked': {
          boundTo: 'userIsLocked',
          type: 'boolean'
        }
      },
      users: [],
      error: false,
      loaded: false
    };

    _this.getUsers(props.customer);

    return _this;
  }

  _createClass(Users, [{
    key: "getUsers",
    value: function getUsers(customer) {
      var _this2 = this;

      if (customer) {
        var altCols = {
          'Username': {
            boundTo: 'username',
            type: 'string',
            id: true
          },
          'First Name': {
            boundTo: 'userFirstName',
            type: 'string'
          },
          'Last Name': {
            boundTo: 'userLastName',
            type: 'string'
          },
          'Customer': {
            boundTo: 'nsNonsig',
            type: 'string'
          },
          'Admin': {
            boundTo: 'nsaIsAdmin',
            type: 'boolean'
          }
        };
        _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
          path: '/api/q/sys_user_nsacl_list',
          query: {
            fields: 'sys_id,username,nsNonsig,userFirstName,userLastName,nsaIsAdmin',
            args: 'nsNonsig=eq|' + customer
          }
        }, function (err, response) {
          if (err) {
            _this2.setState({
              error: err.message,
              loaded: true,
              cols: altCols
            });

            return 1;
          }

          if (response && response.data && response.data.sys_user_nsacl_list) {
            _this2.setState({
              users: response.data.sys_user_nsacl_list,
              error: false,
              loaded: true,
              cols: altCols
            });
          } else {
            _this2.setState({
              error: 'No data found',
              loaded: true,
              cols: altCols
            });
          }
        });
      } else {
        _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
          path: '/api/q/sys_user_list',
          query: {
            fields: 'userId,username,email,userDefaultNonsig,userLastLogin,userDefaultNonsig,userFirstName,userLastName,userIsLocked'
          }
        }, function (err, response) {
          if (err) {
            _this2.setState({
              error: err.message,
              loaded: true
            });

            return 1;
          }

          if (response && response.data && response.data.sys_user_list) {
            _this2.setState({
              users: response.data.sys_user_list,
              error: false,
              loaded: true
            });
          } else {
            _this2.setState({
              error: 'No data found',
              loaded: true
            });
          }
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();
      console.log(e);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        message: this.state.error,
        alertType: "danger"
      }), this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        cols: this.state.cols,
        rows: this.state.users,
        id: this.state.id,
        onClick: this.handleClick.bind(this),
        baseURL: "/admin/user/"
      }));
    }
  }]);

  return Users;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Users);

/***/ }),

/***/ "./src/client/view/common/PillLayout.jsx":
/*!***********************************************!*\
  !*** ./src/client/view/common/PillLayout.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pills; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Pills =
/*#__PURE__*/
function (_Component) {
  _inherits(Pills, _Component);

  function Pills(props) {
    var _this;

    _classCallCheck(this, Pills);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pills).call(this, props));
    _this.state = _objectSpread({}, props);

    if (!props.pills) {
      throw new Error('Pills must be provided as a prop to the <Pills /> Component.');
    }

    props.handleLoad ? props.handleLoad() : void 0;
    return _this;
  }

  _createClass(Pills, [{
    key: "render",
    value: function render() {
      var pills = _objectSpread({}, this.state.pills);

      var pillAs = [];
      var pillBodies = [];
      Object.keys(pills).map(function (pill, key) {
        if (key === 0) {
          // First pill is active by default
          pillAs.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            key:
            /* key * Date.now() + (~~Math.random() * 10000)*/
            pills[pill].id + '-tab',
            className: "nav-link active",
            id: pills[pill].id + '-tab',
            "data-toggle": "pill",
            href: '#' + pills[pill].id,
            role: "tab",
            "aria-controls": pills[pill].id,
            "aria-selected": "true"
          }, pills[pill].label));
          pillBodies.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: pills[pill].id,
            className: "tab-pane fade show active",
            id: pills[pill].id,
            role: "tabpanel",
            "aria-labelledby": pills[pill].id + '-tab'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-10 col-md-11 col-sm-12 pt-4"
          }, pills[pill].body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col"
          }))));
        } else {
          pillAs.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            key:
            /* key * Date.now() + (~~Math.random() * 1000)*/
            pills[pill].id + '-tab',
            className: "nav-link",
            id: pills[pill].id + '-tab',
            "data-toggle": "pill",
            href: '#' + pills[pill].id,
            role: "tab",
            "aria-controls": pills[pill].id,
            "aria-selected": "false"
          }, pills[pill].label));
          pillBodies.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: pills[pill].id,
            className: "tab-pane fade",
            id: pills[pill].id,
            role: "tabpanel",
            "aria-labelledby": pills[pill].id + '-tab'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-10 col-md-11 col-sm-12 pt-4"
          }, pills[pill].body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col"
          }))));
        }
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid",
        style: {
          minHeight: '80vh'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row mt-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3 col-sm-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "nav flex-column nav-pills",
        id: "v-pills",
        role: "tablist",
        "aria-orientation": "vertical"
      }, pillAs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9 col-sm-12 mb-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-content",
        id: "v-pill-tabContent"
      }, pillBodies))));
    }
  }]);

  return Pills;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/common/Suspense.jsx":
/*!*********************************************!*\
  !*** ./src/client/view/common/Suspense.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SuspenseLoader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SuspenseLoader =
/*#__PURE__*/
function (_Component) {
  _inherits(SuspenseLoader, _Component);

  function SuspenseLoader(props) {
    _classCallCheck(this, SuspenseLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(SuspenseLoader).call(this, props));
  }

  _createClass(SuspenseLoader, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...");
    }
  }]);

  return SuspenseLoader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/common/Table.jsx":
/*!******************************************!*\
  !*** ./src/client/view/common/Table.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Table; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/API */ "./src/client/view/lib/API.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var TableRow =
/*#__PURE__*/
function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableRow).call(this, props));
  }

  _createClass(TableRow, [{
    key: "render",
    value: function render() {
      var _this = this;

      var cells = [];

      if (this.props.showSelect) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          key: Math.floor(Math.random() * 10000)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          className: "position-static",
          type: "checkbox",
          value: this.props.cells && this.props.cells[this.props.id]
        })));
      }

      Object.keys(this.props.cols).map(function (col) {
        var val = _this.props.cells[_this.props.cols[col].boundTo];
        var type = _this.props.cols[col].type;

        if (_this.props.cols[col].id || _this.props.cols[col].linkable) {
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            key: Math.floor(Math.random() * 10000)
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
            to: _this.props.cols[col].baseURL + _this.props.cells[_this.props.id]
          }, val || '')));
        } else if (type && type.toLowerCase() === 'date') {
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            key: 'row' + Math.floor(Math.random() * 10000)
          }, new Date(val).toDateString() || ''));
        } else if (type && type.toLowerCase() === 'boolean') {
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            key: Math.floor(Math.random() * 10000),
            style: {
              textAlign: 'center',
              fontSize: '20px'
            }
          }, val === true || val === 1 && '×' || ''));
        } else {
          cells.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            key: Math.floor(Math.random() * 10000)
          }, val || ''));
        }
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, cells);
    }
  }]);

  return TableRow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/**
 * Show a list view from a table prop
 */


var Table =
/*#__PURE__*/
function (_Component2) {
  _inherits(Table, _Component2);

  /**
   * The options that can be passed to <Table/> are:
   * cols: an object describing the column headers
   * rows: an array of data
   * handleClick: <depreciated> handle to be passed to the ID column
   * baseURL: where to redirect users upon clicking the ID column
   * hideActions: Hide the actions select element and the checkboxes
   * table: the name of the database table
   * @param {object} props 
   */
  function Table(props) {
    var _this2;

    _classCallCheck(this, Table);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));
    _this2.state = {
      cols: props.cols,
      rows: props.rows,
      handleClick: props.onClick,
      id: props.id,
      baseURL: props.baseURL,
      hideActions: props.hideActions || false,
      table: props.table,
      offset: 0,
      nextOffset: props.perPage || 20,
      from: 0,
      perPage: props.perPage || 20,
      loaded: false
    };

    if (_this2.props.args) {
      var flatArgs = '';
      Object.keys(_this2.props.args).map(function (arg) {
        flatArgs += "".concat(arg, "=").concat(_this2.props.args[arg]);
      });
      _this2.state.args = flatArgs;
    }

    if (!props.cols && !props.rows && props.table) _this2.getCols(); // Retrieve the column information from /api/q/describe
    else if (props.cols && !props.rows && props.table) _this2.getCols(props.cols);else _this2.state.loaded = true; // Show data with the provided rows and column headers

    return _this2;
  }

  _createClass(Table, [{
    key: "getCols",
    value: function getCols() {
      var _this3 = this;

      _lib_API__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
        path: '/api/q/describe/' + this.state.table
      }).then(function (response) {
        if (response.cols && _this3.props.cols) {
          var allowedCols = {};
          Object.keys(response.cols).map(function (col) {
            if (_this3.props.cols.includes(response.cols[col].boundTo) || response.id === response.cols[col].boundTo) {
              allowedCols[col] = response.cols[col];
            }
          });

          _this3.setState({
            cols: allowedCols,
            id: response.id
          });
        } else if (response.cols) {
          _this3.setState({
            cols: response.cols,
            id: response.id
          });
        }

        return _lib_API__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
          path: '/api/q/' + _this3.state.table,
          query: {
            args: _this3.state.args,
            limit: _this3.state.perPage
          }
        });
      }).then(function (response) {
        if (response && response.data && response.data[_this3.state.table] && response.meta) {
          _this3.setState({
            rows: response.data[_this3.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          });
        } else if (response && response.data && response.data[_this3.state.table]) {
          _this3.setState({
            rows: response.data[_this3.state.table],
            loaded: true,
            count: response.data[_this3.state.table].length
          });
        } else _this3.setState({
          error: 'No data received'
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "handlePage",
    value: function handlePage(e) {
      var _this4 = this;

      var dir = parseInt(e.target.getAttribute('data-page')); // Get the pagination value from the element

      var offset = this.state.offset;
      console.log(dir);

      if (dir === -2) {
        // First page
        offset = 0;
      } else if (dir === -1) {
        // Previous page
        offset = this.state.prevOffset;
      } else if (dir === 2) {
        // Last page
        offset = this.state.count - this.state.perPage;
      } else {
        // Next page
        offset = offset + this.state.perPage;
      }

      console.log({
        args: this.state.args,
        offset: offset,
        limit: this.state.perPage
      });
      _lib_API__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
        path: '/api/q/' + this.state.table,
        query: {
          args: this.state.args,
          offset: offset,
          limit: this.state.perPage
        }
      }).then(function (response) {
        if (response && response.data && response.data[_this4.state.table] && response.meta.count) {
          _this4.setState({
            rows: response.data[_this4.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          });
        } else if (response && response.data && response.data[_this4.state.table]) {
          _this4.setState({
            rows: response.data[_this4.state.table],
            loaded: true,
            count: response.data[_this4.state.table].length
          });
        } else _this4.setState({
          error: 'No data received'
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var headers = [];
      var nextPage = this.state.nextOffset >= this.state.count ? ' disabled' : '';
      var prevPage = this.state.offset - this.state.perPage <= 0 ? ' disabled' : '';

      if (!this.state.hideActions) {
        headers.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
          scope: "col",
          key: Math.floor(Math.random() * 10000)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          className: "position-static",
          type: "checkbox"
        })));
      }

      if (this.state.cols) {
        var headerTitles = Object.keys(this.state.cols);

        for (var _i = 0; _i < headerTitles.length; _i++) {
          var col = headerTitles[_i];
          headers.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
            scope: "col",
            "data-bind": this.state.cols[col].boundTo,
            key: Math.floor(Math.random() * 10000)
          }, col));
        }
      }

      var rows = [];

      if (this.state.rows && this.state.rows.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.state.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;
            rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TableRow, {
              key: Math.floor(Math.random() * 10000),
              showSelect: !this.state.hideActions,
              cells: row,
              cols: this.state.cols,
              onClick: this.state.handleClick,
              href: this.state.baseURL,
              id: this.state.id
            }));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-responsive"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table table-striped table-hover"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
        className: "thead-dark"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, headers)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows.length > 0 && rows))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, !this.state.hideActions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col mx-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: ""
      }, "Action on selected rows"), this.props.actions !== undefined && this.props.actions)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }), !this.state.hidePagination && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-lg-6 col-md-10 col-sm-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-secondary m-1" + prevPage,
        "data-page": "-2",
        onClick: this.handlePage.bind(this)
      }, "\xAB"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-secondary m-1" + prevPage,
        "data-page": "-1",
        onClick: this.handlePage.bind(this)
      }, "\u2039"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1"
      }, this.state.from + ' - ' + this.state.nextOffset + ' of ' + this.state.count), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-secondary m-1" + nextPage,
        "data-page": "1",
        onClick: this.handlePage.bind(this)
      }, "\u203A"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-secondary m-1" + nextPage,
        "data-page": "2",
        onClick: this.handlePage.bind(this)
      }, "\xBB")))));
    }
  }]);

  return Table;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/common/alerts.jsx":
/*!*******************************************!*\
  !*** ./src/client/view/common/alerts.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Alert =
/*#__PURE__*/
function (_Component) {
  _inherits(Alert, _Component);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, _getPrototypeOf(Alert).apply(this, arguments));
  }

  _createClass(Alert, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'alert alert-dismissible fade show alert-' + this.props.alertType,
        role: "alert"
      }, typeof this.props.message === 'string' && this.props.message, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "data-dismiss": "alert",
        "aria-label": "Close"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")));
    }
  }]);

  return Alert;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),

/***/ "./src/client/view/common/errors.jsx":
/*!*******************************************!*\
  !*** ./src/client/view/common/errors.jsx ***!
  \*******************************************/
/*! exports provided: E404, E401, ErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E404", function() { return E404; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E401", function() { return E401; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundary", function() { return ErrorBoundary; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var E404 =
/*#__PURE__*/
function (_Component) {
  _inherits(E404, _Component);

  function E404() {
    _classCallCheck(this, E404);

    return _possibleConstructorReturn(this, _getPrototypeOf(E404).apply(this, arguments));
  }

  _createClass(E404, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-cont"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: "error-code"
      }, "404")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-desc"
      }, "The page you were looking for could not be found. ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/",
        className: "404-home"
      }, "Click here to go home"))));
    }
  }]);

  return E404;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var E401 =
/*#__PURE__*/
function (_Component2) {
  _inherits(E401, _Component2);

  function E401() {
    _classCallCheck(this, E401);

    return _possibleConstructorReturn(this, _getPrototypeOf(E401).apply(this, arguments));
  }

  _createClass(E401, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-cont"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: "error-code"
      }, "401")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fof-desc"
      }, "You are unauthorized to view the requested page. ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/",
        className: "404-home"
      }, "Click here to go home"))));
    }
  }]);

  return E401;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var ErrorBoundary =
/*#__PURE__*/
function (_Component3) {
  _inherits(ErrorBoundary, _Component3);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(err, info) {
      this.setState({
        hasError: true,
        error: err
      });
      console.error(err, ' ', info);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "fof-cont"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "fof-title"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
          className: "error-code"
        }, "Fuck")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "fof-desc"
        }, "An unexpected error occurred. ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "/",
          className: "404-home"
        }, "Click here to go home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.error.toString()))));
      }

      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/common/footer.jsx":
/*!*******************************************!*\
  !*** ./src/client/view/common/footer.jsx ***!
  \*******************************************/
/*! exports provided: default, Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Footer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Footer =
/*#__PURE__*/
function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
        className: "bg-dark"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "footer pt-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-light",
        href: "#"
      }, "FAQ"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "Help & Training"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "Contact & Vendors"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "Featured Partners"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "Integration Resource Center"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "CAM Resources"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "Utility Menu"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pl-4 text-light",
        href: "#"
      }, "PFB Catalog Maint.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "footer pt-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col text-center pb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-light",
        href: "#"
      }, "Privacy Policy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-4 pr-4 d-inline"
      }, "|"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-light",
        href: "#"
      }, "Copyright"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-4 pr-4 d-inline"
      }, "|"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-light",
        href: "#"
      }, "Terms & Conditions"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      })));
    }
  }]);

  return Footer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);




/***/ }),

/***/ "./src/client/view/common/forms.jsx":
/*!******************************************!*\
  !*** ./src/client/view/common/forms.jsx ***!
  \******************************************/
/*! exports provided: Field, SelectField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectField", function() { return SelectField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Field =
/*#__PURE__*/
function (_Component) {
  _inherits(Field, _Component);

  function Field(props) {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, _getPrototypeOf(Field).call(this, props));
  }

  _createClass(Field, [{
    key: "render",
    value: function render() {
      return !this.props.isHidden && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'form-group ' + this.props.className,
        id: 'cont' + this.props.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: this.props.id
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({}, this.props.attributes, {
        type: this.props.type,
        className: "form-control",
        id: this.props.id,
        value: this.props.value || '',
        onChange: this.props.onChange
      })));
    }
  }]);

  return Field;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var SelectField =
/*#__PURE__*/
function (_Component2) {
  _inherits(SelectField, _Component2);

  function SelectField(props) {
    var _this;

    _classCallCheck(this, SelectField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectField).call(this, props));
    _this.state = {
      otherField: false,
      selectId: _this.props.id
    };
    return _this;
  }

  _createClass(SelectField, [{
    key: "handleOnChange",
    value: function handleOnChange(e) {
      if (e.target.value === 'otherSelection') {
        this.setState({
          otherField: true,
          id: e.target.id,
          selectId: ''
        });
        e.target.setAttribute('oldId', e.target.id);
        e.target.removeAttribute('id');
      } else {
        var oldId = e.target.getAttribute('oldId');

        if (oldId) {
          this.setState({
            otherField: false,
            id: null,
            selectId: oldId
          });
          e.target.removeAttribute('oldId');
        } else {
          this.setState({
            otherField: false,
            id: null,
            selectId: e.target.id
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var options = [];

      if (Array.isArray(this.props.opts)) {
        this.props.opts.forEach(function (opt) {
          if (typeof opt === 'string') {
            options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
              value: opt,
              key: Math.floor(Math.random() * 1000000)
            }, opt));
          } else {
            options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
              value: opt.value,
              key: Math.floor(Math.random() * 1000000)
            }, opt.text));
          }
        });
      }

      if (this.props.otherField) {
        options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "otherSelection",
          key: Math.floor(Math.random() * 1000000)
        }, "Other"));
      }

      return !this.props.isHidden && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'form-group ' + this.props.className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: this.props.id
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        id: this.state.selectId,
        onChange: function onChange(e) {
          _this2.handleOnChange(e);

          _this2.props.onChange(e);
        },
        value: this.state.otherField ? 'otherSelection' : this.props.value
      }, options), this.state.otherField && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: this.state.id,
        type: "text",
        className: "form-control mt-3",
        onChange: this.props.onChange
      }));
    }
  }]);

  return SelectField;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/home/UserProfile.jsx":
/*!**********************************************!*\
  !*** ./src/client/view/home/UserProfile.jsx ***!
  \**********************************************/
/*! exports provided: UserProfileInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileInfo", function() { return UserProfileInfo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/forms.jsx */ "./src/client/view/common/forms.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/alerts.jsx */ "./src/client/view/common/alerts.jsx");
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
/* harmony import */ var _common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/PillLayout.jsx */ "./src/client/view/common/PillLayout.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var UserProfileInfo =
/*#__PURE__*/
function (_Component) {
  _inherits(UserProfileInfo, _Component);

  function UserProfileInfo(props) {
    var _this;

    _classCallCheck(this, UserProfileInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UserProfileInfo).call(this, props));
    _this.state = _objectSpread({}, props);
    _this.state.modifiedFields = [];
    return _this;
  }

  _createClass(UserProfileInfo, [{
    key: "handleChange",
    value: function handleChange(e) {
      var fields = _objectSpread({}, this.state.fields);

      var modifiedFields = this.state.modifiedFields;
      fields[e.target.id] = e.target.value;

      if (modifiedFields.indexOf(e.target.id) === -1) {
        modifiedFields.push(e.target.id);
      }

      this.setState({
        fields: fields,
        modifiedFields: modifiedFields
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      var formName = e.target.getAttribute('data-form') || 'profile';
      var selector = '#' + this.state.modifiedFields.join(', #');
      var formContext = 'form[name=' + formName + ']';
      var body = {
        sys_id: $('#sys_id').val()
      };
      $(selector, formContext).each(function (index) {
        body[this.id] = this.value;
      });
      _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].put({
        path: '/api/q/sys_user/' + body.sys_id,
        body: JSON.stringify(body)
      }, function (err, data) {
        console.log(err);
        if (err) _this2.setState({
          error: true,
          errorMessage: err
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        message: this.state.errorMessage,
        alertType: "danger"
      }), this.state.message && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        message: this.state.message,
        alertType: "success"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " User Information "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "form-row",
        name: "profile"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "hidden",
        id: "sys_id",
        value: this.state.fields.sys_id
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "username",
        label: "Username",
        value: this.state.fields.username,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "email",
        label: "Email",
        value: this.state.fields.email,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "userFirstName",
        label: "First Name",
        value: this.state.fields.userFirstName,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "userLastName",
        label: "Last Name",
        value: this.state.fields.userLastName,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "phone",
        label: "Phone Number",
        value: this.state.fields.phone,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["SelectField"], {
        id: "userDefaultNonsig",
        label: "Home Nonsig",
        value: this.state.fields.userDefaultNonsig,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        opts: this.state.customers
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "userPass",
        label: "Password",
        value: this.state.fields.userPass,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "password",
        attributes: {
          onFocus: this.handleFocus
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        id: "userPassConfirmation",
        label: "Confirm Password",
        value: this.state.fields.userPassConfirmation,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "password",
        attributes: {
          onFocus: this.handleFocus
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary btn-block submit",
        onClick: this.handleSubmit.bind(this),
        "data-form": "profile",
        type: "button"
      }, "Save")));
    }
  }]);

  return UserProfileInfo;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var UserProfile =
/*#__PURE__*/
function (_Component2) {
  _inherits(UserProfile, _Component2);

  function UserProfile(props) {
    var _this3;

    _classCallCheck(this, UserProfile);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(UserProfile).call(this, props));
    _this3.state = {
      error: false,
      errorMessage: '',
      loaded: false,
      fields: {
        sys_id: '',
        username: '',
        email: '',
        notificationNonsig: '',
        userFirstName: '',
        userLastName: '',
        phone: '',
        userDefaultNonsig: '',
        userPass: 'thisisnotanactualpassword',
        userPassConfirmation: 'thisisnotanactualpassword'
      },
      modifiedFields: [],
      sys_id: props.match.params.userId || false,
      logs: [],
      logCols: {
        'Time': {
          boundTo: 'log_time',
          type: 'Date'
        },
        'Action': {
          boundTo: 'log_message',
          type: 'string'
        }
      },
      customers: []
    };

    _this3.getUser();

    return _this3;
  }

  _createClass(UserProfile, [{
    key: "handleChange",
    value: function handleChange(e) {
      var fields = _objectSpread({}, this.state.fields);

      var modifiedFields = this.state.modifiedFields;
      fields[e.target.id] = e.target.value;

      if (modifiedFields.indexOf(e.target.id) === -1) {
        modifiedFields.push(e.target.id);
      }

      this.setState({
        fields: fields,
        modifiedFields: modifiedFields
      });
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      e.target.select();
    }
  }, {
    key: "getUser",
    value: function getUser() {
      var _this4 = this;

      var apiQ;

      if (this.state.sys_id) {
        apiQ = _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
          path: '/api/users/profile',
          query: {
            sys_id: this.state.sys_id
          }
        });
      } else {
        apiQ = _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].GET({
          path: '/api/users/me'
        });
      }

      apiQ.then(function (response) {
        if (response.errors) throw response.errors;

        var state = _objectSpread({}, _this4.state.fields);

        var customers = [];

        if (response.data.customers) {
          response.data.customers.map(function (customer) {
            customers.push(customer.nsaNonsig);
          });
        }

        Object.keys(response.data.user).map(function (field) {
          state[field] = response.data.user[field];
        });
        state['notificationNonsig'] = response.data.user.userDefaultNonsig;

        _this4.setState({
          fields: state,
          logs: response.data.logs,
          loaded: true,
          customers: customers
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this5 = this;

      var formName = e.target.getAttribute('data-form') || 'profile';
      var selector = '#' + this.state.modifiedFields.join(', #');
      var formContext = 'form[name=' + formName + ']';
      var body = {
        sys_id: $('#sys_id').val()
      };
      $(selector, formContext).each(function (index) {
        body[this.id] = this.value;
      });
      _lib_API_js__WEBPACK_IMPORTED_MODULE_2__["default"].put({
        path: '/api/q/sys_user/' + body.sys_id,
        body: JSON.stringify(body)
      }, function (err, data) {
        console.log(err);
        if (err) _this5.setState({
          error: true,
          errorMessage: err
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pills = {
        profile: {
          id: 'profile',
          label: 'Profile',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfileInfo, {
            onChange: this.handleChange.bind(this),
            fields: _objectSpread({}, this.state.fields),
            customers: this.state.customers
          })
        },
        notifications: {
          id: 'notifications',
          label: 'Notifications',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Notifications For"), this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_1__["SelectField"], {
            id: "notificationNonsig",
            value: this.state.fields.notificationNonsig,
            onChange: this.handleChange.bind(this),
            opts: this.state.customers
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
            name: "notificationPreferences",
            className: "form-row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "invoice"
          }, "When I receive an invoice: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "invoice",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Send an email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "chgbck"
          }, "When I receive a chargeback: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "chgbck",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Send an email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "g86"
          }, "When I receive a G86: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "g86",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Send an email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "fhq"
          }, "When I receive a FleetHQ Call: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "fhq",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Send an email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "doh"
          }, "Documents on hold older than "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "doh",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "1 Day"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "5 Days"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "14 Days"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "1 Month"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "3 Months"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-lg-6 col-sm-12 form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            htmlFor: "news"
          }, "When news is released"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
            id: "news",
            className: "form-control"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Send an email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            className: "btn btn-primary btn-block submit",
            "data-form": "notificationPreferences",
            type: "button"
          }, "Save"))))
        },
        logs: {
          id: 'logs',
          label: 'History',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " History "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, " View actions that have been taken on your account "), this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
            cols: this.state.logCols,
            rows: this.state.logs,
            hideActions: true
          }))
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
        pills: pills,
        handleFocus: this.handleFocus.bind(this),
        handleChange: this.handleChange.bind(this),
        handleSubmit: this.handleSubmit
      }, this.state)));
    }
  }]);

  return UserProfile;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

/***/ }),

/***/ "./src/client/view/index.jsx":
/*!***********************************!*\
  !*** ./src/client/view/index.jsx ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _common_footer_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/footer.jsx */ "./src/client/view/common/footer.jsx");
/* harmony import */ var _common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/errors.jsx */ "./src/client/view/common/errors.jsx");
/* harmony import */ var _home_UserProfile_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/UserProfile.jsx */ "./src/client/view/home/UserProfile.jsx");
/* harmony import */ var _admin_Customers_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin/Customers.jsx */ "./src/client/view/admin/Customers.jsx");
/* harmony import */ var _admin_Customer_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin/Customer.jsx */ "./src/client/view/admin/Customer.jsx");
/* harmony import */ var _admin_Users_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin/Users.jsx */ "./src/client/view/admin/Users.jsx");
/* harmony import */ var _navigation_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navigation.jsx */ "./src/client/view/navigation.jsx");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _common_Suspense_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common/Suspense.jsx */ "./src/client/view/common/Suspense.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var Admin = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./admin/Admin.jsx */ "./src/client/view/admin/Admin.jsx"));
});
var Dashboard = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./home/dashboard.jsx */ "./src/client/view/home/dashboard.jsx"));
});

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    var token = _this.qs('token');

    var user = {
      userId: null,
      privs: []
    };
    window.THQ = {
      token: token,
      user: user
    };

    if (token) {
      if (window.sessionStorage) {
        window.sessionStorage.setItem('token', token);
        window.history.pushState({
          loaded: true
        }, 'Tire-HQ', '/');
      }
    } else {
      if (window.sessionStorage) {
        window.THQ.token = sessionStorage.getItem('token');
        window.history.pushState({
          loaded: true
        }, 'Tire-HQ', '/');

        if (!window.THQ.token) {
          _this.logout();
        }
      }
    }

    setInterval(_this.refreshToken, 300000);
    return _this;
  }

  _createClass(App, [{
    key: "qs",
    value: function qs(key) {
      key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars

      var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  }, {
    key: "logout",
    value: function logout() {
      window.location.href = '/logout';
    }
  }, {
    key: "refreshToken",
    value: function refreshToken() {
      var token = window.THQ.token;

      if (!token) {
        window.location.href = '/logout';
      } else {
        var details = JSON.parse(atob(token.split('.')[1]));
        var diff = details.exp * 1000 - new Date().getTime();

        if (diff < 300000) {
          $.ajax('/api/refresh?token=' + token, {
            success: function success(response) {
              if (response.token && !response.error) {
                window.THQ.token = response.token;
                sessionStorage.setItem('token', response.token);
              } else {
                console.log(response);
              }
            },
            error: function error(err) {
              window.location.href = '/logout';
            }
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (loadingInterval) {
        clearInterval(loadingInterval);
        document.getElementById('loading-container').parentElement.removeChild(document.getElementById('loading-container'));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__["ErrorBoundary"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_navigation_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__["ErrorBoundary"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: _common_Suspense_jsx__WEBPACK_IMPORTED_MODULE_11__["default"]
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        exact: true,
        path: "/",
        component: Dashboard
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/profile",
        component: _home_UserProfile_jsx__WEBPACK_IMPORTED_MODULE_5__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/admin/",
        component: Admin
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/customer/:customer",
        component: _admin_Customer_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/changeCustomer",
        component: _admin_Customers_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/userAdministration",
        component: _admin_Users_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        component: _common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__["E404"]
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_footer_jsx__WEBPACK_IMPORTED_MODULE_3__["Footer"], null))));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.querySelector('#root'));

/***/ }),

/***/ "./src/client/view/lib/API.js":
/*!************************************!*\
  !*** ./src/client/view/lib/API.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function flattenQuery(queryObject) {
  var queryStringArray = ["token=".concat(window.THQ.token || '')];

  if (queryObject && _typeof(queryObject) === 'object') {
    Object.keys(queryObject).map(function (queryKey) {
      queryStringArray.push("".concat(queryKey, "=").concat(encodeURIComponent(queryObject[queryKey])));
    });
  } else if (queryObject) {
    queryStringArray.push(query);
  }

  return queryStringArray.join('&');
}

var API = {
  POST: function POST(_ref, cb) {
    var path = _ref.path,
        body = _ref.body;
  },
  GET: function GET(_ref2, cb) {
    var path = _ref2.path,
        query = _ref2.query;
    var authPath = path + '?' + flattenQuery(query);
    console.log('Making GET request to ' + authPath);

    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          'Accept': 'application/json'
        },
        method: "GET",
        success: function success(res) {
          cb(null, res);
        },
        error: function error(err) {
          cb(err);
        }
      });
    } else {
      return new Promise(function (resolve, reject) {
        $.ajax(authPath, {
          headers: {
            'Accept': 'application/json'
          },
          method: "GET",
          success: function success(res) {
            resolve(res);
          },
          error: function error(err) {
            throw err;
          }
        });
      });
    }
  },
  put: function put(_ref3, cb) {
    var path = _ref3.path,
        query = _ref3.query,
        body = _ref3.body;
    var authPath = path + '?' + flattenQuery(query);

    if (cb !== null && cb !== undefined) {
      $.ajax(authPath, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: body,
        method: "PUT",
        success: function success(res) {
          cb(null, res);
        },
        error: function error(err) {
          cb(err);
        }
      });
    } else {
      return new Promise(function (resolve, reject) {
        $.ajax(authPath, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: "GET",
          success: function success(res) {
            resolve(res);
          },
          error: function error(err) {
            throw err;
          }
        });
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (API);

/***/ }),

/***/ "./src/client/view/loginProcess/getNavigation.js":
/*!*******************************************************!*\
  !*** ./src/client/view/loginProcess/getNavigation.js ***!
  \*******************************************************/
/*! exports provided: fetchLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
function fetchLogin(token) {
  return new Promise(function (resolve, reject) {
    var token = window.THQ.token;
    var details = JSON.parse(atob(token.split('.')[1]));
    window.THQ.user = details;

    if (details.userId === window.localStorage.getItem('userIdd') && window.localStorage.getItem('navigation') && window.THQ.privs && window.THQ.user.privs.length > 0) {
      console.log('New user userId = ', details.userId, ' Existing userId = ', localStorage.userId);
      var event;

      if (typeof Event === 'function') {
        event = new Event('thq.receivedNav');
      } else {
        event = document.createEvent('Event');
        event.initEvent('thq.receivedNav', true, true);
      }

      document.dispatchEvent(event);
      resolve(JSON.parse(window.localStorage.getItem('navigation')));
    } else {
      window.localStorage.setItem('userId', details.userId);
      $.ajax('/login/navigation?token=' + token, {
        xhrFields: {
          withCredentials: true
        },
        success: function success(response) {
          if (!response.errror) {
            var menus = formatNavigation(response.details.navs);
            window.THQ.user.privs = response.details.privs;
            window.localStorage.setItem('navigation', JSON.stringify(menus));

            var _event;

            if (typeof Event === 'function') {
              _event = new Event('thq.receivedNav');
            } else {
              _event = document.createEvent('Event');

              _event.initEvent('thq.receivedNav', true, true);
            }

            document.dispatchEvent(_event);
            resolve(menus);
          } else {
            throw err;
          }
        },
        error: function error(err) {
          alert(err);
          throw err;
        }
      });
    }
  });
}

function formatNavigation(navigationLinks) {
  var menus = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = navigationLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;

      if (!menus[link.navMenu]) {
        menus[link.navMenu] = {};
      }

      if (!Array.isArray(menus[link.navMenu][link.navHeader])) {
        menus[link.navMenu][link.navHeader] = [];
      }

      menus[link.navMenu][link.navHeader].push({
        href: link.navHref,
        innerText: link.navInnerText
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  window.THQ.menus = Object.keys(menus);
  return menus;
}



/***/ }),

/***/ "./src/client/view/navigation.jsx":
/*!****************************************!*\
  !*** ./src/client/view/navigation.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loginProcess_getNavigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginProcess/getNavigation */ "./src/client/view/loginProcess/getNavigation.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // React-Router



var NavigationHeading =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigationHeading, _Component);

  function NavigationHeading(props) {
    _classCallCheck(this, NavigationHeading);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationHeading).call(this, props));
  }

  _createClass(NavigationHeading, [{
    key: "render",
    value: function render() {
      var links = [];
      var key = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var navLink = _step.value;
          links.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
            className: "dropdown-item",
            to: navLink.href,
            key: 'nav-link' + key
          }, navLink.innerText));
          key++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dropdown-header"
      }, this.props.header), links);
    }
  }]);

  return NavigationHeading;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var NavigationDropdown =
/*#__PURE__*/
function (_Component2) {
  _inherits(NavigationDropdown, _Component2);

  function NavigationDropdown(props) {
    _classCallCheck(this, NavigationDropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationDropdown).call(this, props));
  }

  _createClass(NavigationDropdown, [{
    key: "render",
    value: function render() {
      var _this = this;

      var randId = 'dropDown' + Math.floor(Math.random() * 1000000);
      var subHeadings = [];
      var key = 0;
      Object.keys(this.props.navHeading).map(function (heading) {
        subHeadings.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavigationHeading, {
          header: heading,
          links: _this.props.navHeading[heading],
          key: 'nav-header' + key
        }));
        key++;
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "nav-item dropdown"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "nav-link text-light dropdown-toggle pl-3",
        href: "#",
        id: randId,
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, this.props.navTitle)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dropdown-menu",
        "aria-labelledby": randId
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row flex-lg-nowrap"
      }, subHeadings)));
    }
  }]);

  return NavigationDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Navigation =
/*#__PURE__*/
function (_Component3) {
  _inherits(Navigation, _Component3);

  function Navigation(props) {
    var _this2;

    _classCallCheck(this, Navigation);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Navigation).call(this, props));
    _this2.state = {
      nav: null,
      loaded: false
    };

    _this2.getNav();

    return _this2;
  }

  _createClass(Navigation, [{
    key: "getNav",
    value: function getNav() {
      var _this3 = this;

      Object(_loginProcess_getNavigation__WEBPACK_IMPORTED_MODULE_1__["fetchLogin"])().then(function (navigation) {
        if (navigation.error) {
          console.error(err);
        }

        _this3.setState({
          nav: navigation,
          loaded: true
        });
      }).catch(function (err) {
        console.log('Error occurred');
        console.error(err);

        _this3.setState({
          nav: 'Error',
          loaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.nav === null || this.state.nav === undefined || this.state.loaded !== true) {
        return null;
      } else {
        var menus = [];
        var key = 0;
        Object.keys(this.state.nav).map(function (menu) {
          menus.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavigationDropdown, {
            navHeading: _this4.state.nav[menu],
            navTitle: menu,
            key: key
          }));
          key++;
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
          className: "navbar navbar-expand-lg navbar-dark bg-goodyear"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
          className: "navbar-brand",
          to: "/"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "/public/images/logo.png",
          height: "60px"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "navbar-toggler",
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#mainNav",
          "aria-controls": "main-nav",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "navbar-toggler-icon"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "collapse navbar-collapse",
          id: "mainNav"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
          className: "mr-auto navbar-nav",
          id: "menuContainer"
        }, menus), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
          className: "navbar-nav"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "nav-item dropdown"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "dropdown-toggle pl-3 nav-item ml-auto",
          "data-toggle": "dropdown",
          id: "account",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "rounded-circle img",
          src: "/public/images/account.png"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "dropdown-menu dropdown-menu-right",
          "aria-labelledby": "account"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
          className: "dropdown-item",
          to: "/changeCustomer"
        }, "Change Customer"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
          className: "dropdown-item",
          to: "/userAdministration"
        }, "User Administration"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
          className: "dropdown-item",
          to: "/profile"
        }, "Profile"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "dropdown-item",
          href: "#"
        }, "French"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "dropdown-item",
          href: "/logout"
        }, "Logout"))))));
      }
    }
  }]);

  return Navigation;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2FkbWluL0N1c3RvbWVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvYWRtaW4vQ3VzdG9tZXJzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvYWRtaW4vVXNlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9jb21tb24vUGlsbExheW91dC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2NvbW1vbi9TdXNwZW5zZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2NvbW1vbi9UYWJsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2NvbW1vbi9hbGVydHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9jb21tb24vZXJyb3JzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvY29tbW9uL2Zvb3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2NvbW1vbi9mb3Jtcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2hvbWUvVXNlclByb2ZpbGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2xpYi9BUEkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2xvZ2luUHJvY2Vzcy9nZXROYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9uYXZpZ2F0aW9uLmpzeCJdLCJuYW1lcyI6WyJDdXN0b21lciIsInByb3BzIiwic3RhdGUiLCJlcnJvciIsImVycm9yTWVzc2FnZSIsImxvYWRlZCIsImZpZWxkcyIsIm5zTm9uc2lnIiwibnNUcmFkZXN0eWxlIiwibW9kaWZpZWRGaWVsZHMiLCJjdXN0b21lciIsIm1hdGNoIiwicGFyYW1zIiwiZ2V0Q3VzdG9tZXIiLCJBUEkiLCJHRVQiLCJwYXRoIiwicXVlcnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJlcnJvcnMiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsIm1lc3NhZ2UiLCJkYXRhIiwiY2F0Y2giLCJlIiwidGFyZ2V0IiwiaWQiLCJ2YWx1ZSIsInBpbGxzIiwiZ2VuZXJhbCIsImxhYmVsIiwiYm9keSIsImhhbmRsZUNoYW5nZSIsImJpbmQiLCJyZWFkT25seSIsIm5zVHJhZGVTdHlsZSIsIm5zQWRkcjEiLCJuc0FkZHIyIiwibnNDaXR5IiwibnNTdGF0ZSIsIm5zUG9zdGFsQ29kZSIsIm5zQ291bnRyeSIsInVzZXJzIiwiYnJhbmRzIiwibG9ncyIsIkNvbXBvbmVudCIsIkN1c3RvbWVycyIsImNvbHMiLCJjdXN0b21lcnMiLCJwcmV2ZW50RGVmYXVsdCIsIlVzZXJzIiwiYm91bmRUbyIsInR5cGUiLCJnZXRVc2VycyIsImFsdENvbHMiLCJhcmdzIiwiZXJyIiwic3lzX3VzZXJfbnNhY2xfbGlzdCIsInN5c191c2VyX2xpc3QiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJQaWxscyIsIkVycm9yIiwiaGFuZGxlTG9hZCIsInBpbGxBcyIsInBpbGxCb2RpZXMiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwicGlsbCIsImtleSIsInB1c2giLCJtaW5IZWlnaHQiLCJTdXNwZW5zZUxvYWRlciIsIlRhYmxlUm93IiwiY2VsbHMiLCJzaG93U2VsZWN0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sIiwidmFsIiwibGlua2FibGUiLCJiYXNlVVJMIiwidG9Mb3dlckNhc2UiLCJEYXRlIiwidG9EYXRlU3RyaW5nIiwidGV4dEFsaWduIiwiZm9udFNpemUiLCJUYWJsZSIsInJvd3MiLCJvbkNsaWNrIiwiaGlkZUFjdGlvbnMiLCJ0YWJsZSIsIm9mZnNldCIsIm5leHRPZmZzZXQiLCJwZXJQYWdlIiwiZnJvbSIsImZsYXRBcmdzIiwiYXJnIiwiZ2V0Q29scyIsImFsbG93ZWRDb2xzIiwiaW5jbHVkZXMiLCJsaW1pdCIsIm1ldGEiLCJjb3VudCIsInRvIiwiZGlyIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJwcmV2T2Zmc2V0IiwiaGVhZGVycyIsIm5leHRQYWdlIiwicHJldlBhZ2UiLCJoZWFkZXJUaXRsZXMiLCJyb3ciLCJhY3Rpb25zIiwidW5kZWZpbmVkIiwiaGlkZVBhZ2luYXRpb24iLCJoYW5kbGVQYWdlIiwiQWxlcnQiLCJhbGVydFR5cGUiLCJFNDA0IiwiRTQwMSIsIkVycm9yQm91bmRhcnkiLCJoYXNFcnJvciIsImluZm8iLCJ0b1N0cmluZyIsImNoaWxkcmVuIiwiRm9vdGVyIiwiRmllbGQiLCJpc0hpZGRlbiIsImNsYXNzTmFtZSIsImF0dHJpYnV0ZXMiLCJvbkNoYW5nZSIsIlNlbGVjdEZpZWxkIiwib3RoZXJGaWVsZCIsInNlbGVjdElkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwib2xkSWQiLCJvcHRpb25zIiwiQXJyYXkiLCJpc0FycmF5Iiwib3B0cyIsImZvckVhY2giLCJvcHQiLCJ0ZXh0IiwiaGFuZGxlT25DaGFuZ2UiLCJVc2VyUHJvZmlsZUluZm8iLCJpbmRleE9mIiwiZm9ybU5hbWUiLCJzZWxlY3RvciIsImpvaW4iLCJmb3JtQ29udGV4dCIsInN5c19pZCIsIiQiLCJlYWNoIiwiaW5kZXgiLCJwdXQiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcm5hbWUiLCJlbWFpbCIsInVzZXJGaXJzdE5hbWUiLCJ1c2VyTGFzdE5hbWUiLCJwaG9uZSIsInVzZXJEZWZhdWx0Tm9uc2lnIiwidXNlclBhc3MiLCJvbkZvY3VzIiwiaGFuZGxlRm9jdXMiLCJ1c2VyUGFzc0NvbmZpcm1hdGlvbiIsImhhbmRsZVN1Ym1pdCIsIlVzZXJQcm9maWxlIiwibm90aWZpY2F0aW9uTm9uc2lnIiwidXNlcklkIiwibG9nQ29scyIsImdldFVzZXIiLCJzZWxlY3QiLCJhcGlRIiwibnNhTm9uc2lnIiwidXNlciIsImZpZWxkIiwicHJvZmlsZSIsIm5vdGlmaWNhdGlvbnMiLCJBZG1pbiIsIlJlYWN0IiwibGF6eSIsIkRhc2hib2FyZCIsIkFwcCIsInRva2VuIiwicXMiLCJwcml2cyIsIndpbmRvdyIsIlRIUSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJnZXRJdGVtIiwibG9nb3V0Iiwic2V0SW50ZXJ2YWwiLCJyZWZyZXNoVG9rZW4iLCJyZXBsYWNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJocmVmIiwiZGV0YWlscyIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwiZGlmZiIsImV4cCIsImdldFRpbWUiLCJhamF4Iiwic3VjY2VzcyIsImxvYWRpbmdJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVuZGVyIiwicXVlcnlTZWxlY3RvciIsImZsYXR0ZW5RdWVyeSIsInF1ZXJ5T2JqZWN0IiwicXVlcnlTdHJpbmdBcnJheSIsInF1ZXJ5S2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiUE9TVCIsImNiIiwiYXV0aFBhdGgiLCJtZXRob2QiLCJyZXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZldGNoTG9naW4iLCJsb2NhbFN0b3JhZ2UiLCJldmVudCIsIkV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwieGhyRmllbGRzIiwid2l0aENyZWRlbnRpYWxzIiwiZXJycm9yIiwibWVudXMiLCJmb3JtYXROYXZpZ2F0aW9uIiwibmF2cyIsImFsZXJ0IiwibmF2aWdhdGlvbkxpbmtzIiwibGluayIsIm5hdk1lbnUiLCJuYXZIZWFkZXIiLCJuYXZIcmVmIiwiaW5uZXJUZXh0IiwibmF2SW5uZXJUZXh0IiwiTmF2aWdhdGlvbkhlYWRpbmciLCJsaW5rcyIsIm5hdkxpbmsiLCJoZWFkZXIiLCJOYXZpZ2F0aW9uRHJvcGRvd24iLCJyYW5kSWQiLCJzdWJIZWFkaW5ncyIsIm5hdkhlYWRpbmciLCJoZWFkaW5nIiwibmF2VGl0bGUiLCJOYXZpZ2F0aW9uIiwibmF2IiwiZ2V0TmF2IiwibmF2aWdhdGlvbiIsIm1lbnUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGtEQUEwQztBQUMxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFD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QUE2QixjQUFJLEVBQUM7QUFBbEMsb0JBTEosQ0FGUixDQURKLENBSlIsQ0FSSixDQURKO0FBNkJIO0FBQ0o7Ozs7RUFqRW1DN00sK0MiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5idW5kbGUuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9jbGllbnQvdmlldy9pbmRleC5qc3hcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBVc2VycyBmcm9tICcuL1VzZXJzLmpzeCc7XHJcbmltcG9ydCBQaWxscyBmcm9tICcuLy4uL2NvbW1vbi9QaWxsTGF5b3V0LmpzeCdcclxuaW1wb3J0IHtGaWVsZH0gZnJvbSAnLi8uLi9jb21tb24vZm9ybXMuanN4J1xyXG5pbXBvcnQgQVBJIGZyb20gJy4uL2xpYi9BUEkuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAgbnNOb25zaWc6ICcnLFxyXG4gICAgICAgICAgICAgICAgbnNUcmFkZXN0eWxlOiAnJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb2RpZmllZEZpZWxkczogW10sXHJcbiAgICAgICAgICAgIGN1c3RvbWVyOiBwcm9wcy5tYXRjaC5wYXJhbXMuY3VzdG9tZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcigpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VzdG9tZXIoKSB7XHJcbiAgICAgICAgQVBJLkdFVCh7cGF0aDogJy9hcGkvcS9zeXNfY3VzdG9tZXIvJyArIHRoaXMuc3RhdGUuY3VzdG9tZXIsIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogJ25zTm9uc2lnLG5zVHJhZGVTdHlsZSxuc0FkZHIxLG5zQWRkcjIsbnNTdGF0ZSxuc0NpdHksbnNQb3N0YWxDb2RlLG5zQ291bnRyeSdcclxuICAgICAgICB9fSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIGVycm9yTWVzc2FnZTogcmVzcG9uc2UuZXJyb3JzWzBdLm1lc3NhZ2UsIGxvYWRlZDogdHJ1ZX0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmaWVsZHM6IHJlc3BvbnNlLmRhdGFbJ3N5c19jdXN0b21lciddLCBsb2FkZWQ6IHRydWV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB0cnVlLCBlcnJvck1lc3NhZ2U6IGUubWVzc2FnZSwgbG9hZGVkOiB0cnVlfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gey4uLnRoaXMuc3RhdGV9XHJcbiAgICAgICAgc3RhdGUuZmllbGRzW2UudGFyZ2V0LmlkXSA9IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcGlsbHMgPSB7XHJcbiAgICAgICAgICAgIGdlbmVyYWw6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnZ2VuZXJhbCcsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0dlbmVyYWwnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5HZW5lcmFsIEluZm9ybWF0aW9uPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1yb3dcIiBuYW1lPVwiZ2VuZXJhbEluZm9ybWF0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJuc05vbnNpZ1wiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5uc05vbnNpZ30gbGFiZWw9XCJOb25zaWdcIiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm5zTm9uc2lnXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLm5zVHJhZGVTdHlsZX0gbGFiZWw9XCJUcmFkZXN0eWxlXCIgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJuc05vbnNpZ1wiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5uc0FkZHIxfSBsYWJlbD1cIkFkZHJlc3NcIiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm5zTm9uc2lnXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLm5zQWRkcjJ9IGxhYmVsPVwiQWRkcmVzcyAoMilcIiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm5zTm9uc2lnXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLm5zQ2l0eX0gbGFiZWw9XCJDaXR5XCIgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJuc05vbnNpZ1wiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5uc1N0YXRlfSBsYWJlbD1cIlN0YXRlXCIgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJuc05vbnNpZ1wiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5uc1Bvc3RhbENvZGV9IGxhYmVsPVwiUG9zdGFsIENvZGVcIiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm5zTm9uc2lnXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLm5zQ291bnRyeX0gbGFiZWw9XCJDb3VudHJ5XCIgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlcnM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAndXNlcnMnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdVc2VycycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlVzZXJzPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+IFZpZXcgdXNlcnMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY3VzdG9tZXIuIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFVzZXJzIGN1c3RvbWVyPXt0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jdXN0b21lcn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJhbmRzOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2JyYW5kcycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JyYW5kcycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkJyYW5kczwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvZ3M6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnbG9ncycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hpc3RvcnknLFxyXG4gICAgICAgICAgICAgICAgYm9keTogKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5IaXN0b3J5PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+VmlldyBhY3Rpb25zIHRoYXQgaGF2ZSBiZWVuIHRha2VuIG9uIHRoaXMgY3VzdG9tZXI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxvYWRlZCAmJiA8UGlsbHMgcGlsbHM9e3BpbGxzfSB7Li4udGhpcy5zdGF0ZX0gLz59XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLy4uL2NvbW1vbi9UYWJsZS5qc3gnXHJcbmltcG9ydCBBUEkgZnJvbSAnLi4vbGliL0FQSS5qcyc7XHJcbmltcG9ydCBBbGVydCBmcm9tICcuLi9jb21tb24vYWxlcnRzLmpzeCc7XHJcblxyXG5jbGFzcyBDdXN0b21lcnMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICAgICAgICBpZDogJ25zTm9uc2lnJyxcclxuICAgICAgICAgICAgY29sczogW1xyXG4gICAgICAgICAgICAgICAgJ3N5c19pZCcsXHJcbiAgICAgICAgICAgICAgICAnbnNOb25zaWcnLFxyXG4gICAgICAgICAgICAgICAgJ25zVHJhZGVzdHlsZScsXHJcbiAgICAgICAgICAgICAgICAnbnNBZGRyMScsXHJcbiAgICAgICAgICAgICAgICAnbnNDaXR5JyxcclxuICAgICAgICAgICAgICAgICduc1N0YXRlJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBjdXN0b21lcnM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7IFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciAmJiA8QWxlcnQgbWVzc2FnZT17dGhpcy5zdGF0ZS5tZXNzYWdlfSBhbGVydFR5cGU9XCJkYW5nZXJcIiAvPn1cclxuICAgICAgICAgICAgICAgIDxUYWJsZSB0YWJsZT1cInN5c19jdXN0b21lcl9saXN0XCIgY29scz17dGhpcy5zdGF0ZS5jb2xzfSBoaWRlQWN0aW9ucz17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiBcclxuLyoqXHJcbiAqIHF1ZXJpZXMgd2lsbCBiZSBzZXQgdXAgYXMgL2FwaS9xLzp0YWJsZT97cXVlcnl9XHJcbiAqIHF1ZXJ5IHNob3VsZCBiZSBmb3JtYXR0ZWQgYXMgcXVlcnkgc3RyaW5nIGxpa2Ugc286XHJcbiAqIGNvbHVtbk5hbWU9e2VxfG5lfGd0fGx0fGd0ZXxsdGV8bGt8bmxrfV52YWx1ZVxyXG4gKiBcclxuICogVGhlIC9hcGkvcSByb3V0ZXMgc2hvdWxkIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGFkYXRhOlxyXG4gKiB7XHJcbiAqICBlcnJvcjogYm9vbGVhbixcclxuICogIG1lc3NhZ2U6ICdSZXRyaWV2ZWQnLFxyXG4gKiAgcm91dGU6ICcvYXBpL3Eve3RhYmxlfScsXHJcbiAqICByZXN1bHQ6IFtcclxuICogICAgICB7cmVzdWx0c31cclxuICogXVxyXG4gKiB9XHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tZXJzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL2NvbW1vbi9UYWJsZS5qc3gnO1xyXG5pbXBvcnQgQVBJIGZyb20gJy4uL2xpYi9BUEkuanMnO1xyXG5pbXBvcnQgQWxlcnQgZnJvbSAnLi4vY29tbW9uL2FsZXJ0cy5qc3gnO1xyXG5cclxuY2xhc3MgVXNlcnMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpZDogJ3N5c19pZCcsXHJcbiAgICAgICAgICAgIGNvbHM6IHtcclxuICAgICAgICAgICAgICAgICdVc2VybmFtZSc6IHtcclxuICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ3VzZXJuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICAgIGlkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ0ZpcnN0IE5hbWUnOiB7XHJcbiAgICAgICAgICAgICAgICAgIGJvdW5kVG86ICd1c2VyRmlyc3ROYW1lJyxcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnTGFzdCBOYW1lJzoge1xyXG4gICAgICAgICAgICAgICAgICBib3VuZFRvOiAndXNlckxhc3ROYW1lJyxcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnRGVmYXVsdCBDdXN0b21lcic6IHtcclxuICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ3VzZXJEZWZhdWx0Tm9uc2lnJyxcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnRW1haWwnOiB7XHJcbiAgICAgICAgICAgICAgICAgIGJvdW5kVG86ICdlbWFpbCcsXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ0xhc3QgTG9naW4nOiB7XHJcbiAgICAgICAgICAgICAgICAgIGJvdW5kVG86ICd1c2VyTGFzdExvZ2luJyxcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ0xvY2tlZCc6IHtcclxuICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ3VzZXJJc0xvY2tlZCcsXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VyczogW10sXHJcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFVzZXJzKHByb3BzLmN1c3RvbWVyKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJzKGN1c3RvbWVyKSB7XHJcbiAgICAgICAgaWYgKGN1c3RvbWVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsdENvbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAnVXNlcm5hbWUnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ3VzZXJuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdGaXJzdCBOYW1lJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kVG86ICd1c2VyRmlyc3ROYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdMYXN0IE5hbWUnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ3VzZXJMYXN0TmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnQ3VzdG9tZXInOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ25zTm9uc2lnJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdBZG1pbic6IHtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvOiAnbnNhSXNBZG1pbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQVBJLkdFVCh7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnL2FwaS9xL3N5c191c2VyX25zYWNsX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6ICdzeXNfaWQsdXNlcm5hbWUsbnNOb25zaWcsdXNlckZpcnN0TmFtZSx1c2VyTGFzdE5hbWUsbnNhSXNBZG1pbicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJnczogJ25zTm9uc2lnPWVxfCcgKyBjdXN0b21lclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBlcnIubWVzc2FnZSwgbG9hZGVkOiB0cnVlLCBjb2xzOiBhbHRDb2xzfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5zeXNfdXNlcl9uc2FjbF9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnM6IHJlc3BvbnNlLmRhdGEuc3lzX3VzZXJfbnNhY2xfbGlzdCwgZXJyb3I6IGZhbHNlLCBsb2FkZWQ6IHRydWUsIGNvbHM6IGFsdENvbHN9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ05vIGRhdGEgZm91bmQnLCBsb2FkZWQ6IHRydWUsIGNvbHM6IGFsdENvbHN9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEFQSS5HRVQoe1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJy9hcGkvcS9zeXNfdXNlcl9saXN0JyxcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiAndXNlcklkLHVzZXJuYW1lLGVtYWlsLHVzZXJEZWZhdWx0Tm9uc2lnLHVzZXJMYXN0TG9naW4sdXNlckRlZmF1bHROb25zaWcsdXNlckZpcnN0TmFtZSx1c2VyTGFzdE5hbWUsdXNlcklzTG9ja2VkJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBlcnIubWVzc2FnZSwgbG9hZGVkOiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5zeXNfdXNlcl9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnM6IHJlc3BvbnNlLmRhdGEuc3lzX3VzZXJfbGlzdCwgZXJyb3I6IGZhbHNlLCBsb2FkZWQ6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ05vIGRhdGEgZm91bmQnLCBsb2FkZWQ6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmIDxBbGVydCBtZXNzYWdlPXt0aGlzLnN0YXRlLmVycm9yfSBhbGVydFR5cGU9XCJkYW5nZXJcIiAvPn1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxvYWRlZCAmJiA8VGFibGUgY29scz17dGhpcy5zdGF0ZS5jb2xzfSByb3dzPXt0aGlzLnN0YXRlLnVzZXJzfSBpZD17dGhpcy5zdGF0ZS5pZH0gb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfSBiYXNlVVJMPVwiL2FkbWluL3VzZXIvXCIgLz4gfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJzXHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWxscyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Li4ucHJvcHN9XHJcbiAgICAgICAgaWYgKCFwcm9wcy5waWxscykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpbGxzIG11c3QgYmUgcHJvdmlkZWQgYXMgYSBwcm9wIHRvIHRoZSA8UGlsbHMgLz4gQ29tcG9uZW50LicpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3BzLmhhbmRsZUxvYWQgPyBwcm9wcy5oYW5kbGVMb2FkKCkgOiB2b2lkIDBcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHBpbGxzID0gey4uLnRoaXMuc3RhdGUucGlsbHN9XHJcbiAgICAgICAgbGV0IHBpbGxBcyA9IFtdXHJcbiAgICAgICAgbGV0IHBpbGxCb2RpZXMgPSBbXVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHBpbGxzKS5tYXAoKHBpbGwsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAwKSB7IC8vIEZpcnN0IHBpbGwgaXMgYWN0aXZlIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgcGlsbEFzLnB1c2goPGEga2V5PXsvKiBrZXkgKiBEYXRlLm5vdygpICsgKH5+TWF0aC5yYW5kb20oKSAqIDEwMDAwKSovcGlsbHNbcGlsbF0uaWQgKyAnLXRhYid9IGNsYXNzTmFtZT1cIm5hdi1saW5rIGFjdGl2ZVwiIGlkPXtwaWxsc1twaWxsXS5pZCArICctdGFiJ30gZGF0YS10b2dnbGU9XCJwaWxsXCIgaHJlZj17JyMnICsgcGlsbHNbcGlsbF0uaWR9IHJvbGU9XCJ0YWJcIiBhcmlhLWNvbnRyb2xzPXtwaWxsc1twaWxsXS5pZH0gYXJpYS1zZWxlY3RlZD1cInRydWVcIj57cGlsbHNbcGlsbF0ubGFiZWx9PC9hPilcclxuICAgICAgICAgICAgICAgIHBpbGxCb2RpZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cGlsbHNbcGlsbF0uaWR9IGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGUgc2hvdyBhY3RpdmVcIiBpZD17cGlsbHNbcGlsbF0uaWR9IHJvbGU9XCJ0YWJwYW5lbFwiIGFyaWEtbGFiZWxsZWRieT17cGlsbHNbcGlsbF0uaWQgKyAnLXRhYid9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctMTAgY29sLW1kLTExIGNvbC1zbS0xMiBwdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwaWxsc1twaWxsXS5ib2R5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGlsbEFzLnB1c2goPGEga2V5PXsvKiBrZXkgKiBEYXRlLm5vdygpICsgKH5+TWF0aC5yYW5kb20oKSAqIDEwMDApKi9waWxsc1twaWxsXS5pZCArICctdGFiJ30gY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBpZD17cGlsbHNbcGlsbF0uaWQgKyAnLXRhYid9IGRhdGEtdG9nZ2xlPVwicGlsbFwiIGhyZWY9eycjJyArIHBpbGxzW3BpbGxdLmlkfSByb2xlPVwidGFiXCIgYXJpYS1jb250cm9scz17cGlsbHNbcGlsbF0uaWR9IGFyaWEtc2VsZWN0ZWQ9XCJmYWxzZVwiPntwaWxsc1twaWxsXS5sYWJlbH08L2E+KVxyXG4gICAgICAgICAgICAgICAgcGlsbEJvZGllcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwaWxsc1twaWxsXS5pZH0gY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiIGlkPXtwaWxsc1twaWxsXS5pZH0gcm9sZT1cInRhYnBhbmVsXCIgYXJpYS1sYWJlbGxlZGJ5PXtwaWxsc1twaWxsXS5pZCArICctdGFiJ30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0xMCBjb2wtbWQtMTEgY29sLXNtLTEyIHB0LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BpbGxzW3BpbGxdLmJvZHl9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIiBzdHlsZT17e21pbkhlaWdodDogJzgwdmgnfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBtdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tMTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYgZmxleC1jb2x1bW4gbmF2LXBpbGxzXCIgaWQ9XCJ2LXBpbGxzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLW9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwaWxsQXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC05IGNvbC1zbS0xMiBtYi01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIiBpZD1cInYtcGlsbC10YWJDb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGlsbEJvZGllc30gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1c3BlbnNlTG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICBMb2FkaW5nLi4uXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQgQVBJIGZyb20gJy4uL2xpYi9BUEknO1xyXG5cclxuY2xhc3MgVGFibGVSb3cgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICB9XHJcbiAgXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IGNlbGxzID0gW11cclxuICAgIGlmICh0aGlzLnByb3BzLnNob3dTZWxlY3QpIHtcclxuICAgICAgY2VsbHMucHVzaChcclxuICAgICAgICA8dGQga2V5PXtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9PlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInBvc2l0aW9uLXN0YXRpY1wiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPXt0aGlzLnByb3BzLmNlbGxzICYmIHRoaXMucHJvcHMuY2VsbHNbdGhpcy5wcm9wcy5pZF19IC8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgKVxyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5jb2xzKS5tYXAoY29sID0+IHtcclxuICAgICAgbGV0IHZhbCA9IHRoaXMucHJvcHMuY2VsbHNbdGhpcy5wcm9wcy5jb2xzW2NvbF0uYm91bmRUb11cclxuICAgICAgbGV0IHR5cGUgPSB0aGlzLnByb3BzLmNvbHNbY29sXS50eXBlXHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmNvbHNbY29sXS5pZCB8fCB0aGlzLnByb3BzLmNvbHNbY29sXS5saW5rYWJsZSkge1xyXG4gICAgICAgIGNlbGxzLnB1c2goXHJcbiAgICAgICAgICA8dGQga2V5PXtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9PlxyXG4gICAgICAgICAgICA8TGluayB0bz17dGhpcy5wcm9wcy5jb2xzW2NvbF0uYmFzZVVSTCArIHRoaXMucHJvcHMuY2VsbHNbdGhpcy5wcm9wcy5pZF19PlxyXG4gICAgICAgICAgICAgICAge3ZhbCB8fCAnJ30gXHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgKVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnZGF0ZScpIHtcclxuICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9eydyb3cnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApfT57bmV3IERhdGUodmFsKS50b0RhdGVTdHJpbmcoKSB8fCAnJ308L3RkPikgICAgICAgIFxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX0gc3R5bGU9e3t0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzIwcHgnfX0+e3ZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IDEgICYmICfDlycgfHwgJyd9PC90ZD4pICAgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX0+e3ZhbCB8fCAnJ308L3RkPilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICB7Y2VsbHN9XHJcbiAgICAgIDwvdHI+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2hvdyBhIGxpc3QgdmlldyBmcm9tIGEgdGFibGUgcHJvcFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byA8VGFibGUvPiBhcmU6XHJcbiAgICogY29sczogYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIGNvbHVtbiBoZWFkZXJzXHJcbiAgICogcm93czogYW4gYXJyYXkgb2YgZGF0YVxyXG4gICAqIGhhbmRsZUNsaWNrOiA8ZGVwcmVjaWF0ZWQ+IGhhbmRsZSB0byBiZSBwYXNzZWQgdG8gdGhlIElEIGNvbHVtblxyXG4gICAqIGJhc2VVUkw6IHdoZXJlIHRvIHJlZGlyZWN0IHVzZXJzIHVwb24gY2xpY2tpbmcgdGhlIElEIGNvbHVtblxyXG4gICAqIGhpZGVBY3Rpb25zOiBIaWRlIHRoZSBhY3Rpb25zIHNlbGVjdCBlbGVtZW50IGFuZCB0aGUgY2hlY2tib3hlc1xyXG4gICAqIHRhYmxlOiB0aGUgbmFtZSBvZiB0aGUgZGF0YWJhc2UgdGFibGVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKVxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY29sczogcHJvcHMuY29scyxcclxuICAgICAgcm93czogcHJvcHMucm93cyxcclxuICAgICAgaGFuZGxlQ2xpY2s6IHByb3BzLm9uQ2xpY2ssXHJcbiAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgYmFzZVVSTDogcHJvcHMuYmFzZVVSTCxcclxuICAgICAgaGlkZUFjdGlvbnM6IHByb3BzLmhpZGVBY3Rpb25zIHx8IGZhbHNlLFxyXG4gICAgICB0YWJsZTogcHJvcHMudGFibGUsXHJcbiAgICAgIG9mZnNldDogMCxcclxuICAgICAgbmV4dE9mZnNldDogcHJvcHMucGVyUGFnZSB8fCAyMCxcclxuICAgICAgZnJvbTogMCxcclxuICAgICAgcGVyUGFnZTogcHJvcHMucGVyUGFnZSB8fCAyMCxcclxuICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMuYXJncykge1xyXG4gICAgICBsZXQgZmxhdEFyZ3MgPSAnJ1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmFyZ3MpLm1hcChhcmcgPT4ge1xyXG4gICAgICAgIGZsYXRBcmdzICs9IGAke2FyZ309JHt0aGlzLnByb3BzLmFyZ3NbYXJnXX1gXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuc3RhdGUuYXJncyA9IGZsYXRBcmdzXHJcbiAgICB9XHJcbiAgICBpZiAoIXByb3BzLmNvbHMgJiYgIXByb3BzLnJvd3MgJiYgcHJvcHMudGFibGUpIHRoaXMuZ2V0Q29scygpIC8vIFJldHJpZXZlIHRoZSBjb2x1bW4gaW5mb3JtYXRpb24gZnJvbSAvYXBpL3EvZGVzY3JpYmVcclxuICAgIGVsc2UgaWYgKHByb3BzLmNvbHMgJiYgIXByb3BzLnJvd3MgJiYgcHJvcHMudGFibGUpIHRoaXMuZ2V0Q29scyhwcm9wcy5jb2xzKVxyXG4gICAgZWxzZSB0aGlzLnN0YXRlLmxvYWRlZCA9IHRydWUgLy8gU2hvdyBkYXRhIHdpdGggdGhlIHByb3ZpZGVkIHJvd3MgYW5kIGNvbHVtbiBoZWFkZXJzXHJcbiAgfVxyXG4gIFxyXG4gIGdldENvbHMoKSB7XHJcbiAgICBBUEkuR0VUKHtwYXRoOiAnL2FwaS9xL2Rlc2NyaWJlLycgKyB0aGlzLnN0YXRlLnRhYmxlfSlcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmNvbHMgJiYgdGhpcy5wcm9wcy5jb2xzKSB7XHJcbiAgICAgICAgbGV0IGFsbG93ZWRDb2xzID0ge31cclxuICAgICAgICBPYmplY3Qua2V5cyhyZXNwb25zZS5jb2xzKS5tYXAoY29sID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNvbHMuaW5jbHVkZXMocmVzcG9uc2UuY29sc1tjb2xdLmJvdW5kVG8pIHx8IHJlc3BvbnNlLmlkID09PSByZXNwb25zZS5jb2xzW2NvbF0uYm91bmRUbykge1xyXG4gICAgICAgICAgICBhbGxvd2VkQ29sc1tjb2xdID0gcmVzcG9uc2UuY29sc1tjb2xdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb2xzOiBhbGxvd2VkQ29scywgaWQ6IHJlc3BvbnNlLmlkfSlcclxuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5jb2xzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sczogcmVzcG9uc2UuY29scywgaWQ6IHJlc3BvbnNlLmlkfSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gQVBJLkdFVCh7cGF0aDogJy9hcGkvcS8nICsgdGhpcy5zdGF0ZS50YWJsZSwgcXVlcnk6IHtcclxuICAgICAgICBhcmdzOiB0aGlzLnN0YXRlLmFyZ3MsXHJcbiAgICAgICAgbGltaXQ6IHRoaXMuc3RhdGUucGVyUGFnZVxyXG4gICAgICB9fSlcclxuICAgIH0pXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGFbdGhpcy5zdGF0ZS50YWJsZV0gJiYgcmVzcG9uc2UubWV0YSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3M6IHJlc3BvbnNlLmRhdGFbdGhpcy5zdGF0ZS50YWJsZV0sIFxyXG4gICAgICAgICAgICBsb2FkZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICBjb3VudDogcmVzcG9uc2UubWV0YS5jb3VudCxcclxuICAgICAgICAgICAgb2Zmc2V0OiByZXNwb25zZS5tZXRhLnRvLFxyXG4gICAgICAgICAgICBmcm9tOiByZXNwb25zZS5tZXRhLmZyb20sXHJcbiAgICAgICAgICAgIG5leHRPZmZzZXQ6IHJlc3BvbnNlLm1ldGEudG9cclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhW3RoaXMuc3RhdGUudGFibGVdKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcm93czogcmVzcG9uc2UuZGF0YVt0aGlzLnN0YXRlLnRhYmxlXSwgXHJcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgY291bnQ6IHJlc3BvbnNlLmRhdGFbdGhpcy5zdGF0ZS50YWJsZV0ubGVuZ3RoXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdObyBkYXRhIHJlY2VpdmVkJ30pXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZVBhZ2UoZSkge1xyXG4gICAgbGV0IGRpciA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJykpIC8vIEdldCB0aGUgcGFnaW5hdGlvbiB2YWx1ZSBmcm9tIHRoZSBlbGVtZW50XHJcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5zdGF0ZS5vZmZzZXRcclxuICAgIGNvbnNvbGUubG9nKGRpcilcclxuICAgIGlmIChkaXIgPT09IC0yKSB7IC8vIEZpcnN0IHBhZ2VcclxuICAgICAgb2Zmc2V0ID0gMFxyXG4gICAgfSBlbHNlIGlmIChkaXIgPT09IC0xKSB7IC8vIFByZXZpb3VzIHBhZ2VcclxuICAgICAgb2Zmc2V0ID0gdGhpcy5zdGF0ZS5wcmV2T2Zmc2V0XHJcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gMikgeyAvLyBMYXN0IHBhZ2VcclxuICAgICAgb2Zmc2V0ID0gdGhpcy5zdGF0ZS5jb3VudCAtIHRoaXMuc3RhdGUucGVyUGFnZVxyXG4gICAgfSBlbHNlIHsgLy8gTmV4dCBwYWdlXHJcbiAgICAgIG9mZnNldCA9IG9mZnNldCArIHRoaXMuc3RhdGUucGVyUGFnZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHtcclxuICAgICAgYXJnczogdGhpcy5zdGF0ZS5hcmdzLFxyXG4gICAgICBvZmZzZXQ6IG9mZnNldCxcclxuICAgICAgbGltaXQ6IHRoaXMuc3RhdGUucGVyUGFnZVxyXG4gICAgfSlcclxuXHJcbiAgICBBUEkuR0VUKHtwYXRoOiAnL2FwaS9xLycgKyB0aGlzLnN0YXRlLnRhYmxlLCBxdWVyeToge1xyXG4gICAgICBhcmdzOiB0aGlzLnN0YXRlLmFyZ3MsXHJcbiAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICBsaW1pdDogdGhpcy5zdGF0ZS5wZXJQYWdlXHJcbiAgICB9fSlcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YVt0aGlzLnN0YXRlLnRhYmxlXSAmJiByZXNwb25zZS5tZXRhLmNvdW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcm93czogcmVzcG9uc2UuZGF0YVt0aGlzLnN0YXRlLnRhYmxlXSwgXHJcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGNvdW50OiByZXNwb25zZS5tZXRhLmNvdW50LFxyXG4gICAgICAgICAgICBvZmZzZXQ6IHJlc3BvbnNlLm1ldGEudG8sXHJcbiAgICAgICAgICAgIGZyb206IHJlc3BvbnNlLm1ldGEuZnJvbSxcclxuICAgICAgICAgICAgbmV4dE9mZnNldDogcmVzcG9uc2UubWV0YS50b1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGFbdGhpcy5zdGF0ZS50YWJsZV0pIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzOiByZXNwb25zZS5kYXRhW3RoaXMuc3RhdGUudGFibGVdLCBcclxuICAgICAgICAgICAgbG9hZGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBjb3VudDogcmVzcG9uc2UuZGF0YVt0aGlzLnN0YXRlLnRhYmxlXS5sZW5ndGhcclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ05vIGRhdGEgcmVjZWl2ZWQnfSlcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IGhlYWRlcnMgPSBbXVxyXG4gICAgbGV0IG5leHRQYWdlID0gdGhpcy5zdGF0ZS5uZXh0T2Zmc2V0ID49IHRoaXMuc3RhdGUuY291bnQgPyAnIGRpc2FibGVkJyA6ICcnXHJcbiAgICBsZXQgcHJldlBhZ2UgPSB0aGlzLnN0YXRlLm9mZnNldCAtIHRoaXMuc3RhdGUucGVyUGFnZSA8PSAwID8gJyBkaXNhYmxlZCc6ICcnXHJcblxyXG4gICAgaWYgKCF0aGlzLnN0YXRlLmhpZGVBY3Rpb25zKSB7XHJcbiAgICAgIGhlYWRlcnMucHVzaCggICAgICBcclxuICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBrZXk9e01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX0+ICAgICAgICAgICAgXHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwicG9zaXRpb24tc3RhdGljXCIgdHlwZT1cImNoZWNrYm94XCIvPlxyXG4gICAgICAgIDwvdGg+XHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0YXRlLmNvbHMpIHtcclxuICAgICAgbGV0IGhlYWRlclRpdGxlcyA9IE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuY29scylcclxuICAgICAgZm9yKGxldCBjb2wgb2YgaGVhZGVyVGl0bGVzKSB7XHJcbiAgICAgICAgaGVhZGVycy5wdXNoKDx0aCBzY29wZT1cImNvbFwiIGRhdGEtYmluZD17dGhpcy5zdGF0ZS5jb2xzW2NvbF0uYm91bmRUb30ga2V5PXtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9Pntjb2x9PC90aD4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcm93cyA9IFtdXHJcbiAgICBpZiAodGhpcy5zdGF0ZS5yb3dzICYmIHRoaXMuc3RhdGUucm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZvcihsZXQgcm93IG9mIHRoaXMuc3RhdGUucm93cykge1xyXG4gICAgICAgIHJvd3MucHVzaCg8VGFibGVSb3cga2V5PXtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9IHNob3dTZWxlY3Q9eyF0aGlzLnN0YXRlLmhpZGVBY3Rpb25zfSBjZWxscz17cm93fSBjb2xzPXt0aGlzLnN0YXRlLmNvbHN9IG9uQ2xpY2s9e3RoaXMuc3RhdGUuaGFuZGxlQ2xpY2t9IGhyZWY9e3RoaXMuc3RhdGUuYmFzZVVSTH0gaWQ9e3RoaXMuc3RhdGUuaWR9Lz4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8PlxyXG4gICAgICB7dGhpcy5zdGF0ZS5sb2FkZWQgJiYgXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtcmVzcG9uc2l2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwidGhlYWQtZGFya1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2hlYWRlcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtyb3dzLmxlbmd0aCA+IDAgJiYgcm93c31cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIHshdGhpcy5zdGF0ZS5oaWRlQWN0aW9ucyAmJiBcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbXgtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+QWN0aW9uIG9uIHNlbGVjdGVkIHJvd3M8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmFjdGlvbnMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLmFjdGlvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIi8+XHJcbiAgICAgICAgICAgICAgICB7IXRoaXMuc3RhdGUuaGlkZVBhZ2luYXRpb24gJiYgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEwIGNvbC1zbS0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBidG4tc2Vjb25kYXJ5IG0tMVwiICsgcHJldlBhZ2V9IGRhdGEtcGFnZT1cIi0yXCIgb25DbGljaz17dGhpcy5oYW5kbGVQYWdlLmJpbmQodGhpcyl9PiZsYXF1bzs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidG4gYnRuLXNlY29uZGFyeSBtLTFcIiArIHByZXZQYWdlfSBkYXRhLXBhZ2U9XCItMVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUGFnZS5iaW5kKHRoaXMpfT4mbHNhcXVvOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm14LTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmZyb20gKyAnIC0gJyArIHRoaXMuc3RhdGUubmV4dE9mZnNldCArICcgb2YgJyArIHRoaXMuc3RhdGUuY291bnR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBidG4tc2Vjb25kYXJ5IG0tMVwiICsgbmV4dFBhZ2V9IGRhdGEtcGFnZT1cIjFcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVBhZ2UuYmluZCh0aGlzKX0+JnJzYXF1bzs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidG4gYnRuLXNlY29uZGFyeSBtLTFcIiArIG5leHRQYWdlfSBkYXRhLXBhZ2U9XCIyXCIgb25DbGljaz17dGhpcy5oYW5kbGVQYWdlLmJpbmQodGhpcyl9PiZyYXF1bzs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICB9XHJcbiAgICAgIDwvPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgQWxlcnQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkgeyBcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2FsZXJ0IGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvdyBhbGVydC0nICsgdGhpcy5wcm9wcy5hbGVydFR5cGV9IHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAge3R5cGVvZiB0aGlzLnByb3BzLm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHRoaXMucHJvcHMubWVzc2FnZX1cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4gXHJcbmV4cG9ydCBkZWZhdWx0IEFsZXJ0O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgRTQwNCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7IFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9mLWNvbnRcIj5cclxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9mLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImVycm9yLWNvZGVcIj40MDQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvZi1kZXNjXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHBhZ2UgeW91IHdlcmUgbG9va2luZyBmb3IgY291bGQgbm90IGJlIGZvdW5kLiA8YSBocmVmPVwiL1wiIGNsYXNzTmFtZT1cIjQwNC1ob21lXCI+Q2xpY2sgaGVyZSB0byBnbyBob21lPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFNDAxIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHsgXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb2YtY29udFwiPlxyXG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb2YtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiZXJyb3ItY29kZVwiPjQwMTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9mLWRlc2NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgYXJlIHVuYXV0aG9yaXplZCB0byB2aWV3IHRoZSByZXF1ZXN0ZWQgcGFnZS4gPGEgaHJlZj1cIi9cIiBjbGFzc05hbWU9XCI0MDQtaG9tZVwiPkNsaWNrIGhlcmUgdG8gZ28gaG9tZTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkQ2F0Y2goZXJyLCBpbmZvKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFxyXG4gICAgICAgICAgICBoYXNFcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIsICcgJywgaW5mbylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvZi1jb250XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGNlbnRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb2YtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJlcnJvci1jb2RlXCI+RnVjazwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb2YtZGVzY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC4gPGEgaHJlZj1cIi9cIiBjbGFzc05hbWU9XCI0MDQtaG9tZVwiPkNsaWNrIGhlcmUgdG8gZ28gaG9tZTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yLnRvU3RyaW5nKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9jZW50ZXI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgfVxyXG59XHJcbiBcclxuZXhwb3J0IHsgRTQwNCwgRTQwMSwgRXJyb3JCb3VuZGFyeSB9OyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb3RlciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJiZy1kYXJrXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlciBwdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtM1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInRleHQtbGlnaHRcIiBocmVmPVwiI1wiPkZBUTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5IZWxwICZhbXA7IFRyYWluaW5nPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJwbC00IHRleHQtbGlnaHRcIiBocmVmPVwiI1wiPkNvbnRhY3QgJmFtcDsgVmVuZG9yczwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5GZWF0dXJlZCBQYXJ0bmVyczwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5JbnRlZ3JhdGlvbiBSZXNvdXJjZSBDZW50ZXI8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInBsLTQgdGV4dC1saWdodFwiIGhyZWY9XCIjXCI+Q0FNIFJlc291cmNlczwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGwtNCB0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5VdGlsaXR5IE1lbnU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInBsLTQgdGV4dC1saWdodFwiIGhyZWY9XCIjXCI+UEZCIENhdGFsb2cgTWFpbnQuPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTNcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlciBwdC01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB0ZXh0LWNlbnRlciBwYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5Qcml2YWN5IFBvbGljeTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGwtNCBwci00IGQtaW5saW5lXCI+fDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwidGV4dC1saWdodFwiIGhyZWY9XCIjXCI+Q29weXJpZ2h0PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC00IHByLTQgZC1pbmxpbmVcIj58PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ0ZXh0LWxpZ2h0XCIgaHJlZj1cIiNcIj5UZXJtcyAmYW1wOyBDb25kaXRpb25zPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGb290ZXIgfVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHsgXHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmlzSGlkZGVuICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydmb3JtLWdyb3VwICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX0gIGlkPXsnY29udCcgKyB0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuYXR0cmlidXRlc30gdHlwZT17dGhpcy5wcm9wcy50eXBlfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD17dGhpcy5wcm9wcy5pZH0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWUgfHwgJyd9IG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTZWxlY3RGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG90aGVyRmllbGQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RJZDogdGhpcy5wcm9wcy5pZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZShlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnb3RoZXJTZWxlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe290aGVyRmllbGQ6IHRydWUsIGlkOiBlLnRhcmdldC5pZCwgc2VsZWN0SWQ6ICcnfSlcclxuICAgICAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdvbGRJZCcsIGUudGFyZ2V0LmlkKVxyXG4gICAgICAgICAgICBlLnRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgb2xkSWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ29sZElkJylcclxuICAgICAgICAgICAgaWYgKG9sZElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvdGhlckZpZWxkOiBmYWxzZSwgaWQ6IG51bGwsIHNlbGVjdElkOiBvbGRJZH0pXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ29sZElkJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe290aGVyRmllbGQ6IGZhbHNlLCBpZDogbnVsbCwgc2VsZWN0SWQ6IGUudGFyZ2V0LmlkfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gW11cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLm9wdHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub3B0cy5mb3JFYWNoKG9wdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17b3B0fSBrZXk9e01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApfT57b3B0fTwvb3B0aW9uPilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9e29wdC52YWx1ZX0ga2V5PXtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKX0+e29wdC50ZXh0fTwvb3B0aW9uPilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm90aGVyRmllbGQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKDxvcHRpb24gdmFsdWU9XCJvdGhlclNlbGVjdGlvblwiIGtleT17TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCl9Pk90aGVyPC9vcHRpb24+KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXRoaXMucHJvcHMuaXNIaWRkZW4gJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2Zvcm0tZ3JvdXAgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGlkPXt0aGlzLnN0YXRlLnNlbGVjdElkfSBvbkNoYW5nZT17KGUpID0+IHt0aGlzLmhhbmRsZU9uQ2hhbmdlKGUpOyB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpfX0gdmFsdWU9e3RoaXMuc3RhdGUub3RoZXJGaWVsZD8gICdvdGhlclNlbGVjdGlvbicgOiB0aGlzLnByb3BzLnZhbHVlfT5cclxuICAgICAgICAgICAgICAgICAgICB7b3B0aW9uc31cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUub3RoZXJGaWVsZCAmJiA8aW5wdXQgaWQ9e3RoaXMuc3RhdGUuaWR9IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIG10LTNcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0+PC9pbnB1dD59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRmllbGQsIFNlbGVjdEZpZWxkIH0iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGaWVsZCwgU2VsZWN0RmllbGQgfSBmcm9tICcuLi9jb21tb24vZm9ybXMuanN4JztcclxuaW1wb3J0IEFQSSBmcm9tICcuLi9saWIvQVBJLmpzJztcclxuaW1wb3J0IEFsZXJ0IGZyb20gJy4uL2NvbW1vbi9hbGVydHMuanN4JztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL2NvbW1vbi9UYWJsZS5qc3gnXHJcbmltcG9ydCBQaWxscyBmcm9tICcuLi9jb21tb24vUGlsbExheW91dC5qc3gnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlSW5mbyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Li4ucHJvcHN9XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5tb2RpZmllZEZpZWxkcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRzID0gey4uLnRoaXMuc3RhdGUuZmllbGRzfVxyXG4gICAgICAgIGxldCBtb2RpZmllZEZpZWxkcyA9IHRoaXMuc3RhdGUubW9kaWZpZWRGaWVsZHNcclxuICAgICAgICBmaWVsZHNbZS50YXJnZXQuaWRdID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICBpZiAobW9kaWZpZWRGaWVsZHMuaW5kZXhPZihlLnRhcmdldC5pZCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG1vZGlmaWVkRmllbGRzLnB1c2goZS50YXJnZXQuaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkcywgbW9kaWZpZWRGaWVsZHN9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybU5hbWUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9ybScpIHx8ICdwcm9maWxlJ1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJyMnICsgdGhpcy5zdGF0ZS5tb2RpZmllZEZpZWxkcy5qb2luKCcsICMnKVxyXG4gICAgICAgIGNvbnN0IGZvcm1Db250ZXh0ID0gJ2Zvcm1bbmFtZT0nICsgZm9ybU5hbWUgKyAnXSdcclxuICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgc3lzX2lkOiAkKCcjc3lzX2lkJykudmFsKClcclxuICAgICAgICB9XHJcbiAgICAgICAgJChzZWxlY3RvciwgZm9ybUNvbnRleHQpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgYm9keVt0aGlzLmlkXSA9IHRoaXMudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIEFQSS5wdXQoe1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FwaS9xL3N5c191c2VyLycgKyBib2R5LnN5c19pZCxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgICAgICB9LCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgaWYgKGVycikgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIGVycm9yTWVzc2FnZTogZXJyfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgJiYgPEFsZXJ0IG1lc3NhZ2U9e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlfSBhbGVydFR5cGU9XCJkYW5nZXJcIiAvPn1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm1lc3NhZ2UgJiYgPEFsZXJ0IG1lc3NhZ2U9e3RoaXMuc3RhdGUubWVzc2FnZX0gYWxlcnRUeXBlPVwic3VjY2Vzc1wiIC8+fVxyXG4gICAgICAgICAgICAgICAgPGg0PiBVc2VyIEluZm9ybWF0aW9uIDwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8aHIvPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybS1yb3dcIiBuYW1lPVwicHJvZmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJzeXNfaWRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMuc3lzX2lkfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGlkPVwidXNlcm5hbWVcIiBsYWJlbD1cIlVzZXJuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLnVzZXJuYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJlbWFpbFwiIGxhYmVsPVwiRW1haWxcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMuZW1haWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cInVzZXJGaXJzdE5hbWVcIiBsYWJlbD1cIkZpcnN0IE5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMudXNlckZpcnN0TmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC0xMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGlkPVwidXNlckxhc3ROYW1lXCIgbGFiZWw9XCJMYXN0IE5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMudXNlckxhc3ROYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJwaG9uZVwiIGxhYmVsPVwiUGhvbmUgTnVtYmVyXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLnBob25lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0RmllbGQgaWQ9XCJ1c2VyRGVmYXVsdE5vbnNpZ1wiIGxhYmVsPVwiSG9tZSBOb25zaWdcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMudXNlckRlZmF1bHROb25zaWd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvcHRzPXt0aGlzLnN0YXRlLmN1c3RvbWVyc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cInVzZXJQYXNzXCIgbGFiZWw9XCJQYXNzd29yZFwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy51c2VyUGFzc30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC0xMlwiIHR5cGU9XCJwYXNzd29yZFwiIGF0dHJpYnV0ZXM9e3tvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cInVzZXJQYXNzQ29uZmlybWF0aW9uXCIgbGFiZWw9XCJDb25maXJtIFBhc3N3b3JkXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLnVzZXJQYXNzQ29uZmlybWF0aW9ufSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgdHlwZT1cInBhc3N3b3JkXCIgYXR0cmlidXRlcz17e29uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXN9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrIHN1Ym1pdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9IGRhdGEtZm9ybT1cInByb2ZpbGVcIiB0eXBlPVwiYnV0dG9uXCI+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFVzZXJQcm9maWxlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICcnLFxyXG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHN5c19pZDogJycsXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJycsXHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25Ob25zaWc6ICcnLFxyXG4gICAgICAgICAgICAgICAgdXNlckZpcnN0TmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICB1c2VyTGFzdE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGhvbmU6ICcnLFxyXG4gICAgICAgICAgICAgICAgdXNlckRlZmF1bHROb25zaWc6ICcnLFxyXG4gICAgICAgICAgICAgICAgdXNlclBhc3M6ICd0aGlzaXNub3RhbmFjdHVhbHBhc3N3b3JkJyxcclxuICAgICAgICAgICAgICAgIHVzZXJQYXNzQ29uZmlybWF0aW9uOiAndGhpc2lzbm90YW5hY3R1YWxwYXNzd29yZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW9kaWZpZWRGaWVsZHM6IFtdLFxyXG4gICAgICAgICAgICBzeXNfaWQ6IHByb3BzLm1hdGNoLnBhcmFtcy51c2VySWQgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGxvZ3M6IFtdLFxyXG4gICAgICAgICAgICBsb2dDb2xzOiB7XHJcbiAgICAgICAgICAgICAgICAnVGltZSc6IHtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZFRvOiAnbG9nX3RpbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdBY3Rpb24nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRUbzogJ2xvZ19tZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjdXN0b21lcnM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0VXNlcigpXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRzID0gey4uLnRoaXMuc3RhdGUuZmllbGRzfVxyXG4gICAgICAgIGxldCBtb2RpZmllZEZpZWxkcyA9IHRoaXMuc3RhdGUubW9kaWZpZWRGaWVsZHNcclxuICAgICAgICBmaWVsZHNbZS50YXJnZXQuaWRdID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICBpZiAobW9kaWZpZWRGaWVsZHMuaW5kZXhPZihlLnRhcmdldC5pZCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG1vZGlmaWVkRmllbGRzLnB1c2goZS50YXJnZXQuaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkcywgbW9kaWZpZWRGaWVsZHN9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUZvY3VzKGUpIHtcclxuICAgICAgICBlLnRhcmdldC5zZWxlY3QoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgbGV0IGFwaVE7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3lzX2lkKSB7XHJcbiAgICAgICAgICAgIGFwaVEgPSBBUEkuR0VUKHtcclxuICAgICAgICAgICAgICAgIHBhdGg6ICcvYXBpL3VzZXJzL3Byb2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBzeXNfaWQ6IHRoaXMuc3RhdGUuc3lzX2lkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpUSA9IEFQSS5HRVQoe3BhdGg6ICcvYXBpL3VzZXJzL21lJ30pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwaVEudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHRocm93IHJlc3BvbnNlLmVycm9yc1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB7Li4udGhpcy5zdGF0ZS5maWVsZHN9XHJcbiAgICAgICAgICAgIGxldCBjdXN0b21lcnMgPSBbXVxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5jdXN0b21lcnMpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEuY3VzdG9tZXJzLm1hcChjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzLnB1c2goY3VzdG9tZXIubnNhTm9uc2lnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhyZXNwb25zZS5kYXRhLnVzZXIpLm1hcChmaWVsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVtmaWVsZF0gPSByZXNwb25zZS5kYXRhLnVzZXJbZmllbGRdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHN0YXRlWydub3RpZmljYXRpb25Ob25zaWcnXSA9IHJlc3BvbnNlLmRhdGEudXNlci51c2VyRGVmYXVsdE5vbnNpZ1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGZpZWxkczogc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBsb2dzOiByZXNwb25zZS5kYXRhLmxvZ3MsXHJcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21lcnNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybU5hbWUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9ybScpIHx8ICdwcm9maWxlJ1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gJyMnICsgdGhpcy5zdGF0ZS5tb2RpZmllZEZpZWxkcy5qb2luKCcsICMnKVxyXG4gICAgICAgIGNvbnN0IGZvcm1Db250ZXh0ID0gJ2Zvcm1bbmFtZT0nICsgZm9ybU5hbWUgKyAnXSdcclxuICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgc3lzX2lkOiAkKCcjc3lzX2lkJykudmFsKClcclxuICAgICAgICB9XHJcbiAgICAgICAgJChzZWxlY3RvciwgZm9ybUNvbnRleHQpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgYm9keVt0aGlzLmlkXSA9IHRoaXMudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIEFQSS5wdXQoe1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FwaS9xL3N5c191c2VyLycgKyBib2R5LnN5c19pZCxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgICAgICB9LCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgaWYgKGVycikgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIGVycm9yTWVzc2FnZTogZXJyfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBwaWxscyA9IHtcclxuICAgICAgICAgICAgcHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdwcm9maWxlJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICBib2R5OiA8VXNlclByb2ZpbGVJbmZvIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSBmaWVsZHM9e3suLi50aGlzLnN0YXRlLmZpZWxkc319IGN1c3RvbWVycz17dGhpcy5zdGF0ZS5jdXN0b21lcnN9IC8+XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnbm90aWZpY2F0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ05vdGlmaWNhdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Ob3RpZmljYXRpb25zIEZvcjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxvYWRlZCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdEZpZWxkIGlkPVwibm90aWZpY2F0aW9uTm9uc2lnXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLm5vdGlmaWNhdGlvbk5vbnNpZ30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IG9wdHM9e3RoaXMuc3RhdGUuY3VzdG9tZXJzfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gbmFtZT1cIm5vdGlmaWNhdGlvblByZWZlcmVuY2VzXCIgY2xhc3NOYW1lPVwiZm9ybS1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtc20tMTIgZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImludm9pY2VcIj5XaGVuIEkgcmVjZWl2ZSBhbiBpbnZvaWNlOiA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwiaW52b2ljZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj5TZW5kIGFuIGVtYWlsPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPkRvIG5vdCBlbWFpbCBtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLXNtLTEyIGZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjaGdiY2tcIj5XaGVuIEkgcmVjZWl2ZSBhIGNoYXJnZWJhY2s6IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJjaGdiY2tcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+U2VuZCBhbiBlbWFpbDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj5EbyBub3QgZW1haWwgbWU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1zbS0xMiBmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZzg2XCI+V2hlbiBJIHJlY2VpdmUgYSBHODY6IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJnODZcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+U2VuZCBhbiBlbWFpbDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj5EbyBub3QgZW1haWwgbWU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1zbS0xMiBmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZmhxXCI+V2hlbiBJIHJlY2VpdmUgYSBGbGVldEhRIENhbGw6IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJmaHFcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+U2VuZCBhbiBlbWFpbDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj5EbyBub3QgZW1haWwgbWU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1zbS0xMiBmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZG9oXCI+RG9jdW1lbnRzIG9uIGhvbGQgb2xkZXIgdGhhbiA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwiZG9oXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPkRvIG5vdCBlbWFpbCBtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj4xIERheTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj41IERheXM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+MTQgRGF5czwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj4xIE1vbnRoPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPjMgTW9udGhzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtc20tMTIgZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm5ld3NcIj5XaGVuIG5ld3MgaXMgcmVsZWFzZWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwibmV3c1wiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj5TZW5kIGFuIGVtYWlsPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPkRvIG5vdCBlbWFpbCBtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBzdWJtaXRcIiBkYXRhLWZvcm09XCJub3RpZmljYXRpb25QcmVmZXJlbmNlc1wiIHR5cGU9XCJidXR0b25cIj5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbG9nczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdsb2dzJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSGlzdG9yeScsXHJcbiAgICAgICAgICAgICAgICBib2R5OiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PiBIaXN0b3J5IDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiBWaWV3IGFjdGlvbnMgdGhhdCBoYXZlIGJlZW4gdGFrZW4gb24geW91ciBhY2NvdW50IDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubG9hZGVkICYmIDxUYWJsZSBjb2xzPXt0aGlzLnN0YXRlLmxvZ0NvbHN9IHJvd3M9e3RoaXMuc3RhdGUubG9nc30gaGlkZUFjdGlvbnM9e3RydWV9IC8+IH1cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubG9hZGVkICYmIDxQaWxscyBwaWxscz17cGlsbHN9IGhhbmRsZUZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzLmJpbmQodGhpcyl9IGhhbmRsZUNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gaGFuZGxlU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0gey4uLnRoaXMuc3RhdGV9IC8+IH1cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBTdXNwZW5zZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi9jb21tb24vZm9vdGVyLmpzeCdcclxuaW1wb3J0IHsgRTQwNCwgRXJyb3JCb3VuZGFyeSB9IGZyb20gJy4vY29tbW9uL2Vycm9ycy5qc3gnO1xyXG5pbXBvcnQgVXNlclByb2ZpbGUgZnJvbSAnLi9ob21lL1VzZXJQcm9maWxlLmpzeCc7XHJcbmltcG9ydCBDdXN0b21lcnMgZnJvbSAnLi9hZG1pbi9DdXN0b21lcnMuanN4J1xyXG5pbXBvcnQgQ3VzdG9tZXIgZnJvbSAnLi9hZG1pbi9DdXN0b21lci5qc3gnXHJcbmltcG9ydCBVc2VycyBmcm9tICcuL2FkbWluL1VzZXJzLmpzeCdcclxuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnLi9uYXZpZ2F0aW9uLmpzeCdcclxuaW1wb3J0IFwiQGJhYmVsL3BvbHlmaWxsXCJcclxuaW1wb3J0IFN1c3BlbnNlTG9hZGVyIGZyb20gJy4vY29tbW9uL1N1c3BlbnNlLmpzeCc7XHJcblxyXG5jb25zdCBBZG1pbiA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KCcuL2FkbWluL0FkbWluLmpzeCcpKVxyXG5jb25zdCBEYXNoYm9hcmQgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnLi9ob21lL2Rhc2hib2FyZC5qc3gnKSlcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIGxldCB0b2tlbiA9IHRoaXMucXMoJ3Rva2VuJylcclxuICAgICAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICAgICAgdXNlcklkOiBudWxsLFxyXG4gICAgICAgICAgICBwcml2czogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LlRIUSA9IHtcclxuICAgICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICAgIHVzZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHRva2VuKVxyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtsb2FkZWQ6IHRydWV9LCAnVGlyZS1IUScsICcvJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5USFEudG9rZW4gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe2xvYWRlZDogdHJ1ZX0sICdUaXJlLUhRJywgJy8nKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cuVEhRLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvdXQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEludGVydmFsKHRoaXMucmVmcmVzaFRva2VuLCAzMDAwMDApXHJcbiAgICB9XHJcblxyXG4gICAgcXMoa2V5KSB7XHJcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpOyAvLyBlc2NhcGUgUmVnRXggbWV0YSBjaGFyc1xyXG4gICAgICAgIHZhciBtYXRjaCA9IGxvY2F0aW9uLnNlYXJjaC5tYXRjaChuZXcgUmVnRXhwKFwiWz8mXVwiK2tleStcIj0oW14mXSspKCZ8JClcIikpO1xyXG4gICAgICAgIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dvdXQnXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFRva2VuKCkge1xyXG4gICAgICAgIGxldCB0b2tlbiA9IHdpbmRvdy5USFEudG9rZW5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dvdXQnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IEpTT04ucGFyc2UoYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSlcclxuICAgICAgICAgICAgY29uc3QgZGlmZiA9IChkZXRhaWxzLmV4cCAqIDEwMDApIC0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgaWYgKGRpZmYgPCAzMDAwMDApIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCgnL2FwaS9yZWZyZXNoP3Rva2VuPScgKyB0b2tlbiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS50b2tlbiAmJiAhcmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5USFEudG9rZW4gPSByZXNwb25zZS50b2tlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCByZXNwb25zZS50b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dvdXQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKGxvYWRpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxvYWRpbmdJbnRlcnZhbClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmctY29udGFpbmVyJykucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGluZy1jb250YWluZXInKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnk+XHJcbiAgICAgICAgICAgICAgICA8Um91dGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZpZ2F0aW9uLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEVycm9yQm91bmRhcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3VzcGVuc2UgZmFsbGJhY2s9e1N1c3BlbnNlTG9hZGVyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0Rhc2hib2FyZH0+PC9Sb3V0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvcHJvZmlsZVwiIGNvbXBvbmVudD17VXNlclByb2ZpbGV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRtaW4vXCIgY29tcG9uZW50PXtBZG1pbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY3VzdG9tZXIvOmN1c3RvbWVyXCIgY29tcG9uZW50PXtDdXN0b21lcn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY2hhbmdlQ3VzdG9tZXJcIiBjb21wb25lbnQ9e0N1c3RvbWVyc30gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXNlckFkbWluaXN0cmF0aW9uXCIgY29tcG9uZW50PXtVc2Vyc30gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17RTQwNH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3dpdGNoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TdXNwZW5zZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxyXG5cdFx0ICAgICAgICAgICAgICAgIDxGb290ZXIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIDwvUm91dGVyPlxyXG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5yZW5kZXIoPEFwcC8+ICwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKSlcclxuIiwiXHJcbmZ1bmN0aW9uIGZsYXR0ZW5RdWVyeShxdWVyeU9iamVjdCkge1xyXG4gICAgbGV0IHF1ZXJ5U3RyaW5nQXJyYXkgPSBbYHRva2VuPSR7d2luZG93LlRIUS50b2tlbiB8fCAnJ31gXVxyXG4gICAgaWYgKHF1ZXJ5T2JqZWN0ICYmIHR5cGVvZiBxdWVyeU9iamVjdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhxdWVyeU9iamVjdCkubWFwKHF1ZXJ5S2V5ID0+IHtcclxuICAgICAgICAgICAgcXVlcnlTdHJpbmdBcnJheS5wdXNoKGAke3F1ZXJ5S2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeU9iamVjdFtxdWVyeUtleV0pfWApXHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSBpZiAocXVlcnlPYmplY3QpIHtcclxuICAgICAgICBxdWVyeVN0cmluZ0FycmF5LnB1c2gocXVlcnkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcXVlcnlTdHJpbmdBcnJheS5qb2luKCcmJylcclxufVxyXG5cclxuY29uc3QgQVBJID0ge1xyXG4gICAgUE9TVDogKHtwYXRoLCBib2R5fSwgY2IpID0+IHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgR0VUOiAoe3BhdGgsIHF1ZXJ5fSwgY2IpID0+IHtcclxuICAgICAgICBjb25zdCBhdXRoUGF0aCA9IHBhdGggKyAnPycgKyBmbGF0dGVuUXVlcnkocXVlcnkpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ01ha2luZyBHRVQgcmVxdWVzdCB0byAnICsgYXV0aFBhdGgpXHJcbiAgICAgICAgaWYgKGNiICE9PSBudWxsICYmIGNiICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgJC5hamF4KGF1dGhQYXRoLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlcylcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYihlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICQuYWpheChhdXRoUGF0aCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVyclxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHB1dDogKHtwYXRoLCBxdWVyeSwgYm9keX0sIGNiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXV0aFBhdGggPSBwYXRoICsgJz8nICsgZmxhdHRlblF1ZXJ5KHF1ZXJ5KVxyXG4gICAgICAgIGlmIChjYiAhPT0gbnVsbCAmJiBjYiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICQuYWpheChhdXRoUGF0aCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGJvZHksXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXMpXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoYXV0aFBhdGgsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSSIsImZ1bmN0aW9uIGZldGNoTG9naW4odG9rZW4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHRva2VuID0gd2luZG93LlRIUS50b2tlblxyXG4gICAgICAgIGxldCBkZXRhaWxzID0gSlNPTi5wYXJzZShhdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKVxyXG4gICAgICAgIHdpbmRvdy5USFEudXNlciA9IGRldGFpbHNcclxuICAgICAgICBpZiAoZGV0YWlscy51c2VySWQgPT09IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkZCcpIFxyXG4gICAgICAgICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmF2aWdhdGlvbicpIFxyXG4gICAgICAgICYmICh3aW5kb3cuVEhRLnByaXZzICYmIHdpbmRvdy5USFEudXNlci5wcml2cy5sZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV3IHVzZXIgdXNlcklkID0gJywgZGV0YWlscy51c2VySWQsICcgRXhpc3RpbmcgdXNlcklkID0gJywgbG9jYWxTdG9yYWdlLnVzZXJJZClcclxuICAgICAgICAgICAgbGV0IGV2ZW50XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KCd0aHEucmVjZWl2ZWROYXYnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKVxyXG4gICAgICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KCd0aHEucmVjZWl2ZWROYXYnLCB0cnVlLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXHJcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hdmlnYXRpb24nKSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VySWQnLCBkZXRhaWxzLnVzZXJJZClcclxuICAgICAgICAgICAgJC5hamF4KCcvbG9naW4vbmF2aWdhdGlvbj90b2tlbj0nICsgdG9rZW4sIHtcclxuICAgICAgICAgICAgICAgIHhockZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5lcnJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVzID0gZm9ybWF0TmF2aWdhdGlvbihyZXNwb25zZS5kZXRhaWxzLm5hdnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5USFEudXNlci5wcml2cyA9IHJlc3BvbnNlLmRldGFpbHMucHJpdnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYXZpZ2F0aW9uJywgSlNPTi5zdHJpbmdpZnkobWVudXMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQoJ3RocS5yZWNlaXZlZE5hdicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5pbml0RXZlbnQoJ3RocS5yZWNlaXZlZE5hdicsIHRydWUsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtZW51cylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycilcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXROYXZpZ2F0aW9uKG5hdmlnYXRpb25MaW5rcykge1xyXG4gICAgbGV0IG1lbnVzID0ge31cclxuICAgIGZvciAobGV0IGxpbmsgb2YgbmF2aWdhdGlvbkxpbmtzKSB7XHJcbiAgICAgICAgaWYgKCFtZW51c1tsaW5rLm5hdk1lbnVdKSB7XHJcbiAgICAgICAgICAgIG1lbnVzW2xpbmsubmF2TWVudV0gPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVudXNbbGluay5uYXZNZW51XVtsaW5rLm5hdkhlYWRlcl0pKSB7XHJcbiAgICAgICAgICAgIG1lbnVzW2xpbmsubmF2TWVudV1bbGluay5uYXZIZWFkZXJdID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVudXNbbGluay5uYXZNZW51XVtsaW5rLm5hdkhlYWRlcl0ucHVzaCh7XHJcbiAgICAgICAgICAgIGhyZWY6IGxpbmsubmF2SHJlZixcclxuICAgICAgICAgICAgaW5uZXJUZXh0OiBsaW5rLm5hdklubmVyVGV4dFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB3aW5kb3cuVEhRLm1lbnVzID0gT2JqZWN0LmtleXMobWVudXMpXHJcbiAgICByZXR1cm4gbWVudXNcclxufVxyXG5cclxuZXhwb3J0IHsgZmV0Y2hMb2dpbiB9IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBmZXRjaExvZ2luIH0gZnJvbSAnLi9sb2dpblByb2Nlc3MvZ2V0TmF2aWdhdGlvbic7XHJcblxyXG4vLyBSZWFjdC1Sb3V0ZXJcclxuaW1wb3J0IHsgUm91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5cclxuY2xhc3MgTmF2aWdhdGlvbkhlYWRpbmcgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGxpbmtzID0gW11cclxuICAgICAgICBsZXQga2V5ID0gMFxyXG4gICAgICAgIGZvciAobGV0IG5hdkxpbmsgb2YgdGhpcy5wcm9wcy5saW5rcykge1xyXG4gICAgICAgICAgICBsaW5rcy5wdXNoKDxMaW5rIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiB0bz17bmF2TGluay5ocmVmfSBrZXk9eyduYXYtbGluaycgKyBrZXl9PntuYXZMaW5rLmlubmVyVGV4dH08L0xpbms+KVxyXG4gICAgICAgICAgICBrZXkrK1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93bi1oZWFkZXJcIj57dGhpcy5wcm9wcy5oZWFkZXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7bGlua3N9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTmF2aWdhdGlvbkRyb3Bkb3duIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByYW5kSWQgPSAnZHJvcERvd24nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMClcclxuICAgICAgICBsZXQgc3ViSGVhZGluZ3MgPSBbXVxyXG4gICAgICAgIGxldCBrZXkgPSAwXHJcbiAgICAgICAgXHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5wcm9wcy5uYXZIZWFkaW5nKS5tYXAoaGVhZGluZyA9PiB7XHJcbiAgICAgICAgICAgIHN1YkhlYWRpbmdzLnB1c2goPE5hdmlnYXRpb25IZWFkaW5nIGhlYWRlcj17aGVhZGluZ30gbGlua3M9e3RoaXMucHJvcHMubmF2SGVhZGluZ1toZWFkaW5nXX0ga2V5PXsnbmF2LWhlYWRlcicgKyBrZXl9IC8+KVxyXG4gICAgICAgICAgICBrZXkrK1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtIGRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGluayB0ZXh0LWxpZ2h0IGRyb3Bkb3duLXRvZ2dsZSBwbC0zXCIgaHJlZj1cIiNcIiBpZD17cmFuZElkfSBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj48aDU+e3RoaXMucHJvcHMubmF2VGl0bGV9PC9oNT48L2E+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9e3JhbmRJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgZmxleC1sZy1ub3dyYXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWJIZWFkaW5nc31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5hdjogbnVsbCxcclxuICAgICAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldE5hdigpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmF2KCkge1xyXG4gICAgICAgIGZldGNoTG9naW4oKVxyXG4gICAgICAgIC50aGVuKG5hdmlnYXRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAobmF2aWdhdGlvbi5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmF2OiBuYXZpZ2F0aW9uLCBsb2FkZWQ6IHRydWV9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBvY2N1cnJlZCcpXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtuYXY6ICdFcnJvcicsIGxvYWRlZDogdHJ1ZX0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubmF2ID09PSBudWxsIHx8IHRoaXMuc3RhdGUubmF2ID09PSB1bmRlZmluZWQgfHwgdGhpcy5zdGF0ZS5sb2FkZWQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWVudXMgPSBbXVxyXG4gICAgICAgICAgICBsZXQga2V5ID0gMFxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLm5hdikubWFwKG1lbnUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWVudXMucHVzaCg8TmF2aWdhdGlvbkRyb3Bkb3duIG5hdkhlYWRpbmc9e3RoaXMuc3RhdGUubmF2W21lbnVdfSBuYXZUaXRsZT17bWVudX0ga2V5PXtrZXl9IC8+KVxyXG4gICAgICAgICAgICAgICAga2V5KytcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQtbGcgbmF2YmFyLWRhcmsgYmctZ29vZHllYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiB0bz1cIi9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvcHVibGljL2ltYWdlcy9sb2dvLnBuZ1wiIGhlaWdodD1cIjYwcHhcIj48L2ltZz5cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlclwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjbWFpbk5hdlwiIGFyaWEtY29udHJvbHM9XCJtYWluLW5hdlwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgbmF2aWdhdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm1haW5OYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtci1hdXRvIG5hdmJhci1uYXZcIiBpZD1cIm1lbnVDb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21lbnVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtIGRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZSBwbC0zIG5hdi1pdGVtIG1sLWF1dG9cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaWQ9XCJhY2NvdW50XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj48aW1nIGNsYXNzTmFtZT1cInJvdW5kZWQtY2lyY2xlIGltZ1wiIHNyYz1cIi9wdWJsaWMvaW1hZ2VzL2FjY291bnQucG5nXCIvPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCIgYXJpYS1sYWJlbGxlZGJ5PVwiYWNjb3VudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiB0bz1cIi9jaGFuZ2VDdXN0b21lclwiPkNoYW5nZSBDdXN0b21lcjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgdG89XCIvdXNlckFkbWluaXN0cmF0aW9uXCI+VXNlciBBZG1pbmlzdHJhdGlvbjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgdG89XCIvcHJvZmlsZVwiPlByb2ZpbGU8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+RnJlbmNoPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiL2xvZ291dFwiPkxvZ291dDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==