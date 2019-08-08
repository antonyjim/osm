(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/App.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _common_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/common/Footer.tsx");
/* harmony import */ var _common_Errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/Errors.tsx");
/* harmony import */ var _admin_Customer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/Customer.tsx");
/* harmony import */ var _home_Navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/home/Navigation.tsx");
/* harmony import */ var _home_Dashboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/home/Dashboard.tsx");
/* harmony import */ var _common_ListView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/common/ListView.tsx");
/* harmony import */ var _forms_Form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/forms/Form.tsx");
/* harmony import */ var _customComponents_Workspace__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/customComponents/Workspace.tsx");

var _jsxFileName = "/var/www/osm/clientApp/src/App.tsx";


 // import '@babel/polyfill'








 // import $ from 'jquery'


var Admin = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () {
  return __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "./src/admin/Admin.tsx"));
});
var UserProfile = react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () {
  return __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, "./src/home/UserProfile.tsx"));
}); // Handle pesky window types

// Define helper functions/ components
var SuspenseLoader = react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
  className: "jumbotron",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 35
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("h1", {
  className: "display-4",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 36
  },
  __self: undefined
}, "Loading...")); // Get a new token from the server when the old one is less than 3 minutes from expiring

var refreshToken = function refreshToken() {
  var token = window.THQ.token;

  if (!token) {
    window.location.href = '/auth/logout';
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
          window.location.href = '/auth/logout';
        }
      });
    }
  }
}; // Extract key / value pairs from query string


var qs = function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&'); // escape RegEx meta chars

  var match = location.search.match(new RegExp('[?&]' + key + '=([^&]+)(&|$)'));
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

var parsedAt = 0;
function App() {
  // Expect that a token will be in the query string
  var token = qs('token');
  var user = {
    userId: null,
    privs: []
  };
  window.THQ = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, window.THQ, {
    token: token,
    user: user
  });

  if (token) {
    // Remove the token from the query string
    if (window.localStorage) {
      window.localStorage.setItem('token', token);
      window.history.pushState({
        loaded: true
      }, 'Tire-HQ', window.location.pathname);
    }
  } else {
    if (window.localStorage) {
      // Default to looking for the token in session storage
      window.THQ.token = localStorage.getItem('token'); // window.history.pushState({ loaded: true }, 'Tire-HQ', '/')

      if (!window.THQ.token) {
        window.location.href = '/auth/logout';
      }
    }
  }

  setInterval(refreshToken, 300000);

  if (window.THQ.loadingInterval) {
    clearInterval(window.THQ.loadingInterval);
    var container = document.getElementById('loading-container');
    var loadingContainer = document.getElementById('loading-container');

    if (container && container.parentElement && loadingContainer) {
      container.parentElement.removeChild(loadingContainer);
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_common_Errors__WEBPACK_IMPORTED_MODULE_5__["ErrorBoundary"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "fill",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_home_Navigation__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_common_Errors__WEBPACK_IMPORTED_MODULE_5__["ErrorBoundary"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], {
    fallback: SuspenseLoader,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/",
    component: _home_Dashboard__WEBPACK_IMPORTED_MODULE_8__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/profile",
    component: UserProfile,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/admin/",
    component: function component(props) {
      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Admin, Object.assign({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/customer/:customer",
    component: _admin_Customer__WEBPACK_IMPORTED_MODULE_6__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/t/:table",
    component: _common_ListView__WEBPACK_IMPORTED_MODULE_9__["TableList"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/f/:table/:id",
    component: _forms_Form__WEBPACK_IMPORTED_MODULE_10__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/c/:componentTitle",
    component: _customComponents_Workspace__WEBPACK_IMPORTED_MODULE_11__["Workspace"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    component: _common_Errors__WEBPACK_IMPORTED_MODULE_5__["E404"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134
    },
    __self: this
  }))))), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_common_Footer__WEBPACK_IMPORTED_MODULE_4__["Footer"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139
    },
    __self: this
  }))));
}
parsedAt = performance.now();
console.log('Calling render DOM %s milliseconds after pageload', parsedAt - (window.THQ.pageLoad || performance.now())); // if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/public/sw.js', { scope: '/public/' })
//     .then((reg) => {
//       console.log('Registration succeeded with scope ' + reg.scope)
//     })
//     .catch((err) => {
//       console.error('Serviceworker registration failed with error ' + err)
//     })
// }

Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(react__WEBPACK_IMPORTED_MODULE_1__["createElement"](App, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 162
  },
  __self: undefined
}), document.querySelector('#root'));

/***/ }),

/***/ "./src/admin/Customer.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Customer; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_PillLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/common/PillLayout.tsx");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_Table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/common/Table/index.tsx");
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/common/FormControls/index.tsx");






var _jsxFileName = "/var/www/osm/clientApp/src/admin/Customer.tsx";







var Customer =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Customer, _Component);

  function Customer(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Customer);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Customer).call(this, props));
    _this.state = {
      error: false,
      errorMessage: '',
      loaded: false,
      fields: {},
      modifiedFields: [],
      customer: props.id
    };
    if (_this.props.id !== 'new') _this.getCustomer();
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Customer, [{
    key: "getCustomer",
    value: function getCustomer() {
      var _this2 = this;

      _lib_API__WEBPACK_IMPORTED_MODULE_8__["default"].get({
        path: '/api/q/sys_customer/' + this.state.customer,
        query: {
          fields: 'nonsig,nsTradeStyle,nsAddr1,nsAddr2,nsState,nsCity,nsPostalCode,nsCountry,active,active_thq,nsType'
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
            fields: response.data.sys_customer,
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
      if (e.target instanceof HTMLInputElement) {
        var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state);

        state.fields[e.target.id] = e.target.value;
        this.setState(state);
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      console.log('Submitted');
    }
  }, {
    key: "render",
    value: function render() {
      var pills = {
        general: {
          id: 'general',
          label: 'General',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("button", {
            className: "btn btn-primary float-right",
            onClick: this.handleSubmit,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 65
            },
            __self: this
          }, "Save"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          }, "General Information"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("form", {
            className: "form-row",
            name: "generalInformation",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nonsig",
            name: "nonsig",
            type: "text",
            value: this.state.fields.nonsig,
            label: "Nonsig",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsTradeStyle",
            name: "nsTradeStyle",
            type: "text",
            value: this.state.fields.nsTradeStyle,
            label: "Tradestyle",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsAddr1",
            name: "nsAddr1",
            type: "text",
            value: this.state.fields.nsAddr1,
            label: "Address",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 92
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsAddr2",
            name: "nsAddr2",
            type: "text",
            value: this.state.fields.nsAddr2,
            label: "Address (2)",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 101
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsCity",
            name: "nsCity",
            type: "text",
            value: this.state.fields.nsCity,
            label: "City",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsState",
            name: "nsState",
            type: "text",
            value: this.state.fields.nsState,
            label: "State",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 119
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsPostalCode",
            name: "nsPostalCode",
            type: "text",
            value: this.state.fields.nsPostalCode,
            label: "Postal Code",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsCountry",
            name: "nsPostalCode",
            type: "text",
            value: this.state.fields.nsCountry,
            label: "Country",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 137
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
            id: "nsType",
            name: "nsType",
            type: "text",
            value: this.state.fields.nsType,
            label: "Type",
            className: "col-lg-6 col-md-12",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 146
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
            id: "nsIsActive",
            name: "nsIsActive",
            checked: this.state.fields.nsIsActive,
            label: "Active",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 155
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
            id: "nsIsActiveTHQ",
            name: "nsIsActiveTHQ",
            checked: this.state.fields.nsIsActiveTHQ,
            label: "Active in Tire-HQ",
            onChange: this.handleChange.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 162
            },
            __self: this
          })))
        },
        users: {
          id: 'users',
          label: 'Users',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: this
          }, "Users"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 179
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            },
            __self: this
          }, " View users associated with this customer. "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_Table__WEBPACK_IMPORTED_MODULE_9__["default"], {
            table: "sys_user_list",
            args: {
              userDefaultNonsig: this.state.customer
            },
            cols: ['sys_id', 'userFirstName', 'userLastName', 'userLastLogin', 'userDefaultNonsig', 'email'],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 181
            },
            __self: this
          }))
        },
        brands: {
          id: 'brands',
          label: 'Brands',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 201
            },
            __self: this
          }, "Brands"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 202
            },
            __self: this
          }))
        },
        logs: {
          id: 'logs',
          label: 'History',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 211
            },
            __self: this
          }, "History"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 212
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 213
            },
            __self: this
          }, "View actions that have been taken on this customer"))
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, this.state.loaded || this.state.customer === 'new' && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_PillLayout__WEBPACK_IMPORTED_MODULE_7__["default"], Object.assign({
        pills: pills
      }, this.state, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222
        },
        __self: this
      })));
    }
  }]);

  return Customer;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);



/***/ }),

/***/ "./src/common/Alerts.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/common/Alerts.tsx";


/**
 * Renders a bootstrap alert
 * @param props Options for alerts
 */
function Alert(props) {
  var dismissable = props.dismissable || true;
  var alertType = props.alertType || 'danger';

  if (typeof props.message === 'string') {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: 'alert fade show alert-' + alertType + (dismissable ? ' alert-dismissible' + alertType : ''),
      role: "alert",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, props.message, dismissable && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      type: "button",
      className: "close",
      "data-dismiss": "alert",
      "aria-label": "Close",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, "\xD7")));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
  }
}



/***/ }),

/***/ "./src/common/Can.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Can", function() { return Can; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function Can(props) {
  var privs = window.THQ.user.privs || [];

  if (window.THQ.user.privs && window.THQ.user.privs.length === 0) {
    document.addEventListener('thq.receivedNav', function (e) {
      privs = window.THQ.user.privs;
    });
  }

  function validate() {
    if (props.role && privs && privs.indexOf(props.role) > -1) {
      return true;
    } else if (props.if) {
      return true;
    } else {
      return false;
    }
  }

  if (validate()) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, props.children);
  } else {
    return null;
  }
}



/***/ }),

/***/ "./src/common/ContextMenu.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return ContextMenu; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/var/www/osm/clientApp/src/common/ContextMenu.tsx";

function ContextMenu(props) {
  var opts = [];

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__["useState"](props.show || false),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      shown = _React$useState2[0],
      setShown = _React$useState2[1];

  var menuRef = react__WEBPACK_IMPORTED_MODULE_1__["useRef"](null);

  var cancelContext = function cancelContext(e) {
    if (e.target !== menuRef.current) setShown(false);
  };

  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
    console.log('Calling effect');
    document.addEventListener('click', cancelContext, false);
    return function () {
      document.removeEventListener('click', cancelContext, false);
    };
  });
  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
    setShown(props.show || false);
  }, [props.show]);

  if (props.options) {
    props.options.map(function (opt, i) {
      opts.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "dropdown-item",
        onClick: opt.action,
        key: 'context-' + i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, opt.text));
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, shown && props.location && react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    ref: menuRef,
    className: "dropdown-menu",
    style: {
      display: 'block',
      left: props.location.x,
      top: props.location.y
    },
    tabIndex: 0,
    onBlur: cancelContext,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, opts));
}

/***/ }),

/***/ "./src/common/Errors.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E404", function() { return E404; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E401", function() { return E401; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundary", function() { return ErrorBoundary; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);





var _jsxFileName = "/var/www/osm/clientApp/src/common/Errors.tsx";



function E404() {
  return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-cont mx-a",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h1", {
    className: "error-code",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "404")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "The page you were looking for could not be found.", ' ', react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
    href: "/",
    className: "404-home",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "Click here to go home")));
}

