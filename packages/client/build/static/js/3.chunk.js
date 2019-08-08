(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/home/UserProfile.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_Table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/common/Table/index.tsx");
/* harmony import */ var _common_PillLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/common/PillLayout.tsx");
/* harmony import */ var _UserProfileInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/home/UserProfileInfo.tsx");
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/common/FormControls/index.tsx");






var _jsxFileName = "/var/www/osm/clientApp/src/home/UserProfile.tsx";




 // import $ from 'jquery'


 // interface IUserProfileProps {}

var UserProfile =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(UserProfile, _Component);

  function UserProfile(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, UserProfile);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(UserProfile).call(this, props));
    _this.state = {
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
      sys_id: props.id || false,
      logs: [],
      logCols: {
        Time: {
          boundTo: 'log_time',
          type: 'Date'
        },
        Action: {
          boundTo: 'log_message',
          type: 'string'
        }
      },
      customers: []
    };

    _this.getUser();

    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(UserProfile, [{
    key: "handleChange",
    value: function handleChange(e) {
      var fields = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state.fields);

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
      var _this2 = this;

      var apiQ;

      if (this.state.sys_id) {
        apiQ = _lib_API__WEBPACK_IMPORTED_MODULE_7__["default"].get({
          path: '/api/users/profile',
          query: {
            sys_id: this.state.sys_id
          }
        });
      } else {
        apiQ = _lib_API__WEBPACK_IMPORTED_MODULE_7__["default"].get({
          path: '/api/users/me'
        });
      }

      apiQ.then(function (response) {
        if (response.errors) throw response.errors;

        var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this2.state.fields);

        var customers = [];

        if (response && response.data && response.data.customers) {
          response.data.customers.map(function (customer) {
            customers.push(customer.nsaNonsig);
          });
        }

        if (response.data && response.data.user) {
          Object.keys(response.data.user[0]).map(function (field) {
            state[field] = response.data.user[field];
          });
          state.notificationNonsig = response.data.user.userDefaultNonsig;
        }

        _this2.setState({
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
      var _this3 = this;

      var formName = e.target.getAttribute('data-form') || 'profile';
      var selector = '#' + this.state.modifiedFields.join(', #');
      var formContext = 'form[name=' + formName + ']';
      var body = {
        sys_id: $('#sys_id').val()
      };
      $(selector, $(formContext)).each(function (index) {
        if (this instanceof HTMLInputElement) {
          body[this.id] = this.value;
        }
      });
      _lib_API__WEBPACK_IMPORTED_MODULE_7__["default"].patch({
        path: '/api/q/sys_user/' + body.sys_id,
        body: JSON.stringify(body)
      }).then(function (res) {
        if (res.error) _this3.setState({
          error: true,
          errorMessage: res.error
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
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_UserProfileInfo__WEBPACK_IMPORTED_MODULE_10__["UserProfileInfo"], {
            onChange: this.handleChange.bind(this),
            fields: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state.fields),
            customers: this.state.customers,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 138
            },
            __self: this
          })
        },
        notifications: {
          id: 'notifications',
          label: 'Notifications',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 150
            },
            __self: this
          }, "Notifications For"), this.state.loaded && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_11__["SelectField"], {
            id: "notificationNonsig",
            value: this.state.fields.notificationNonsig,
            onChange: this.handleChange.bind(this),
            opts: this.state.customers,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 153
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 159
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("form", {
            name: "notificationPreferences",
            className: "form-row",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 160
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 161
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "invoice",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 162
            },
            __self: this
          }, "When I receive an invoice: "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "invoice",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 163
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 164
            },
            __self: this
          }, "Send an email"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            },
            __self: this
          }, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 168
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "chgbck",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 169
            },
            __self: this
          }, "When I receive a chargeback:", ' '), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "chgbck",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 173
            },
            __self: this
          }, "Send an email"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 174
            },
            __self: this
          }, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "g86",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: this
          }, "When I receive a G86: "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "g86",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 179
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            },
            __self: this
          }, "Send an email"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 181
            },
            __self: this
          }, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 184
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "fhq",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 185
            },
            __self: this
          }, "When I receive a FleetHQ Call: "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "fhq",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 186
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 187
            },
            __self: this
          }, "Send an email"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 188
            },
            __self: this
          }, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 191
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "doh",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 192
            },
            __self: this
          }, "Documents on hold older than "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "doh",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 193
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 194
            },
            __self: this
          }, "Do not email me"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 195
            },
            __self: this
          }, "1 Day"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 196
            },
            __self: this
          }, "5 Days"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 197
            },
            __self: this
          }, "14 Days"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 198
            },
            __self: this
          }, "1 Month"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 199
            },
            __self: this
          }, "3 Months"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("div", {
            className: "col-lg-6 col-sm-12 form-group",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 202
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("label", {
            htmlFor: "news",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 203
            },
            __self: this
          }, "When news is released"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("select", {
            id: "news",
            className: "form-control",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 204
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 205
            },
            __self: this
          }, "Send an email"), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("option", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 206
            },
            __self: this
          }, "Do not email me"))), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("button", {
            className: "btn btn-primary btn-block submit",
            "data-form": "notificationPreferences",
            type: "button",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 209
            },
            __self: this
          }, "Save"))))
        },
        logs: {
          id: 'logs',
          label: 'History',
          body: react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 227
            },
            __self: this
          }, " History "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 228
            },
            __self: this
          }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 229
            },
            __self: this
          }, " View actions that have been taken on your account "), this.state.loaded && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_Table__WEBPACK_IMPORTED_MODULE_8__["default"], {
            table: 'sys_log',
            cols: this.state.logCols,
            rows: this.state.logs,
            hideActions: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 231
            },
            __self: this
          }))
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_PillLayout__WEBPACK_IMPORTED_MODULE_9__["default"], {
        pills: pills,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        },
        __self: this
      }));
    }
  }]);

  return UserProfile;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