function E401() {
  return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-cont mx-a",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h1", {
    className: "error-code",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "401")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "fof-desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "You are unauthorized to view the requested page.", ' ', react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
    href: "/",
    className: "404-home",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, "Click here to go home")));
}

var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ErrorBoundary, _Component);

  function ErrorBoundary(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ErrorBoundary);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ErrorBoundary, [{
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
        return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
          className: "fof-cont mx-a",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
          className: "fof-title",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h1", {
          className: "error-code",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          },
          __self: this
        }, "Fuck")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("br", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
          className: "fof-desc",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        }, "An unexpected error occurred.", ' ', react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
          href: "/",
          className: "404-home",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 64
          },
          __self: this
        }, "Click here to go home"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("br", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react__WEBPACK_IMPORTED_MODULE_5__["Fragment"], null, this.state.error && this.state.error.toString())));
      }

      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (E404);


/***/ }),

/***/ "./src/common/Footer.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/common/Footer.tsx";

function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("footer", {
    className: "bg-dark d-print-none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "footer pt-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col text-center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, "FAQ"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Help & Training"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "Contact & Vendors"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, "Featured Partners"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "Integration Resource Center"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "CAM Resources"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "Utility Menu"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "pl-4 text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "PFB Catalog Maint.")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "footer pt-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col text-center pb-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, "Privacy Policy"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "pl-4 pr-4 d-inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, "|"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, "Copyright"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "pl-4 pr-4 d-inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "|"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    className: "text-light",
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, "Terms & Conditions"))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }))));
}

/***/ }),

/***/ "./src/common/FormControls/Checkbox.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/common/FormControls/Checkbox.tsx";


function Checkbox(props) {
  return props.isHidden ? null : react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: 'form-checkbox ' + (props.className || ''),
    id: 'check-' + props.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", Object.assign({}, props.attributes, {
    type: "checkbox",
    id: props.id || props.name,
    name: props.name,
    checked: props.checked,
    value: props.value,
    onChange: props.onChange,
    onDoubleClick: props.onDoubleClick,
    title: props.title,
    readOnly: props.readOnly ? 'readonly' : false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", {
    className: "ml-2",
    htmlFor: props.id || props.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, props.label));
}



/***/ }),

/***/ "./src/common/FormControls/FileUpload.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FileUpload; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/API.ts");




var _jsxFileName = "/var/www/osm/clientApp/src/common/FormControls/FileUpload.tsx";


function FileUpload(props) {
  if (!props.destination) {
    throw new Error('Must pass destination address to <FileUpload/> component.');
  } else {
    // We need to keep the file in the local state
    var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__["useState"]({}),
        _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_React$useState, 2),
        file = _React$useState2[0],
        setFile = _React$useState2[1];
    /**
     * Delete the requested file
     * @param e React click event
     */


    var handleFileDelete = function handleFileDelete(e) {
      if (e.target instanceof HTMLButtonElement) {
        var thisFileHref = e.target.getAttribute('data-href');
        var thisIndex = e.target.getAttribute('data-index');

        if (thisFileHref && thisIndex !== null) {
          _lib_API__WEBPACK_IMPORTED_MODULE_5__["default"].del(thisFileHref).then(function (res) {
            if (res.success && thisIndex !== null) {
              var allInputs = inputElements;
              allInputs.splice(parseInt(thisIndex, 10), 1);
              setInputElements(allInputs);
            }
          });
        }
      }
    };

    var FileElFactory = function FileElFactory(fileElProps) {
      return react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
        className: "card text-center",
        style: {
          width: '18rem'
        },
        "data-index": fileElProps.index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
        className: "card-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("span", {
        className: "mini-preview-thumbnail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("a", {
        target: "__blank",
        href: fileElProps.location,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, fileElProps.name), react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("button", {
        className: "btn btn-sm btn-danger mx-2",
        "data-href": fileElProps.location,
        "data-index": fileElProps.index,
        onClick: handleFileDelete,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }, "\xD7")));
    }; // Here, we automatcially upload the file to the specified directory


    var handleFileUpload = function handleFileUpload(e) {
      if (e.target instanceof HTMLInputElement && e.target.files) {
        var index = e.target.getAttribute('data-index') || '0';
        var thisFile = e.target.files[0];
        if (index) index = index.toString();
        setFile(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, file, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, index, thisFile)));
        var body = new FormData();
        body.append('file_1', thisFile); // fetch(props.destination + '?file_index=' + index, {

        fetch('/api/attachments/anonymous/' + thisFile.name + '?token=' + window.THQ.token, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // },
          body: body
        }).then(function (res) {
          if (res.ok) {
            var currEls = inputElements;
            currEls[index] = react__WEBPACK_IMPORTED_MODULE_4__["createElement"](FileElFactory, {
              location: res.headers.get('location') || '#',
              index: index,
              name: thisFile.name,
              type: thisFile.type,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 102
              },
              __self: this
            });
            setInputElements(currEls);
          }
        });
      }
    }; // If we are allowing multiple file uploads, then we need to create a new file input for each
    // file we are going to upload


    var createNewInputs = function createNewInputs() {
      if (props.addAdditional || Object.keys(file).length === 0) {
        setInputElements([].concat(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(inputElements), [react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("input", {
          type: "file",
          name: "name",
          key: Object.keys(file).length,
          "data-index": Object.keys(file).length,
          onInput: handleFileUpload,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 121
          },
          __self: this
        })]));
      }
    };

    var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__["useState"]([]),
        _React$useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_React$useState3, 2),
        inputElements = _React$useState4[0],
        setInputElements = _React$useState4[1];

    react__WEBPACK_IMPORTED_MODULE_4__["useEffect"](createNewInputs, [file]);
    return react__WEBPACK_IMPORTED_MODULE_4__["createElement"]("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146
      },
      __self: this
    }, inputElements);
  }
}

/***/ }),

/***/ "./src/common/FormControls/Reference.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SearchModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/SearchModal.tsx");

var _jsxFileName = "/var/www/osm/clientApp/src/common/FormControls/Reference.tsx";



function Reference(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__["useState"]({
    value: props.value || '',
    display: props.display || ''
  }),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      refVal = _React$useState2[0],
      setRefVal = _React$useState2[1];

  var readOnly = props.readOnly || false;

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__["useState"](false),
      _React$useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState3, 2),
      searchOpen = _React$useState4[0],
      setSearchOpen = _React$useState4[1];

  var toggleSearch = function toggleSearch(e) {
    setSearchOpen(!searchOpen);
  };
  /**
   * Sets the value of local state and propogates the change
   * to the parent via props.setReference
   * @param e Click event from reference table
   */


  var handleSelection = function handleSelection(e) {
    if (e.target instanceof HTMLAnchorElement && e.target.getAttribute('data-key')) {
      var dataKey = e.target.getAttribute('data-key') || '';
      props.setReference({
        field: props.name,
        newValue: dataKey,
        newDisplay: e.target.innerText,
        oldValue: refVal.value,
        oldDisplay: refVal.display
      });
      setRefVal({
        value: dataKey,
        display: e.target.innerText
      });
    }
  };
  /**
   * Sets the local state of the display element
   * @param e Change event from input element
   */


  var handleChange = function handleChange(e) {
    setRefVal({
      value: refVal.value,
      display: e.target.value
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: 'form-group ' + props.className,
    id: 'cont-' + props.id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", {
    type: "hidden",
    id: props.id,
    name: props.name || props.id,
    value: refVal.value,
    onChange: handleChange,
    readOnly: readOnly,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }), ' ', react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("label", {
    htmlFor: props.id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }, props.label), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "input-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", Object.assign({}, props.attributes, {
    type: "text",
    className: "form-control",
    id: props.id + '_display',
    name: props.name + '_display' || false,
    value: refVal.display,
    onChange: handleChange,
    readOnly: readOnly,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "input-group-append",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", {
    className: "btn btn-outline-secondary",
    type: "button",
    id: props.id + '_search',
    "data-toggle": "modal",
    onClick: toggleSearch,
    disabled: readOnly,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110
    },
    __self: this
  }, "Search")))), searchOpen && react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_SearchModal__WEBPACK_IMPORTED_MODULE_2__["SearchModal"], {
    title: props.references,
    table: props.references,
    handleSelectKey: handleSelection,
    onClose: toggleSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124
    },
    __self: this
  }));
}



/***/ }),

/***/ "./src/common/FormControls/Select.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectField", function() { return SelectField; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);





var _jsxFileName = "/var/www/osm/clientApp/src/common/FormControls/Select.tsx";



var SelectField =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SelectField, _Component);

  function SelectField(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SelectField);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(SelectField).call(this, props));
    _this.state = {
      otherField: false,
      selectId: props.id
    };
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SelectField, [{
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
            options.push(react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("option", {
              value: opt,
              key: Math.floor(Math.random() * 1000000),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 46
              },
              __self: this
            }, opt));
          } else {
            options.push(react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("option", {
              value: opt.value,
              key: Math.floor(Math.random() * 1000000),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 52
              },
              __self: this
            }, opt.text));
          }
        });
      }

      if (this.props.otherField) {
        options.push(react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("option", {
          value: "otherSelection",
          key: Math.floor(Math.random() * 1000000),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        }, "Other"));
      }

      return !this.props.isHidden && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: 'form-group ' + this.props.className,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("label", {
        htmlFor: this.props.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, this.props.label), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("select", {
        className: "form-control",
        name: this.props.id,
        id: this.props.selectId,
        onChange: function onChange(e) {
          _this2.handleOnChange(e);

          _this2.props.onChange(e);
        },
        value: this.state.otherField ? 'otherSelection' : this.props.value,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, options), this.state.otherField && react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("input", {
        id: this.state.id,
        type: "text",
        className: "form-control mt-3",
        onChange: this.props.onChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }));
    }
  }]);

  return SelectField;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ }),

/***/ "./src/common/FormControls/TextField.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/common/FormControls/TextField.tsx";


function Field(props) {
  var handleChange = function handleChange(e) {
    var id = e.target.name || e.target.id;
    var val = {};
    val[id] = e.target.value;

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return !props.isHidden ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: 'form-group ' + props.className || false,
    id: 'cont-' + props.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", {
    htmlFor: props.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, props.label), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", Object.assign({}, props.attributes, {
    type: props.type,
    className: "form-control",
    id: props.name,
    name: props.name,
    value: props.value || '',
    onChange: handleChange,
    maxLength: props.maxLength,
    readonly: props.readOnly ? 'readonly' : false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }))) : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
}



/***/ }),

/***/ "./src/common/FormControls/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/common/FormControls/Checkbox.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Checkbox", function() { return _Checkbox__WEBPACK_IMPORTED_MODULE_0__["Checkbox"]; });

/* harmony import */ var _TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/FormControls/TextField.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _TextField__WEBPACK_IMPORTED_MODULE_1__["Field"]; });

/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/FormControls/Reference.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]; });

/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/FormControls/Select.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectField", function() { return _Select__WEBPACK_IMPORTED_MODULE_3__["SelectField"]; });







/***/ }),

/***/ "./src/common/ListView.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableList", function() { return TableList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Table_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/Table/Table.tsx");
var _jsxFileName = "/var/www/osm/clientApp/src/common/ListView.tsx";


function TableList(props) {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "mt-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Table_Table__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    table: props.match.params.table,
    showSearch: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }));
}

/***/ }),

/***/ "./src/common/Loading.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/common/Loading.tsx";

function Loading() {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "spinner-border",
    role: "status",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
    className: "sr-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, "Loading..."));
}

/***/ }),

/***/ "./src/common/Monaco.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Monaco", function() { return Monaco; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/API.ts");

var _jsxFileName = "/var/www/osm/clientApp/src/common/Monaco.tsx";
// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
// import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js'
// import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js'
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
// import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js'
// import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js'
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
// import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js'
// import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js'
// import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js'
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
// const monaco = React.lazy(() => import('./Monaco'))
// import 'monaco-editor/esm/vs/editor/editor.worker'
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.worker'
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'



function Monaco(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(window.monaco ? true : false),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      scriptReady = _useState2[0],
      setScriptReady = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useLayoutEffect"])(function () {
    window.require = {
      paths: {
        vs: '/public/scripts/bundles/min/vs'
      }
    };
    var scripts = ['/public/scripts/bundles/min/vs/loader.js', '/public/scripts/bundles/min/vs/editor/editor.main.nls.js', '/public/scripts/bundles/min/vs/editor/editor.main.js' // '/public/scripts/bundles/min/vs/basic-languages/javascript/javascript.js'
    // '/public/scripts/bundles/ts.worker.js'
    ];

    if (!scriptReady) {
      scripts.forEach(function (scriptSrc) {
        if (document.querySelector('script[src="' + scriptSrc + '"]')) {
          return true;
        }

        var scriptTag = document.createElement('script');
        scriptTag.addEventListener('load', function (e) {
          setTimeout(function () {
            setScriptReady(window.monaco && window.monaco.editor ? true : false);
          }, 1000);
        });
        scriptTag.src = scriptSrc;
        return document.head.appendChild(scriptTag);
      });
      return;
    } // self.MonacoEnvironment = {
    //   getWorkerUrl: (moduleId, label) => {
    //     return '/public/scripts/bundles/ts.worker.js'
    //   }
    // }


    window.monaco.editor.create(document.getElementById('monaco'), {
      value: props.value,
      language: props.language || 'javascript',
      theme: 'vs-dark'
    });

    if (props.libs) {
      if (!Array.isArray(props.libs)) {
        props.libs = [props.libs];
      }

      props.libs.forEach(function (libPath) {
        _lib_API__WEBPACK_IMPORTED_MODULE_2__["default"].get({
          path: libPath
        }).then(function (data) {
          data.data.forEach(function (lib) {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(lib.filePath, lib.contents);
          });
        }).catch(function (err) {
          console.error(err);
        });
      });
    }

    return function () {
      window.monaco.editor && window.monaco.editor.getModels ? window.monaco.editor.getModels()[0].dispose() : console.log('Monaco not found');
    };
  }, [scriptReady]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!scriptReady) return;
    window.monaco.editor.getModels()[0].setValue(props.value);
  }, [props.value]);
  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    id: "monaco",
    style: {
      width: '100%',
      height: '600px',
      background: 'solid #1e1e1e' // border: '1px solid #ccc'

    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    },
    __self: this
  }));
}

/***/ }),

/***/ "./src/common/PillLayout.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pills; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Alerts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/common/Alerts.tsx");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/ContextMenu.tsx");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/util.ts");



var _jsxFileName = "/var/www/osm/clientApp/src/common/PillLayout.tsx";

 // import $ from 'jquery'




function InlineModifier(props) {
  // const handleOkay = (e) => {}
  return true;
}

function Pills(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3__["useState"]([react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null)]),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_React$useState, 2),
      pillAs = _React$useState2[0],
      setPillAs = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_3__["useState"]([react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null)]),
      _React$useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_React$useState3, 2),
      pillBodies = _React$useState4[0],
      setPillBodies = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_3__["useState"]({
    errors: [],
    info: [],
    warnings: []
  }),
      _React$useState6 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_React$useState5, 2),
      messages = _React$useState6[0],
      setMessages = _React$useState6[1];

  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_3__["useState"]({
    show: false,
    location: {
      x: 0,
      y: 0
    }
  }),
      _React$useState8 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_React$useState7, 2),
      showContext = _React$useState8[0],
      setContextShown = _React$useState8[1];

  var handleRename = function handleRename(e) {
    setContextShown({
      show: false
    });
    console.log(showContext.originalTarget);
  };

  var handleAuxClick = function handleAuxClick(e) {
    console.log('Right clicked');
    console.log(e);
    e.preventDefault();
    setContextShown({
      show: true,
      location: {
        x: e.pageX,
        y: e.pageY
      },
      originalTarget: e.target
    });
  };

  var handleDblClick = function handleDblClick(e) {
    console.log('Double clicked');

    if (e.target instanceof HTMLElement) {
      e.target.innerHTML = "<div>".concat(e.target.innerText, "</div>");
    } // $(document).on('click', handleOutsideClick)

  };

  var handleOutsideClick = function handleOutsideClick(e) {
    console.log('Clicked on something else');
  };

  var handlePillBodies = function handlePillBodies() {
    var pills = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props.pills);

    var newPillAs = [];
    var newPillBodies = [];
    Object.keys(pills).forEach(function (pill, key) {
      if (typeof pills[pill] !== 'object') {
        return null;
      }

      if (key === 0) {
        // First pill is active by default
        newPillAs.push(react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("a", {
          onDoubleClick: handleDblClick,
          className: "nav-link active",
          id: pills[pill].id + '-tab',
          "data-toggle": "pill",
          href: '#' + pills[pill].id,
          role: "tab",
          "aria-controls": pills[pill].id,
          "aria-selected": "true",
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        }, pills[pill].label));
        newPillBodies.push(react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "tab-pane fade show active",
          id: pills[pill].id,
          role: "tabpanel",
          "aria-labelledby": pills[pill].id + '-tab',
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "row",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 119
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col-lg-10 col-md-11 col-sm-12 pt-4",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 121
          },
          __self: this
        }, pills[pill].body), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }))));
      } else {
        newPillAs.push(react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("a", {
          onDoubleClick: handleDblClick,
          className: "nav-link",
          id: pills[pill].id + '-tab',
          "data-toggle": "pill",
          href: '#' + pills[pill].id,
          role: "tab",
          "aria-controls": pills[pill].id,
          "aria-selected": "false",
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 130
          },
          __self: this
        }, pills[pill].label));
        newPillBodies.push(react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "tab-pane fade",
          id: pills[pill].id,
          role: "tabpanel",
          "aria-labelledby": pills[pill].id + '-tab',
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 145
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "row",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 152
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 153
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col-lg-10 col-md-11 col-sm-12 pt-4",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          },
          __self: this
        }, pills[pill].body), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
          className: "col",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 157
          },
          __self: this
        }))));
      }
    });
    setPillAs(newPillAs);
    setPillBodies(newPillBodies);
  };

  var contextOptions = [{
    text: 'Rename',
    action: handleRename
  }];
  /**
   * Provide a simple, reusable interface to trigger error alerts
   * across all components that utilize the bill layout
   * @param {Error} err Error message or raw error
   */

  var handleErrorMessage = function handleErrorMessage(err) {
    setMessages({
      errors: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(messages.errors).concat([{
        message: err.toString()
      }])
    });
  };
  /**
   * Provide a simple, reusable interface to trigger alerts in the pill layout.
   * @param {string} message Alert to be displayed as a blue info message
   */


  var handleStatusMessage = function handleStatusMessage(message) {
    setMessages({
      info: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(messages.info).concat([{
        message: message.toString()
      }])
    });
  };

  react__WEBPACK_IMPORTED_MODULE_3__["useEffect"](handlePillBodies, [props.pills]);
  return react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "container-fluid",
    style: {
      minHeight: '80vh'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "row mt-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "col-md-3 col-sm-12 d-print-none",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "nav flex-column nav-pills",
    id: "v-pills",
    role: "tablist",
    "aria-orientation": "vertical",
    onContextMenu: handleAuxClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206
    },
    __self: this
  }, pillAs)), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "col mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("div", {
    className: "tab-content",
    id: "v-pill-tabContent",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217
    },
    __self: this
  }, messages.errors && messages.errors.map(function (errorsmessage) {
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_Alerts__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
      alertType: "info",
      message: errorsmessage.message,
      key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221
      },
      __self: this
    });
  }), messages.info && messages.info.map(function (infomessage) {
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_Alerts__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
      alertType: "info",
      message: infomessage.message,
      key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231
      },
      __self: this
    });
  }), pillBodies))), showContext.show && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_ContextMenu__WEBPACK_IMPORTED_MODULE_5__["ContextMenu"], Object.assign({}, showContext, {
    options: contextOptions,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243
    },
    __self: this
  })));
}

/***/ }),

/***/ "./src/common/SearchModal.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchModal", function() { return SearchModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/Table/index.tsx");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/util.ts");
var _jsxFileName = "/var/www/osm/clientApp/src/common/SearchModal.tsx";


 // import * as $ from 'jquery'
// Importing bootstrap here... causes issues...
// import 'bootstrap'

function SearchModal(props) {
  var id = props.id + '_search_modal' || false;

  var handleClick = function handleClick(e) {
    e.preventDefault(); // @ts-ignore

    jQuery("#".concat(id)).modal('hide');
    props.handleSelectKey(e);
  };

  react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
    /*
      Show the modal after it is rendered
    */
    // @ts-ignore
    jQuery("#".concat(id)).modal('show');
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "modal modal-xl fade",
    tabIndex: -1,
    role: "dialog",
    id: id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "modal-dialog",
    role: "document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "modal-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "modal-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h5", {
    className: "modal-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, props.title || 'Search'), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
    type: "button",
    id: id + '_search_modal_close',
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "close",
    onClick: props.onClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "modal-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Table__WEBPACK_IMPORTED_MODULE_1__["Table"], {
    table: props.table + '_list',
    selectReference: handleClick,
    hideActions: true,
    showSearch: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }))))))));
}

/***/ }),

/***/ "./src/common/Table/Table.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _TableRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/common/Table/TableRow.tsx");
/* harmony import */ var _TableSearch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/common/Table/TableSearch.tsx");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/lib/util.ts");
/* harmony import */ var _Alerts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/common/Alerts.tsx");







var _jsxFileName = "/var/www/osm/clientApp/src/common/Table/Table.tsx";








/**
 * Show a list view from a table prop
 */