/***/ }),

/***/ "./src/home/UserProfileInfo.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileInfo", function() { return UserProfileInfo; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/common/FormControls/index.tsx");
/* harmony import */ var _common_Alerts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/common/Alerts.tsx");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/API.ts");






var _jsxFileName = "/var/www/osm/clientApp/src/home/UserProfileInfo.tsx";





var UserProfileInfo =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(UserProfileInfo, _Component);

  function UserProfileInfo(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, UserProfileInfo);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(UserProfileInfo).call(this, props));
    _this.state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      modifiedFields: []
    });
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(UserProfileInfo, [{
    key: "handleChange",
    value: function handleChange(e) {
      var fields = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.state.fields);

      var modifiedFields = this.state.modifiedFields;

      if (e.target instanceof HTMLInputElement) {
        fields[e.target.id] = e.target.value;

        if (modifiedFields.indexOf(e.target.id) === -1) {
          modifiedFields.push(e.target.id);
        }

        this.setState({
          fields: fields,
          modifiedFields: modifiedFields
        });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      if (e.target instanceof HTMLInputElement) {
        var formName = e.target.getAttribute('data-form') || 'profile';
        var selector = '#' + this.state.modifiedFields.join(', #');
        var formContext = 'form[name=' + formName + ']';
        var body = {
          sys_id: jQuery('#sys_id').val()
        };
        $(selector, $(formContext)).each(function (index) {
          if (e.target instanceof HTMLInputElement) {
            body[e.target.id] = e.target.value;
          }
        });
        _lib_API__WEBPACK_IMPORTED_MODULE_9__["default"].patch({
          path: '/api/q/sys_user/' + body.sys_id,
          body: body
        }).then(function (res) {
          if (res.error) _this2.setState({
            error: true,
            errorMessage: res.error
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6__["createElement"](react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, this.state.error && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_Alerts__WEBPACK_IMPORTED_MODULE_8__["Alert"], {
        message: this.state.errorMessage,
        alertType: "danger",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }), this.state.message && react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_Alerts__WEBPACK_IMPORTED_MODULE_8__["Alert"], {
        message: this.state.message,
        alertType: "success",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("h4", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, " User Information "), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("form", {
        className: "form-row",
        name: "profile",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("input", {
        type: "hidden",
        id: "sys_id",
        value: this.state.fields.sys_id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "username",
        name: "username",
        type: "text",
        label: "Username",
        value: this.state.fields.username,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        attributes: {
          readOnly: 'readonly'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "email",
        name: "email",
        type: "text",
        label: "Email",
        value: this.state.fields.email,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "userFirstName",
        label: "First Name",
        name: "userFirstName",
        type: "text",
        value: this.state.fields.userFirstName,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "userLastName",
        label: "Last Name",
        name: "userLastName",
        type: "text",
        value: this.state.fields.userLastName,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "phone",
        name: "phone",
        type: "text",
        label: "Phone Number",
        value: this.state.fields.phone,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["SelectField"], {
        id: "userDefaultNonsig",
        label: "Home Nonsig",
        value: this.state.fields.userDefaultNonsig,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        opts: this.state.customers,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "userPass",
        name: "userPass",
        label: "Password",
        value: this.state.fields.userPass,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "password",
        attributes: {
          onFocus: function onFocus(e) {
            if (e.target instanceof HTMLInputElement) {
              e.target.select();
            }
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_7__["Field"], {
        id: "userPassConfirmation",
        name: "userPassConfirmation",
        label: "Confirm Password",
        value: this.state.fields.userPassConfirmation,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "password",
        attributes: {
          onFocus: function onFocus(e) {
            if (e.target instanceof HTMLInputElement) {
              e.target.select();
            }
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("button", {
        className: "btn btn-primary btn-block submit",
        onClick: this.handleSubmit.bind(this),
        "data-form": "profile",
        type: "button",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, "Save")));
    }
  }]);

  return UserProfileInfo;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map