var Table =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Table, _Component);

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
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Table);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Table).call(this, props));
    var flatArgs = '';

    if (props.args) {
      Object.keys(props.args).map(function (arg) {
        // @ts-ignore
        flatArgs += "".concat(arg, "=").concat(props.args[arg]);
      });
    }

    _this.state = {
      args: flatArgs,
      allCols: {},
      cols: props.cols,
      errors: [],
      field: {
        limit: props.limit || 25
      },
      count: 0,
      from: 0,
      handleClick: props.onClick,
      hideActions: props.hideActions || false,
      nextOffset: 25,
      loaded: props.cols && props.rows ? false : true,
      offset: 0,
      order: {},
      permissions: {
        edit: false,
        // Set edit to false by default
        create: false,
        // Set create to false by default
        read: true,
        // Set read to true by default
        delete: false // Set delete to false by default

      },
      rows: props.rows || [],
      searchOn: '',
      search: '',
      shownColumns: [],
      table: props.table,
      warnings: []
    };
    if (!props.cols && !props.rows && props.table) _this.getCols(); // Retrieve the column information from /api/q/describe
    else if (props.cols && !props.rows && props.table) _this.getCols();
    return _this;
  }
  /**
   * Fetches data from API if no rows prop is defined or pagination
   * is activated.
   * @param param0 Arguments and offset info
   */


  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Table, [{
    key: "getData",
    value: function getData(_ref) {
      var _this2 = this;

      var _ref$args = _ref.args,
          args = _ref$args === void 0 ? this.state.args : _ref$args,
          offset = _ref.offset;
      _lib_API__WEBPACK_IMPORTED_MODULE_8__["default"].get({
        path: '/api/q/' + this.state.table,
        query: {
          args: args,
          limit: this.state.field.limit,
          offset: 0,
          fields: Object.keys(this.state.cols).join(',')
        }
      }).then(function (response) {
        /*
          Display warnings in alert container
        */
        var warnings = [];

        if (response.warnings.length > 0) {
          warnings.push.apply(warnings, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(response.warnings));
        }

        if (response && response.data && response.data[_this2.state.table] && response.meta) {
          /*
            Check for metadata on response, if found we will set
            the pagination state fields.
          */
          _this2.setState({
            args: args,
            rows: response.data[_this2.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to,
            warnings: warnings
          });
        } else if (response && response.data && response.data[_this2.state.table]) {
          /*
            This shouldn't ever happen, but if for some reason
            we don't get any metadata then just set the data
          */
          _this2.setState({
            args: args,
            rows: response.data[_this2.state.table],
            loaded: true,
            count: response.data[_this2.state.table].length,
            warnings: warnings
          });
        } else {
          /*
            When we don't receive any data then there was an issue with the request
          */
          _this2.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this2.state, {
            errors: [{
              error: true,
              message: 'No data received'
            }],
            warnings: warnings
          }));
        }
      }).catch(function (err) {
        _this2.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this2.state, {
          errors: [{
            error: true,
            message: err
          }],
          loaded: true
        }));
      });
    }
    /**
     * Submits query to the server based on phrase in search box and
     * column selected from dropdown in <TableSearch />
     * @param column Database column name to query
     * @param query Query phrase
     */

  }, {
    key: "handleSearchKeyDown",
    value: function handleSearchKeyDown(column, query) {
      var operator = 'lk';

      if (query.startsWith('"') && query.endsWith('"')) {
        /*
          Perform a literal search instead of wildcard
        */
        operator = 'eq';
        query = query.slice(1, -1);
      }

      var args = "".concat(column, "=").concat(operator, "|").concat(query);
      this.getData({
        args: args
      });
    } //   private handleHeaderClick(e) {} // Eventually sort by column

    /**
     * Get column data and default fields to display.
     * Eventually will also fetch user preferences.
     */

  }, {
    key: "getCols",
    value: function getCols() {
      var _this3 = this;

      var stateToBe = {};
      _lib_API__WEBPACK_IMPORTED_MODULE_8__["default"].get({
        path: "/api/describe/".concat(this.state.table)
      }).then(function (response) {
        if (response.columns) {
          var allowedCols = {};

          var fields = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this3.state.field);

          var displayedColumns = response.userPreferences || response.defaultFields;
          /**
           * Loop through each column in the response.
           */

          Object.keys(response.columns).forEach(function (col) {
            var colObj = response.columns[col];

            if (
            /*
              First we check to see if the column is included
              in the list of displayed fields. If so then we will
              add it to the list of displayed columns.
            */
            displayedColumns && displayedColumns.indexOf(col) > -1 ||
            /*
              Then we check if the column was passed as a prop.
            */
            Array.isArray(_this3.props.cols) && _this3.props.cols.indexOf(col) > -1 ||
            /*
              Lastly check for the primary key,
              if we are working with the primary key
              then we need to add it to the list of allowed
              columns. If we don't then a lot of shit will break.
            */
            response.primaryKey === col) {
              allowedCols[col] = colObj;
            }
          });
          /*
            I wish I knew what was happening here
           */

          allowedCols[response.displayField].display = _this3.state.table.slice(0, -5);
          stateToBe = {
            cols: allowedCols,
            id: response.primaryKey,
            field: fields,
            allCols: response.columns,
            permissions: response.permissions
          };
        } else {
          var fallbackError = {
            error: true,
            message: 'Failed for some reason, but no error was in the response'
          };

          _this3.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this3.state, {
            errors: response.errors || fallbackError,
            loaded: true
          }));
        }
        /*
          After we figure out what columns to show and whatnot,
          we need to actually get some data.
         
          Eventually these two requests can be combined into one,
          but for now this works exceptionally well.
        */


        return _lib_API__WEBPACK_IMPORTED_MODULE_8__["default"].get({
          path: '/api/q/' + _this3.state.table,
          query: {
            args: _this3.state.args,
            limit: _this3.state.field.limit,
            fields: Object.keys(stateToBe.cols).join(',')
          }
        });
      }).then(function (response) {
        if (response && response.data && response.data[_this3.state.table] && response.meta) {
          _this3.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, stateToBe, {
            rows: response.data[_this3.state.table],
            loaded: true,
            count: response.meta.count,
            offset: response.meta.to,
            from: response.meta.from,
            nextOffset: response.meta.to
          }));
        } else if (response && response.data && response.data[_this3.state.table]) {
          _this3.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, stateToBe, {
            rows: response.data[_this3.state.table],
            loaded: true,
            count: response.data[_this3.state.table].length
          }));
        } else _this3.setState({
          errors: [{
            message: 'No data received',
            error: true
          }],
          loaded: true
        });
      }).catch(function (err) {
        console.error(err);

        _this3.setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this3.state, {
          errors: [{
            message: err,
            error: true
          }],
          loaded: true
        }));
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var field = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state.field);

        field[e.target.id] = e.target.value;
        this.setState({
          field: field
        });
      }
    }
    /**
     * Set the number of rows retrieved
     * @param e Change event from results/page select
     */

  }, {
    key: "handleSetCount",
    value: function handleSetCount(e) {
      if (e.target instanceof HTMLInputElement) {
        var rows = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(this.state.rows);

        var field = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state.field);

        field.limit = parseInt(e.target.value, 10);

        if (field.limit < this.state.field.limit) {
          rows = rows.slice(0, field.limit);
          this.setState({
            field: field,
            rows: rows
          });
        } else {
          this.setState({
            field: field
          });
          this.getData({});
        }
      }
    }
    /**
     * Updates a specific row in a table
     * @param id sys_id of row to be updated
     * @param col Which column is being updated
     * @param val What the new value is
     */

  }, {
    key: "updateRowById",
    value: function updateRowById(id, col, val) {
      if (Array.isArray(this.state.rows) && id) {
        var updated = false;
        var count = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.state.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;
            var thisId = row[id].id;

            if (thisId === id) {
              if (col in row) {
                var futureRows = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(this.state.rows);

                futureRows[count][col] = val;
                futureRows.splice(count, 1, row);
                this.setState({
                  rows: futureRows
                });
                updated = true;
                break;
              }
            }

            count++;
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

        return updated;
      } else {
        // If we don't have any data or id is undefined,
        // return false to indicate no update was made.
        return false;
      }
    }
    /**
     * Allows records in a table to be updated inline with the table.
     * @param e Change event
     * @expiramental
     */

  }, {
    key: "handleInlineUpdate",
    value: function handleInlineUpdate(e) {
      var _this4 = this;

      if (e.target instanceof HTMLInputElement) {
        var updateId = e.target.value;
        var key = e.target.name;
        var checked = e.target.checked;
        var body = {};
        body[key] = checked;
        new _lib_API__WEBPACK_IMPORTED_MODULE_8__["TowelRecord"](this.state.table).update(updateId, body).then(function (res) {
          if (res && res.status === 204) {
            console.log('Updated');
          }

          _this4.updateRowById(updateId, key, checked);
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
    /**
     * Fetches data from:
     *  - The next page
     *  - The previous page
     *  - The first page
     *  - The last page
     * Based on the `data-page` attribute present on the button.
     * @param e Click event from pagination arrows
     */

  }, {
    key: "handlePage",
    value: function handlePage(e) {
      var _this5 = this;

      e.preventDefault();

      if (e.target instanceof HTMLElement) {
        var dir = e.target.getAttribute('data-page') || '1'; // const dir = parseInt(val, 10) // Get the pagination value from the element

        var nextOffset = 0;

        if (dir === '-2') {
          // First page
          nextOffset = 0;
        } else if (dir === '-1') {
          // Previous page
          nextOffset = this.state.from - this.state.field.limit;
        } else if (dir === '2') {
          // Last page
          nextOffset = this.state.count - this.state.field.limit;
        } else {
          // Next page
          nextOffset = this.state.from + this.state.field.limit;
        }

        _lib_API__WEBPACK_IMPORTED_MODULE_8__["default"].get({
          path: '/api/q/' + this.state.table,
          query: {
            args: this.state.args,
            // Information from search
            offset: nextOffset,
            // Skip over what's on the page now
            limit: this.state.field.limit,
            // How many to fetch
            fields: Object.keys(this.state.cols).join(',') // Get only what we need

          }
        }).then(function (response) {
          if (response && response.data && response.data[_this5.state.table] && response.meta.count) {
            _this5.setState({
              rows: response.data[_this5.state.table],
              loaded: true,
              count: response.meta.count,
              offset: response.meta.to,
              from: response.meta.from,
              nextOffset: response.meta.to
            });
          } else if (response && response.data && response.data[_this5.state.table]) {
            _this5.setState({
              rows: response.data[_this5.state.table],
              loaded: true,
              count: response.data[_this5.state.table].length
            });
          } else _this5.setState({
            errors: [{
              message: 'No data received',
              error: true
            }]
          });
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
    /**
     * Listen for changes to the table and arguments on route change.
     * @param prevProps
     * @param prevState
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this6 = this;

      if (prevProps.table !== this.props.table) {
        console.log('Received new table');
        this.setState({
          table: this.props.table
        }, function () {
          _this6.getCols();
        });
      } else {
        console.log("Table ".concat(prevProps.table, " is the same as ").concat(this.props.table));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var headers = [];
      var nextPage = this.state.nextOffset >= this.state.count ? {
        disabled: true
      } : false;
      var prevPage = this.state.offset - this.state.field.limit <= 0 ? {
        disabled: true
      } : false;

      if (!this.state.hideActions) {
        headers.push(react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("th", {
          scope: "col",
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_11__["generateKeyHash"])(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 559
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("input", {
          className: "position-static",
          type: "checkbox",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 560
          },
          __self: this
        })));
      }

      if (this.state.cols) {
        for (var col in this.state.cols) {
          if (col === this.state.id && this.state.id !== this.state.displayField) {
            continue;
          }

          headers.push(react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("th", {
            scope: "col",
            "data-bind": col,
            key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_11__["generateKeyHash"])(),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 573
            },
            __self: this
          }, this.state.cols[col].label));
        }
      }

      var rows = [];

      if (this.state.rows && this.state.rows.length > 0) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.state.rows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var row = _step2.value;
            rows.push(react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_TableRow__WEBPACK_IMPORTED_MODULE_9__["TableRow"], {
              key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_11__["generateKeyHash"])(),
              showSelect: !this.state.hideActions,
              cells: row,
              cols: this.state.cols,
              id: this.state.id || 'sys_id',
              onSelectKey: this.props.selectReference,
              handleInlineUpdate: this.handleInlineUpdate.bind(this),
              permissions: this.state.permissions,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 584
              },
              __self: this
            }));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_7__["createElement"](react__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_7__["createElement"](react__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, this.props.showSearch && this.state.cols && react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_TableSearch__WEBPACK_IMPORTED_MODULE_10__["TableSearch"], {
        onSearchKeyDown: this.handleSearchKeyDown.bind(this),
        onSetCount: this.handleSetCount.bind(this),
        permissions: this.state.permissions,
        cols: this.state.cols,
        table: this.state.table,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 603
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 611
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 612
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col-10",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 613
        },
        __self: this
      }, this.state.errors.map(function (err) {
        return react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_Alerts__WEBPACK_IMPORTED_MODULE_12__["Alert"], {
          alertType: "danger",
          message: err.message,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 615
          },
          __self: this
        });
      }), this.state.warnings.map(function (warning) {
        return react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_Alerts__WEBPACK_IMPORTED_MODULE_12__["Alert"], {
          message: warning.message,
          alertType: "warning",
          dismissable: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 619
          },
          __self: this
        });
      })), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 627
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 629
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 630
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "table-responsive",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 631
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("table", {
        className: "table table-striped table-hover table-sm",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 632
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("thead", {
        className: "thead-dark",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 633
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 634
        },
        __self: this
      }, headers)), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 636
        },
        __self: this
      }, rows.length === 0 && this.state.loaded && react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 638
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("td", {
        colSpan: headers.length,
        style: {
          textAlign: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 639
        },
        __self: this
      }, "No Results Found")), rows.length > 0 && rows))))), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 654
        },
        __self: this
      }, !this.state.hideActions && react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col mx-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 656
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("select", {
        className: "form-control",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 657
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("option", {
        value: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 658
        },
        __self: this
      }, "Action on selected rows"), this.props.actions !== undefined && this.props.actions)), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 663
        },
        __self: this
      }), !this.props.hidePagination && react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", {
        className: "col-lg-6 col-md-10 col-sm-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 665
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("button", Object.assign({}, prevPage, {
        className: 'btn btn-secondary m-1',
        "data-page": "-2",
        onClick: this.handlePage.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 666
        },
        __self: this
      }), "\xAB"), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("button", Object.assign({}, prevPage, {
        className: 'btn btn-secondary m-1',
        "data-page": "-1",
        onClick: this.handlePage.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 674
        },
        __self: this
      }), "\u2039"), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("span", {
        className: "mx-1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 682
        },
        __self: this
      }, this.state.from + ' - ' + this.state.nextOffset + ' of ' + this.state.count), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("button", Object.assign({}, nextPage, {
        className: 'btn btn-secondary m-1',
        "data-page": "1",
        onClick: this.handlePage.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 689
        },
        __self: this
      }), "\u203A"), react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("button", Object.assign({}, nextPage, {
        className: 'btn btn-secondary m-1',
        "data-page": "2",
        onClick: this.handlePage.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 697
        },
        __self: this
      }), "\xBB")))));
    }
  }]);

  return Table;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/***/ }),

/***/ "./src/common/Table/TableRow.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableRow", function() { return TableRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _FormControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/FormControls/index.tsx");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/util.ts");
var _jsxFileName = "/var/www/osm/clientApp/src/common/Table/TableRow.tsx";




function TableRow(props) {
  function handleValReturn(e) {
    e.preventDefault();
  }

  var cells = [];

  if (props.showSelect) {
    cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
      key: Math.floor(Math.random() * 10000),
      className: "align-middle",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", {
      className: "position-static",
      type: "checkbox",
      value: props.cells && props.cells[props.id],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    })));
  }

  Object.keys(props.cols).map(function (col) {
    if (col === props.id) return false;
    var thisCol = props.cols[col];
    var val = props.cells[col];
    var type = thisCol.type;

    if (thisCol.reference || thisCol.display) {
      if (props.onSelectKey && thisCol.display) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "data-table-text-cell",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          href: "#",
          "data-key": props.cells[props.id],
          onClick: props.onSelectKey,
          className: "align-middle",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        }, val || ''))));
      } else if (props.onSelectKey && thisCol.reference) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          className: "align-middle",
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }, val || ''));
      } else if (thisCol.display) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 63
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "data-table-text-cell",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 64
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          to: "/f/".concat(thisCol.display, "/").concat(props.cells[props.id] || '#'),
          className: "align-middle",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 65
          },
          __self: this
        }, val || ''))));
      } else {
        var refCol = props.cols[col];
        var refTable = refCol ? refCol.refTable : '#';
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 78
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "data-table-text-cell",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
          to: "/f/".concat(refTable, "/").concat(val || '#'),
          title: props.cols[col].label,
          className: "align-middle",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        }, props.cells[col + '_display'] || ''))));
      }
    } else if (type && type.toLowerCase() === 'date') {
      cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
        className: "align-middle",
        tabIndex: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "data-table-text-cell",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, new Date(val).toDateString() || '')));
    } else if (type && type.toLowerCase() === 'boolean') {
      if (props.permissions && props.permissions.edit) {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          style: {
            textAlign: 'center'
          },
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormControls__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
          id: col + props.cells[props.id],
          name: col,
          value: props.cells[props.id],
          onChange: props.handleInlineUpdate,
          title: props.cols[col].label,
          label: "",
          checked: val === true || val === 1,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: this
        })));
      } else {
        cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
          style: {
            textAlign: 'center'
          },
          className: "align-middle",
          tabIndex: 0,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "data-table-text-cell",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          },
          __self: this
        }, val === true || val === 1 && '×' || '')));
      }
    } else {
      cells.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_3__["generateKeyHash"])(),
        className: "align-middle",
        tabIndex: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "data-table-text-cell",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, val ? val.toString() : '')));
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142
    },
    __self: this
  }, cells);
}

/***/ }),

/***/ "./src/common/Table/TableSearch.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableSearch", function() { return TableSearch; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Can__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/common/Can.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/util.ts");






var _jsxFileName = "/var/www/osm/clientApp/src/common/Table/TableSearch.tsx";





var TableSearch =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(TableSearch, _Component);

  function TableSearch(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, TableSearch);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(TableSearch).call(this, props));
    var fieldSearchSelections = [];
    var initialValue;

    if (typeof props.cols === 'object') {
      initialValue = Object.keys(props.cols)[0];
    } else {
      initialValue = '';
    }

    _this.state = {
      limit: props.limit || 25,
      table: props.table,
      searchQ: '',
      col: initialValue
    };
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(TableSearch, [{
    key: "handleChange",
    value: function handleChange(e) {
      var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state);

      state[e.target.id] = e.target.value;
      this.setState(state);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.keyCode && e.keyCode === 13) {
        this.props.onSearchKeyDown(this.state.col, this.state.searchQ);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "form-group mr-a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "input-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "input-group-prepend",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
        className: "custom-select",
        onChange: this.handleChange.bind(this),
        value: this.state.col,
        id: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, Object.keys(this.props.cols).map(function (column) {
        var colObj = _this2.props.cols[column];
        var searchColVal = column;

        if (colObj.type === 'string') {
          if (colObj.reference) searchColVal += '_display';
          return react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_9__["generateKeyHash"])(),
            value: searchColVal,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            },
            __self: this
          }, colObj.label);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("input", {
        id: "searchQ",
        className: "form-control",
        onChange: this.handleChange.bind(this),
        value: this.state.searchQ,
        onKeyDown: this.handleKeyDown.bind(this),
        type: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "form-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "input-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
        className: "custom-select",
        onChange: this.props.onSetCount,
        value: this.state.limit,
        id: "limit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 15,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }, "15"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 25,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, "25"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 35,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, "35"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 50,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, "50"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 75,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, "75"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
        value: 100,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, "100")), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "input-group-append",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
        className: "input-group-text",
        htmlFor: "limit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, "Results / Page"))))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_Can__WEBPACK_IMPORTED_MODULE_7__["Can"], {
        if: this.props.permissions && this.props.permissions.create,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
        className: "col-1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
        className: "btn btn-primary",
        to: "/f/".concat(this.props.table.slice(0, -5), "/new"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, "New"))));
    }
  }]);

  return TableSearch;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/***/ }),

/***/ "./src/common/Table/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/common/Table/Table.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["Table"]; });


/* harmony default export */ __webpack_exports__["default"] = (_Table__WEBPACK_IMPORTED_MODULE_0__["Table"]);


/***/ }),

/***/ "./src/customComponents/FileExplorer/FileExplorerActions.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileExplorerActions", function() { return FileExplorerActions; });
var _jsxFileName = "/var/www/osm/clientApp/src/customComponents/FileExplorer/FileExplorerActions.tsx";
function FileExplorerActions(props) {
  return React.createElement("div", {
    className: "file-explorer-action-toolbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, React.createElement("ul", {
    className: "file-explorer-actions-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, React.createElement("li", {
    role: "presentation",
    className: "toolbar-action-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, React.createElement("a", {
    className: "explorer-action-button toolbar-icon-new-file",
    role: "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  })), React.createElement("li", {
    role: "presentation",
    className: "toolbar-action-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, React.createElement("a", {
    className: "explorer-action-button toolbar-icon-new-folder",
    role: "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  })), React.createElement("li", {
    role: "presentation",
    className: "toolbar-action-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, React.createElement("a", {
    className: "explorer-action-button toolbar-icon-refresh",
    role: "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }))));
}

/***/ }),

/***/ "./src/customComponents/FileExplorer/FileExplorerContainer.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileExplorerContainer", function() { return FileExplorerContainer; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _FileExplorerActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/customComponents/FileExplorer/FileExplorerActions.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FileExplorerFolder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/customComponents/FileExplorer/FileExplorerFolder.tsx");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/API.ts");

var _jsxFileName = "/var/www/osm/clientApp/src/customComponents/FileExplorer/FileExplorerContainer.tsx";




function FileExplorerContainer(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      fileStructure = _useState2[0],
      setFileStructure = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([-1]),
      _useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      activeIndex = _useState4[0],
      setActiveIndex = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      _useState6 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      allFileFolders = _useState6[0],
      setAllFileFolders = _useState6[1];

  var getActiveIndex = function getActiveIndex() {
    return activeIndex;
  };

  var InitialFolderLoader = function InitialFolderLoader(initProps) {
    return React.createElement(_FileExplorerFolder__WEBPACK_IMPORTED_MODULE_3__["FileExplorerFolder"], {
      folderName: "root" // @ts-ignore
      ,
      folders: fileStructure.folders // @ts-ignore
      ,
      files: fileStructure.files,
      depth: 0,
      activeIndex: initProps.activeIndex,
      setActiveIndex: initProps.setActiveIndex,
      index: 0,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      },
      __self: this
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (fileStructure !== undefined) {
      setAllFileFolders([React.createElement(InitialFolderLoader, {
        activeIndex: getActiveIndex,
        setActiveIndex: setActiveIndex,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      })]);
    }
  }, [fileStructure]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    _lib_API__WEBPACK_IMPORTED_MODULE_4__["default"].get({
      path: props.fileStructureLocation
    }).then(function (details) {
      if (details.success) {
        setFileStructure(details.data);
      }
    }).catch(alert);
  }, [props.fileStructureLocation]);
  return React.createElement("div", {
    className: "file-explorer-container pl-1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, React.createElement(_FileExplorerActions__WEBPACK_IMPORTED_MODULE_1__["FileExplorerActions"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }), fileStructure && allFileFolders);
}

/***/ }),

/***/ "./src/customComponents/FileExplorer/FileExplorerFile.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileExplorerFile", function() { return FileExplorerFile; });
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/API.ts");
var _jsxFileName = "/var/www/osm/clientApp/src/customComponents/FileExplorer/FileExplorerFile.tsx";


/**
 * Renders a file in the list
 * @param props Object containing descriptions for component
 */
function FileExplorerFile(props) {
  var setFileContents = function setFileContents(e) {
    _lib_API__WEBPACK_IMPORTED_MODULE_0__["default"].get({
      path: props.fileUri
    }).then(function (file) {
      monaco.editor.getModels()[0].setValue(file.data.contents);
      monaco.editor.setModelLanguage(monaco.editor.getModels()[0], 'typescript');
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve
      });
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        typeRoots: ['server/node_modules/@types', 'client/node_modules/@types']
      });
    }).catch(alert);
  };

  return React.createElement("div", {
    className: "file-explorer-row",
    onClick: setFileContents,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, React.createElement("div", {
    className: "file-explorer-file file-explorer-row-contents",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, React.createElement("span", {
    className: "file-explorer-name file-explorer-icon file-explorer-icon-file",
    style: {
      margin: '0 0 0 ' + ((props.depth || 2) * 8).toString() + 'px',
      backgroundColor: props.activeIndex().includes(props.index) ? 'green' : ''
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, React.createElement("span", {
    className: "file-explorer-label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, props.fileName))));
}

/***/ }),

/***/ "./src/customComponents/FileExplorer/FileExplorerFolder.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileExplorerFolder", function() { return FileExplorerFolder; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _FileExplorerFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/customComponents/FileExplorer/FileExplorerFile.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);


var _jsxFileName = "/var/www/osm/clientApp/src/customComponents/FileExplorer/FileExplorerFolder.tsx";


function FileExplorerFolder(props) {
  var allItems = [];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var toggleCollapsed = function toggleCollapsed(e) {
    setIsOpen(!isOpen);
  };

  if (props.folders) {
    var allFolders = props.folders.map(function (folder, i) {
      return React.createElement(FileExplorerFolder, {
        folderName: folder.folderName,
        files: folder.files,
        folders: folder.folders,
        depth: (props.depth || 2) + 1,
        key: folder.folderName + i,
        index: props.index + 1,
        activeIndex: props.activeIndex,
        setActiveIndex: props.setActiveIndex,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      });
    });
    allItems.push.apply(allItems, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(allFolders));
  }

  if (props.files) {
    allItems.push.apply(allItems, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(props.files.map(function (file, i) {
      return React.createElement(_FileExplorerFile__WEBPACK_IMPORTED_MODULE_2__["FileExplorerFile"], {
        fileName: file.fileName,
        fileType: file.fileType,
        fileUri: file.fileUri,
        depth: (props.depth || 2) + 1,
        key: file.fileName + i,
        index: props.index + i,
        activeIndex: props.activeIndex,
        setActiveIndex: props.setActiveIndex,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      });
    })));
  }

  var handleClick = function handleClick(e) {
    toggleCollapsed(e);
    props.setActiveIndex([props.index]);
  };

  return React.createElement(React.Fragment, null, React.createElement("div", {
    className:  true ? 'file-explorer-row active-row' : undefined // isOpen
    //   ? 'file-explorer-row file-explorer-collapsible collapsed'
    //   : 'file-explorer-row file-explorer-collapsible'
    ,
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, React.createElement("div", {
    className: "file-explorer-row-contents",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, React.createElement("span", {
    className: 'file-explorer-name file-explorer-icon ' + (isOpen ? 'file-explorer-icon-folder-collapsed' : 'file-explorer-icon-folder'),
    style: {
      margin: '0 0 0 ' + ((props.depth || 2) * 8).toString() + 'px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, React.createElement("span", {
    className: "file-explorer-label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, props.folderName)))), isOpen && allItems);
}

/***/ }),

/***/ "./src/customComponents/Workspace.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Workspace", function() { return Workspace; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _FileExplorer_FileExplorerContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/customComponents/FileExplorer/FileExplorerContainer.tsx");
/* harmony import */ var _common_Monaco__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/Monaco.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_Alerts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/Alerts.tsx");

var _jsxFileName = "/var/www/osm/clientApp/src/customComponents/Workspace.tsx";





function Workspace(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      customComponentDetails = _useState2[0],
      setCustomComponentDetails = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(),
      _useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    _lib_API__WEBPACK_IMPORTED_MODULE_4__["default"].get({
      path: '/api/c/customComponentBuilder/' + props.match.params.componentTitle
    }).then(function (details) {
      if (details.success) {
        setCustomComponentDetails(details.data);
      } else {
        setErrors(details.errors);
      }
    });
  }, [props.match.params.componentTitle]);
  return React.createElement(React.Fragment, null, React.createElement("link", {
    href: "/public/c/customComponentDesigner/assets/styles/file-explorer.css",
    type: "text/css",
    rel: "stylesheet",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }), React.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, React.createElement("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, React.createElement("div", {
    className: "col-sm-12 col-lg-6 col-md-10 py-3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, errors && React.createElement(_common_Alerts__WEBPACK_IMPORTED_MODULE_5__["Alert"], {
    alertType: "danger",
    message: errors[0].message,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), React.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, customComponentDetails && customComponentDetails.title))), React.createElement("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, React.createElement("div", {
    className: "col-md-3 col-lg-2",
    style: {
      padding: '0'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, customComponentDetails && React.createElement(_FileExplorer_FileExplorerContainer__WEBPACK_IMPORTED_MODULE_1__["FileExplorerContainer"], {
    fileStructureLocation: '/api/c/customComponentBuilder/tree/' + customComponentDetails.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  })), React.createElement("div", {
    className: "col-md-9 col-lg-10",
    style: {
      padding: '0'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, React.createElement(_common_Monaco__WEBPACK_IMPORTED_MODULE_2__["Monaco"], {
    value: "test string",
    language: "typescript",
    libs: ['/api/c/customComponentBuilder/libs/server', '/api/c/customComponentBuilder/libs/client'],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  })))));
}

/***/ }),

/***/ "./src/forms/FieldForm.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldForm; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/FormControls/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/util.ts");



var _jsxFileName = "/var/www/osm/clientApp/src/forms/FieldForm.tsx";





/**
 * Renders a form populated with fields from a "fields" argument
 * @param props
 */
var formControlFromJson = function formControlFromJson(fieldName, field, changeHandler, model, displayVal) {
  switch (field.type) {
    case 'string':
      {
        if (field.refTable) {
          return {
            component: _common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Reference"],
            props: {
              label: field.label,
              id: fieldName,
              name: fieldName,
              onChange: changeHandler,
              value: model[fieldName],
              display: displayVal,
              className: 'col-lg-6 col-md-12',
              references: field.refTable
            }
          };
        } else {
          return {
            component: _common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"],
            props: {
              label: field.label,
              name: fieldName,
              onChange: changeHandler,
              value: model[fieldName],
              maxLength: field.maxLength || 40,
              className: 'col-lg-6 col-md-12'
            }
          };
        }
      }

    case 'boolean':
      {
        return {
          component: _common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Checkbox"],
          props: {
            label: field.label,
            name: fieldName,
            onChange: changeHandler,
            value: model[fieldName],
            checked: !!model[fieldName],
            className: 'col-lg-6 col-md-12'
          }
        };
      }

    default:
      {
        return {
          component: _common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"],
          props: {
            label: field.label,
            name: fieldName,
            onChange: changeHandler,
            value: model[fieldName],
            className: 'col-lg-6 col-md-12'
          }
        };
      }
  }
};
/**
 *
 * @param form Columns being passed to render
 * @param model Data model to pull values from
 * @param primaryKey String containing primary key for table
 * @param param3 Object containing change, submit and delete handlers
 */
// {
//   id: string
//   label: string
//   body: JSX.Element
// }


function FieldForm(props) {
  // Lets initialize all of the fields with empty strings to prevent undefined
  var initialDataModel = {
    values: {}
  };
  Object.keys(props.form.fields).forEach(function (fieldName) {
    initialDataModel.values[fieldName] = '';
  }); // Hold all of the field data here

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, initialDataModel, {
    fields: []
  })),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
      dataModel = _useState2[0],
      setDataModel = _useState2[1]; // @ts-ignore


  window.dm = dataModel; // Store a list of modified fields

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      _useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
      modifiedFields = _useState4[0],
      setModifiedFields = _useState4[1]; // @ts-ignore


  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])([]),
      _useState6 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
      errors = _useState6[0],
      setErrors = _useState6[1]; // @ts-ignore


  window.dm = dataModel; // Define helper functions

  var getData = function getData(table, id, fields) {
    return new Promise(function (resolve, reject) {
      new _lib_API__WEBPACK_IMPORTED_MODULE_5__["TowelRecord"](table).get({
        fields: fields,
        id: id
      }).then(function (fetchedFields) {
        if (fetchedFields.errors) {
          var allErrors = fetchedFields.errors.map(function (err) {
            return React.createElement("div", {
              className: "alert alert-danger",
              role: "alert",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 151
              },
              __self: this
            }, err.message);
          });
          setErrors(allErrors);
        }

        setDataModel({
          values: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, dataModel.values, fetchedFields.data[table]),
          fields: dataModel.fields
        }); // reloadForm()

        resolve();
      }).catch(reject);
    });
  };

  var handleSubmit = function handleSubmit() {
    var id = props.id;
    var table = props.table;

    if (id === 'new') {
      new _lib_API__WEBPACK_IMPORTED_MODULE_5__["TowelRecord"](table).create(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, dataModel.values));
    } else {
      var body = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, dataModel.values, {
        sys_id: id // for (const field in dataModel) {
        //   if (modifiedFields.indexOf(field) > -1) {
        //     body[field] = dataModel[field]
        //   }
        // }

      });

      new _lib_API__WEBPACK_IMPORTED_MODULE_5__["TowelRecord"](table).update(id, body).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.error(err);
      });
    }
  };

  var handleDelete = function handleDelete() {
    new _lib_API__WEBPACK_IMPORTED_MODULE_5__["TowelRecord"](props.table).delete(props.id).then(function (res) {
      if (res.status === 204) {
        props.history.goBack();
      }
    });
  };

  var handleChange = function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      var newValues = {};

      if (e.target.type === 'checkbox') {
        newValues[e.target.name] = e.target.checked;
      } else {
        newValues[e.target.name] = e.target.value;
      }

      setDataModel({
        values: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, dataModel.values, newValues),
        fields: dataModel.fields
      });
    }
  };

  var setReference = function setReference(updatedRef) {
    var newValues = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, updatedRef.field, updatedRef.newValue);

    setDataModel({
      values: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, dataModel.values, newValues),
      fields: dataModel.fields
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    if (props.id !== 'new') {
      getData(props.table, props.id, Object.keys(props.form.fields));
    }
  }, []);
  var displayFields = Object.keys(props.form.fields).map(function (fieldName, key) {
    var thisFieldInfo = props.form.fields[fieldName];

    if (fieldName === props.primaryKey) {
      /*
        It really is superfluous to push the primary key
        into a hidden field, but it makes sense for me.
      */
      return React.createElement("input", {
        type: "hidden",
        id: fieldName,
        name: fieldName,
        value: dataModel.values[fieldName],
        onChange: handleChange,
        key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 252
        },
        __self: this
      });
    }
    /*
      Decide which kind of field to render
    */


    var field = props.form.fields[fieldName];

    switch (field.type) {
      case 'string':
        {
          if (field.refTable) {
            return React.createElement(_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Reference"], {
              label: field.label,
              id: fieldName,
              name: fieldName,
              setReference: setReference,
              value: dataModel.values[fieldName],
              display: dataModel.values[fieldName + '_display'],
              className: 'col-lg-6 col-md-12',
              references: field.refTable,
              key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
              readOnly: thisFieldInfo.readonly && !(props.id === 'new') ? true : false,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 271
              },
              __self: this
            });
          } else {
            return React.createElement(_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"], {
              type: 'text',
              label: field.label,
              name: fieldName,
              onChange: handleChange,
              value: dataModel.values[fieldName],
              maxLength: field.maxLength || 40,
              className: 'col-lg-6 col-md-12',
              readOnly: thisFieldInfo.readonly && !(props.id === 'new') ? true : false,
              key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 288
              },
              __self: this
            });
          }
        }

      case 'boolean':
        {
          return React.createElement(_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Checkbox"], {
            label: field.label,
            name: fieldName,
            onChange: handleChange,
            value: dataModel.values[fieldName],
            checked: !!dataModel.values[fieldName],
            className: 'col-lg-6 col-md-12',
            readOnly: thisFieldInfo.readonly && !(props.id === 'new') ? true : false,
            key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 306
            },
            __self: this
          });
        }

      default:
        {
          return React.createElement(_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"], {
            type: 'text',
            label: field.label,
            name: fieldName,
            onChange: handleChange,
            value: dataModel.values[fieldName],
            className: 'col-lg-6 col-md-12',
            readOnly: thisFieldInfo.readonly && !(props.id === 'new') ? true : false,
            key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_6__["generateKeyHash"])(),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 322
            },
            __self: this
          });
        }
    }
  });
  return React.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 340
    },
    __self: this
  }, errors, React.createElement("button", {
    className: "btn btn-danger float-right ml-1",
    onClick: handleDelete,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 342
    },
    __self: this
  }, "Delete"), React.createElement("button", {
    className: "btn btn-primary float-right",
    onClick: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 348
    },
    __self: this
  }, props.id === 'new' ? 'Create' : 'Save'), React.createElement("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351
    },
    __self: this
  }, 'General Information'), React.createElement("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 352
    },
    __self: this
  }), React.createElement("form", {
    className: "form-row",
    name: "generalInformation",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 353
    },
    __self: this
  }, displayFields));
}

/***/ }),

/***/ "./src/forms/Form.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_PillLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/PillLayout.tsx");
/* harmony import */ var _common_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/Loading.tsx");
/* harmony import */ var _lib_formLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/formLoader.ts");
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/forms/FieldForm.tsx");

var _jsxFileName = "/var/www/osm/clientApp/src/forms/Form.tsx";






function Form(props) {
  // @ts-ignore
  window.Form = Form; // Define the state variables
  // let CustomForm: React.LazyExoticComponent<
  //   // React.FunctionComponent<any>
  //   (props: any) => JSX.Element
  // > | null = null

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      CustomForm = _useState2[0],
      setCustomForm = _useState2[1]; // Store the pill bodies


  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({}),
      _useState4 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      pills = _useState4[0],
      setPills = _useState4[1];

  var reloadForm = function reloadForm() {
    var tableName = props.match.params.table;

    if (tableName) {
      Object(_lib_formLoader__WEBPACK_IMPORTED_MODULE_4__["getFormDetails"])(tableName).then(function (_ref) {
        var _ref2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
            formDetails = _ref2[0],
            parsedForm = _ref2[1];

        console.log(formDetails);

        if (!formDetails && parsedForm) {
          // These forms all return default exports, but it needs to
          // be explicitly cast that way for TS to know
          // CustomForm = React.lazy(() => parsedForm)
          setCustomForm(react__WEBPACK_IMPORTED_MODULE_1__["lazy"](function () {
            return parsedForm;
          })); // CustomForm = parsedForm

          return;
        }

        if (formDetails && Object.keys(formDetails.tabs).length > 0) {
          // Form tabs come in 3 varieties:
          // - Form Control
          // - Table
          var allFormTabs = {};
          Object.keys(formDetails.tabs).forEach(function (tabId) {
            var thisTab = formDetails.tabs[tabId];

            if (thisTab.fields) {
              // CustomForm = null
              setCustomForm(null);
              allFormTabs[tabId] = {
                id: thisTab.name,
                label: thisTab.title,
                body: react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_FieldForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  primaryKey: thisTab.primaryKey,
                  id: props.match.params.id,
                  table: props.match.params.table,
                  history: props.history,
                  form: thisTab,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                  },
                  __self: this
                })
              };
            }
          });
          setPills(allFormTabs);
        }
      });
    }
  }; // Fetch the form


  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(reloadForm, [props.match.params.table, props.match.params.id]); // Refresh data when the id changes
  // useEffect(() => {
  //   reloadForm
  // }, [props.match.params.id])
  // if (pills) {
  // If forms have been initialized, render the form contained in the form state

  if (CustomForm !== null) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](CustomForm, {
      match: props.match,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: this
    });
  } else if (Object.keys(pills).length > 0) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_common_PillLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      pills: pills,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112
      },
      __self: this
    });
  } else {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_common_Loading__WEBPACK_IMPORTED_MODULE_3__["Loading"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    });
  } //   return (
  //     <div>
  //       CustomForm !== null ?  : (
  //       <h3>{form.title || 'd'}</h3>
  //       {Object.keys(pills).length > 0 && <Pills pills={pills} />})
  //     </div>
  //   )
  // } else {
  //   // Duh
  //   return <Loading />
  // }

}

/***/ }),

/***/ "./src/home/Dashboard.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dashboard; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_Can__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/common/Can.tsx");
/* harmony import */ var _common_FormControls_FileUpload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/common/FormControls/FileUpload.tsx");





var _jsxFileName = "/var/www/osm/clientApp/src/home/Dashboard.tsx";





var Dashboard =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Dashboard, _Component);

  function Dashboard(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Dashboard);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Dashboard).call(this, props));
    _this.state = {
      menus: window.THQ.menus || []
    };
    document.addEventListener('thq.receivedNav', function () {
      _this.setState({
        menus: window.THQ.menus
      });
    });
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Dashboard, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "container-fluid",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "col-md-8 mt-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card shadow mb-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-header bg-goodyear",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h4", {
        className: "card-title text-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, "Transactions"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-body bg-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }, "Find everything you need to finalize and manage deliveries or upload and download data using the TPP POS integration system."), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }, "Start a delivery for:"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, "National Account"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=b",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, "Local Government"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=d",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, "State Government"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_6__["Can"], {
        role: "Create-CA-Delivery",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=j",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, "CA National Account")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_6__["Can"], {
        role: "View-More",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, "Deliveries On Hold"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "Deliveries Sent"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, "Roadside Service Calls"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-goodyear m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, "TPP Info")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("button", {
        className: "dropdown-toggle btn-goodyear btn text-light mt-1",
        id: "dropdownacct",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }, "More..."), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownacct",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "dropdown-item",
        href: "/delivery/?type=c",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, "C - Local Price Support"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "dropdown-item",
        href: "/delivery/?type=e",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, "E - Federal Government"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "dropdown-item",
        href: "/delivery/?type=f",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, "F - Purchase & Resale"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "dropdown-item",
        href: "/delivery/?type=h",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, "H - Direct Dealer")))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_6__["Can"], {
        if: this.state.menus.indexOf('Tires And Ordering') > -1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card shadow mb-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-header bg-info shadow-sm",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h4", {
        className: "card-title text-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, "Order Tires"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-body bg-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, "Search tire inventory and determine product availability using the Tire Finder. Plus, order tires to capitalize on the selling power of Goodyear\xAE, Dunlop\xAE and Kelly\xAE tires."), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-info m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, "Find Tires"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-info m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, "Check Order Status"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-info m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }, "View Tire Price Book"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-info m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, "Quotes")))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_6__["Can"], {
        if: this.state.menus.indexOf('Financial') > -1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card shadow mb-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-header bg-secondary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h4", {
        className: "card-title text-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, "Financial Information"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-body bg-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, "Check your account balance and remit payments. Retrieve invoices, statements, and Sales Status reports in Financials."), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Or view:"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-secondary m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, "Invoices"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-secondary m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, "Account Payable Summary"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-secondary m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, "Account Claim Form"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-secondary m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, "Ultimate Purchaser Certificate")))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_6__["Can"], {
        if: this.state.menus.indexOf('Dealer Programs') > -1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card mb-3 mb-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-header bg-warning",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h4", {
        className: "card-title text-dark",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      }, "Dealer Programs"))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-body bg-light",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, "Access valuable information and documents designed to help you effectively manage your business while supporting National Accounts and Government Sales customers."), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-warning m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }, "Service Price Book"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-warning m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, "Government Approval Info"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
        className: "btn btn-warning m-1",
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      }, "View Online Orders"))))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "col-md-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card mt-4 h-50",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "card-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h4", {
        className: "card-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: this
      }, "Sales Stats"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "col-9",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        className: "text-left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }, "Deliveries MTD:"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        className: "text-left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }, "ECommerce Deliveries:")), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
        className: "col-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        className: "text-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        },
        __self: this
      }, "5"), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("p", {
        className: "text-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        },
        __self: this
      }, "105"))))))), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_FormControls_FileUpload__WEBPACK_IMPORTED_MODULE_7__["default"], {
        name: "test_upload",
        addAdditional: true,
        destination: "/api",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        },
        __self: this
      }));
    }
  }]);

  return Dashboard;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ }),

/***/ "./src/home/Navigation.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_getNavigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/getNavigation.ts");
/* harmony import */ var _common_Can__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/common/Can.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/util.ts");





var _jsxFileName = "/var/www/osm/clientApp/src/home/Navigation.tsx";







function NavigationHeading(props) {
  var links = [];
  var key = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = props.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var navLink = _step.value;
      var uniqueKey = key + 10 * Date.now();
      links.push(react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
        className: "dropdown-item",
        to: navLink.href,
        key: 'nav-link-unique-' + uniqueKey.toString(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
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

  return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "dropdown-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, props.header), links);
}

function NavigationDropdown(props) {
  return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
    className: "nav-item dropdown",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
    className: "nav-link text-light dropdown-toggle pl-3",
    href: "#",
    id: Object(_lib_util__WEBPACK_IMPORTED_MODULE_9__["generateKeyHash"])(),
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    role: "button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("h5", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, props.navTitle)), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "dropdown-menu",
    "aria-labelledby": Object(_lib_util__WEBPACK_IMPORTED_MODULE_9__["generateKeyHash"])(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
    className: "row flex-lg-nowrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, Object.keys(props.navHeading).map(function (heading) {
    return react__WEBPACK_IMPORTED_MODULE_5__["createElement"](NavigationHeading, {
      header: heading,
      links: props.navHeading[heading],
      key: Object(_lib_util__WEBPACK_IMPORTED_MODULE_9__["generateKeyHash"])(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    });
  }))));
}

var Navigation =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Navigation, _Component);

  function Navigation(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Navigation);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Navigation).call(this, props));
    _this.state = {
      nav: null,
      loaded: false
    };

    _this.getNav();

    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Navigation, [{
    key: "getNav",
    value: function getNav() {
      var _this2 = this;

      Object(_lib_getNavigation__WEBPACK_IMPORTED_MODULE_6__["fetchLogin"])().then(function (navigation) {
        if (navigation.error) {
          console.error(navigation.error);
        }

        _this2.setState({
          nav: navigation,
          loaded: true
        });
      }).catch(function (err) {
        console.error(err);

        _this2.setState({
          nav: 'Error',
          loaded: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.nav === null || this.state.nav === undefined || this.state.loaded !== true) {
        return null;
      } else {
        var menus = [];
        Object.keys(this.state.nav).map(function (menu, key) {
          menus.push(react__WEBPACK_IMPORTED_MODULE_5__["createElement"](NavigationDropdown, {
            navHeading: _this3.state.nav[menu],
            navTitle: menu,
            key: 'nav-dropdown-' + key,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 108
            },
            __self: this
          }));
        });
        return react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("nav", {
          className: "navbar navbar-expand-lg navbar-dark bg-goodyear",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
          className: "navbar-brand",
          to: "/",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("img", {
          src: "/public/images/logo.png",
          height: "60px",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 118
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("button", {
          className: "navbar-toggler",
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#mainNav",
          "aria-controls": "main-nav",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
          className: "navbar-toggler-icon",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 129
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
          className: "collapse navbar-collapse",
          id: "mainNav",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 132
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
          className: "mr-auto navbar-nav",
          id: "menuContainer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          },
          __self: this
        }, menus), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("ul", {
          className: "navbar-nav",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("li", {
          className: "nav-item dropdown",
          key: "user-menu",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
          className: "dropdown-toggle pl-3 nav-item ml-auto",
          "data-toggle": "dropdown",
          id: "account",
          "aria-haspopup": "true",
          "aria-expanded": "false",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 138
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("img", {
          className: "rounded-circle img",
          src: "/public/images/account.png",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 145
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
          className: "dropdown-menu dropdown-menu-right",
          "aria-labelledby": "account",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
          className: "dropdown-item",
          to: "/changeCustomer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          },
          __self: this
        }, 'Change Customer'), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_common_Can__WEBPACK_IMPORTED_MODULE_7__["Can"], {
          role: 'User-Admin',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 157
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
          className: "dropdown-item",
          to: "/userAdministration",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 158
          },
          __self: this
        }, 'User Administration')), react__WEBPACK_IMPORTED_MODULE_5__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
          className: "dropdown-item",
          to: "/profile",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 162
          },
          __self: this
        }, 'Profile'), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
          className: "dropdown-item",
          href: "#",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 165
          },
          __self: this
        }, 'French'), react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("a", {
          className: "dropdown-item",
          href: "/auth/logout",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 168
          },
          __self: this
        }, 'Logout'))))));
      }
    }
  }]);

  return Navigation;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ }),

/***/ "./src/index.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/App.tsx");
var _jsxFileName = "/var/www/osm/clientApp/src/index.tsx";



 // import * as serviceWorker from './serviceWorker'

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: undefined
}), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

/***/ }),

/***/ "./src/lib/API.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TowelRecord", function() { return TowelRecord; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");





function makeFetchRequest(uri, init) {
  return new Promise(function (resolveRequest, rejectRequest) {
    fetch(uri, init).then(function (res) {
      if (init && init.method === 'DELETE') {
        var error = res.headers.get('Error_Record');

        if (error) {
          resolveRequest({
            success: false,
            errors: [{
              message: error
            }]
          });
        } else {
          resolveRequest({
            success: true
          });
        }

        return;
      }

      return res.json();
    }).then(resolveRequest).catch(rejectRequest);
  });
}

function flattenQuery(queryObject) {
  var queryStringArray = ["token=".concat(window.THQ.token || '')];

  if (queryObject && typeof queryObject === 'object') {
    Object.keys(queryObject).map(function (queryKey) {
      queryStringArray.push("".concat(queryKey, "=").concat(encodeURIComponent(queryObject[queryKey])));
    });
  } else if (queryObject) {
    queryStringArray.push(queryObject);
  }

  return queryStringArray.join('&');
}

var API = {
  // Define constants
  TABLE: '/api/q/',
  post: function post(_ref) {
    var path = _ref.path,
        query = _ref.query,
        body = _ref.body;
    var authPath = path + '?' + flattenQuery(query);
    console.log('Making POST request to ' + authPath);
    return new Promise(function (resolve, reject) {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      }).then(function (data) {
        resolve(data);
      }).catch(reject);
    });
  },
  get: function get(_ref2, cb) {
    var path = _ref2.path,
        query = _ref2.query;
    var authPath = path + '?' + flattenQuery(query);
    console.log('Making GET request to ' + authPath);
    return new Promise(function (resolve, reject) {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }).then(function (data) {
        resolve(data);
      }).catch(function (err) {
        throw err;
      });
    });
  },

  /**
   * @param {string} path URL to make request to
   * @param {object} query Query string parameters in object format
   * @param {object} body Body of update parameters
   */
  put: function put(_ref3) {
    var path = _ref3.path,
        query = _ref3.query,
        body = _ref3.body;
    var authPath = path + '?' + flattenQuery(query);
    return new Promise(function (resolve, reject) {
      fetch(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
      }).then(function (res) {
        if (res.ok && res.status === 204) {
          resolve();
        } else {
          reject(new Error('Update failed'));
        }
      }).catch(reject);
    });
  },

  /**
   * @param {string} path URL to make request to
   * @param {object} query Query string parameters in object format
   * @param {object} body Body of update parameters
   */
  patch: function patch(_ref4) {
    var path = _ref4.path,
        query = _ref4.query,
        body = _ref4.body;
    var authPath = path + '?' + flattenQuery(query);
    return new Promise(function (resolve, reject) {
      makeFetchRequest(authPath, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(body)
      }).then(function (data) {
        resolve(data);
      }).catch(function (err) {
        throw err;
      });
    });
  },
  del: function del(path, query) {
    var authPath = path + '?' + flattenQuery(query); // return new Promise((resolve, reject) => {

    return makeFetchRequest(authPath, {
      method: 'DELETE'
    }); //     .then(resolve)
    //     .catch(reject)
    // })
  }
};
var TowelRecord =
/*#__PURE__*/
function () {
  function TowelRecord(table) {
    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, TowelRecord);

    this.tableName = void 0;
    this.id = void 0;
    this.tableName = table;
    this.id = '';
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(TowelRecord, [{
    key: "update",
    value: function () {
      var _update = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(sysId, body) {
        var _this = this;

        return _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  _this.id = sysId;

                  if (_this.tableName && _this.tableName.endsWith('_list')) {
                    _this.tableName = _this.tableName.slice(0, -5);
                  }

                  if (!sysId) {
                    throw new Error('Missing id to update record');
                  }

                  API.patch({
                    path: "/api/q/".concat(_this.tableName, "/").concat(_this.id),
                    body: body
                  }).then(function (response) {
                    console.log(response);
                    resolve(response);
                  }).catch(function (err) {
                    console.error(err);
                    resolve({
                      error: err
                    });
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(id) {
        var _this2 = this;

        return _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  API.del('/api/q/' + _this2.tableName + '/' + id).then(function (res) {
                    resolve(res);
                  }).catch(function (err) {
                    resolve({
                      error: err
                    });
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(_ref5) {
        var _this3 = this;

        var fields, args, id;
        return _var_www_osm_clientApp_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fields = _ref5.fields, args = _ref5.args, id = _ref5.id;
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  if (id && _this3.tableName.endsWith('_list')) {
                    _this3.tableName = _this3.tableName.slice(0, -5);
                  }

                  var path = id ? "/api/q/".concat(_this3.tableName, "/").concat(id) : "/api/q/".concat(_this3.tableName);
                  API.get({
                    path: path,
                    query: {
                      fields: fields,
                      args: args
                    }
                  }).then(function (res) {
                    return resolve(res);
                  }).catch(function (err) {
                    console.error(err);
                    return reject({
                      error: err
                    });
                  });
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x4) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function create(body, fields) {
      var _this4 = this;

      return new Promise(function (resolve) {
        API.post({
          path: '/api/q/' + _this4.tableName,
          body: body,
          query: {
            fields: fields || ''
          }
        }).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve({
            error: err
          });
        });
      });
    }
  }]);

  return TowelRecord;
}();
/* harmony default export */ __webpack_exports__["default"] = (API);

/***/ }),

/***/ "./src/lib/formLoader.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormDetails", function() { return getFormDetails; });
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/API.ts");

// const Hook = React.lazy(() => import('../admin/Hook'))
// const UserProfile = React.lazy(() => import('../home/UserProfile'))
// const Column = React.lazy(() => import('../admin/Column'))
// Retrieve the form details for a specific table
function getFormDetails(formName) {
  return new Promise(function (resolveFormDetails, rejectFormDetails) {
    // Store tsx forms in this object
    // const specialForms: {[formName: string]: React.LazyExoticComponent} = {
    //   sys_user: UserProfile,
    //   sys_db_dictionary: Column,
    //   // sys_db_object: TableModifier,
    //   sys_db_hook: Hook
    var specialForms = {
      // sys_user: '../admin/Hook',
      sys_db_dictionary: '../admin/Column',
      // sys_db_object: TableModifier,
      sys_db_hook: '../admin/Hook'
    };

    var specialFormLoader = function specialFormLoader(specialFormName) {
      switch (specialFormName) {
        // case 'sys_user': {
        //   return import('../home/UserProfile')
        // }
        case 'sys_db_dictionary':
          {
            return __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, "./src/admin/Column.tsx"));
          }

        case 'sys_db_hook':
          {
            return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, "./src/admin/Hook.tsx"));
          }

        default:
          {
            // This should never happen
            return Promise.resolve(/* import() */).then(__webpack_require__.bind(null, "./src/common/Errors.tsx"));
          }
      }
    }; // Dynamically load special forms


    if (formName in specialForms) {
      return resolveFormDetails([undefined, specialFormLoader(formName)]); // specialForms[formName]
      //   .then((form: { default: React.FunctionComponentFactory<any> }) => {
      //     return resolveFormDetails(React.lazy)
      //   })
      //   .catch(rejectFormDetails)
      // return resolveFormDetails([undefined, specialForms[formName]])
    } else {
      _API__WEBPACK_IMPORTED_MODULE_0__["default"].get({
        path: '/api/describe/form/' + formName
      }).then(function (formDetails) {
        return resolveFormDetails([formDetails.data]);
      }).catch(rejectFormDetails);
    }
  });
}

/***/ }),

/***/ "./src/lib/getNavigation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
function fetchLogin() {
  return new Promise(function (resolve, reject) {
    var token = window.THQ.token || '';
    var details = JSON.parse(atob(token.split('.')[1]));
    window.THQ.user = details;

    if (details.userId === window.localStorage.getItem('userId') && window.localStorage.navigation && window.THQ.user.privs && window.THQ.user.privs.length > 0) {
      var event;

      if (typeof Event === 'function') {
        event = new Event('thq.receivedNav');
      } else {
        event = document.createEvent('Event');
        event.initEvent('thq.receivedNav', true, true);
      }

      document.dispatchEvent(event);
      resolve(JSON.parse(window.localStorage.navigation));
    } else {
      window.localStorage.setItem('userId', details.userId);
      $.ajax('/api/navigation?token=' + token, {
        xhrFields: {
          withCredentials: true
        },
        success: function success(response) {
          if (!response.error) {
            var menus = formatNavigation(response.details.navigation);
            window.THQ.user.privs = response.details.roles;
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
            throw new Error(response.error);
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

      if (!menus[link.menu]) {
        menus[link.menu] = {};
      }

      if (!Array.isArray(menus[link.menu][link.header])) {
        menus[link.menu][link.header] = [];
      }

      menus[link.menu][link.header].push({
        href: link.href,
        innerText: link.inner_text
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

/***/ "./src/lib/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateKeyHash", function() { return generateKeyHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/**
 * Generates a random hash. By default will return 6 alpha-numeric chars.
 * @param length Optional parameter representing length of hash
 */
function generateKeyHash() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 1; i <= length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
/**
 * Do nothing
 */

function noop() {}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.tsx");


/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.chunk.js.map