(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/client/view/admin/Admin.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/admin/Admin.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Admin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _NavigationRoles_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigationRoles.jsx */ "./src/client/view/admin/NavigationRoles.jsx");
/* harmony import */ var _Customers_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Customers.jsx */ "./src/client/view/admin/Customers.jsx");
/* harmony import */ var _common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../common/errors.jsx */ "./src/client/view/common/errors.jsx");
/* harmony import */ var _Wetty_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Wetty.jsx */ "./src/client/view/admin/Wetty.jsx");
/* harmony import */ var _Users_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Users.jsx */ "./src/client/view/admin/Users.jsx");
/* harmony import */ var _home_UserProfile_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../home/UserProfile.jsx */ "./src/client/view/home/UserProfile.jsx");
/* harmony import */ var _Stats_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Stats.jsx */ "./src/client/view/admin/Stats.jsx");
/* harmony import */ var _Column_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Column.jsx */ "./src/client/view/admin/Column.jsx");
/* harmony import */ var _TableMaint_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TableMaint.jsx */ "./src/client/view/admin/TableMaint.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var Admin =
/*#__PURE__*/
function (_Component) {
  _inherits(Admin, _Component);

  function Admin(props) {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, _getPrototypeOf(Admin).call(this, props));
  }

  _createClass(Admin, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/customers",
        component: _Customers_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/users",
        component: _Users_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/user/:userId",
        component: _home_UserProfile_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/navroles",
        component: _NavigationRoles_jsx__WEBPACK_IMPORTED_MODULE_2__["AdminWireFrame"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/wetty",
        component: _Wetty_jsx__WEBPACK_IMPORTED_MODULE_5__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/stats",
        component: _Stats_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/column/:sys_id",
        component: _Column_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "/admin/table/:sys_id",
        component: _TableMaint_jsx__WEBPACK_IMPORTED_MODULE_10__["TableModifier"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        component: _common_errors_jsx__WEBPACK_IMPORTED_MODULE_4__["E404"]
      }));
    }
  }]);

  return Admin;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/Column.jsx":
/*!******************************************!*\
  !*** ./src/client/view/admin/Column.jsx ***!
  \******************************************/
/*! exports provided: ColumnGeneralInformation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnGeneralInformation", function() { return ColumnGeneralInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Column; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/PillLayout.jsx */ "./src/client/view/common/PillLayout.jsx");
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/forms.jsx */ "./src/client/view/common/forms.jsx");
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






var ColumnGeneralInformation =
/*#__PURE__*/
function (_Component) {
  _inherits(ColumnGeneralInformation, _Component);

  function ColumnGeneralInformation(props) {
    var _this;

    _classCallCheck(this, ColumnGeneralInformation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColumnGeneralInformation).call(this, props));
    _this.state = {
      sys_id: props.sys_id,
      fields: _objectSpread({}, props.info),
      modifiedFields: [],
      saveDisabled: {
        disabled: 'disabled'
      }
    };
    return _this;
  }

  _createClass(ColumnGeneralInformation, [{
    key: "handleChange",
    value: function handleChange(e) {
      var state = _objectSpread({}, this.state);

      state.fields[e.target.id] = e.target.value;
      if (!state.modifiedFields.includes(e.target.id)) state.modifiedFields.push(e.target.id);
      state.saveDisabled = {};
      this.setState(state);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      console.log(e);
    }
  }, {
    key: "render",
    value: function render() {
      var dataTypes = ['CHAR', 'VARCHAR', 'INT', 'FLOAT', 'TEXT', 'BOOLEAN'];
      var length = {};
      if (this.state.type in ['CHAR', 'VARCHAR']) length = {
        readOnly: 'readonly'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " General Information "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "form-row",
        name: "info"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "hidden",
        id: "sys_id",
        value: this.state.sys_id
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        id: "column_name",
        label: "Column Name",
        value: this.state.fields.column_name,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        id: "label",
        label: "Label",
        value: this.state.fields.label,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        id: "table_name",
        label: "Table",
        value: this.state.fields.table_name,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "text"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        id: "hint",
        label: "Hint",
        value: this.state.fields.hint,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "text"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["SelectField"], {
        id: "type",
        label: "Data Type",
        value: this.state.fields.type,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        opts: dataTypes
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        id: "length",
        label: "Length",
        value: this.state.fields.length,
        onChange: this.handleChange.bind(this),
        attributes: length,
        className: "col-lg-6 col-md-12",
        type: "number"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", _extends({
        className: "btn btn-primary btn-block submit",
        onClick: this.handleSubmit.bind(this),
        "data-form": "info",
        type: "button"
      }, this.state.saveDisabled), "Save")));
    }
  }]);

  return ColumnGeneralInformation;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var ColumnTables =
/*#__PURE__*/
function (_Component2) {
  _inherits(ColumnTables, _Component2);

  function ColumnTables(props) {
    var _this2;

    _classCallCheck(this, ColumnTables);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ColumnTables).call(this, props));
    _this2.state = {
      sys_id: props.sys_id
    };
    return _this2;
  }

  _createClass(ColumnTables, [{
    key: "handleChange",
    value: function handleChange(e) {
      var state = _objectSpread({}, this.state);

      state.fields[e.target.id] = e.target.value;
      if (!state.modifiedFields.includes(e.target.id)) state.modifiedFields.push(e.target.id);
      state.saveDisabled = {};
      this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        table: "sys_db_dictionary_list",
        args: {
          reference_id: this.state.sys_id
        }
      });
    }
  }]);

  return ColumnTables;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Column =
/*#__PURE__*/
function (_Component3) {
  _inherits(Column, _Component3);

  function Column(props) {
    var _this3;

    _classCallCheck(this, Column);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Column).call(this, props));
    _this3.state = {
      error: false,
      loaded: false,
      sys_id: props.match.params.sys_id,
      generalInfo: {},
      fields: {
        column_name: '',
        label: '',
        hint: '',
        table: '',
        type: '',
        length: 0
      },
      modifiedFields: {},
      disableSubmit: {
        disabled: 'disabled'
      }
    };

    _this3.getInfo();

    return _this3;
  }

  _createClass(Column, [{
    key: "getInfo",
    value: function getInfo() {
      var _this4 = this;

      _lib_API_js__WEBPACK_IMPORTED_MODULE_4__["default"].GET({
        path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
        query: {
          fields: 'sys_id,column_name,label,table_name,hint,type,length'
        }
      }).then(function (data) {
        var state = _objectSpread({}, _this4.state);

        state.generalInfo = data.data.sys_db_dictionary;
        state.loaded = true;

        _this4.setState(state);
      }).catch(function (e) {
        _this4.setState({
          error: e.message,
          loaded: true
        });

        console.error(e);
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var state = _objectSpread({}, this.state);

      state.disableSubmit = {};
      state.modifiedFields[e.target.id] = e.target.value;
      state.fields[e.target.id] = e.target.value;
      this.setState(state);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      console.log('submitted');
    }
  }, {
    key: "render",
    value: function render() {
      var pills = {
        general: {
          id: 'general',
          label: 'General',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ColumnGeneralInformation, {
            info: this.state.generalInfo,
            sys_id: this.state.sys_id
          })
        },
        ref: {
          id: 'references',
          label: 'References',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ColumnTables, {
            sys_id: this.state.sys_id
          })
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        pills: pills,
        handleChange: this.handleChange.bind(this),
        handleSubmit: this.handleSubmit
      }, this.state)));
    }
  }]);

  return Column;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/NavigationRoles.jsx":
/*!***************************************************!*\
  !*** ./src/client/view/admin/NavigationRoles.jsx ***!
  \***************************************************/
/*! exports provided: AdminWireFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminWireFrame", function() { return AdminWireFrame; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_tabs_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/tabs.jsx */ "./src/client/view/common/tabs.jsx");
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common/forms.jsx */ "./src/client/view/common/forms.jsx");
/* harmony import */ var _lib_formSubmission_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/formSubmission.js */ "./src/client/view/lib/formSubmission.js");
/* harmony import */ var _common_alerts_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/alerts.jsx */ "./src/client/view/common/alerts.jsx");
/* harmony import */ var _common_errors_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/errors.jsx */ "./src/client/view/common/errors.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
/* harmony import */ var _TableViews_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TableViews.jsx */ "./src/client/view/admin/TableViews.jsx");
/* harmony import */ var _common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/PillLayout.jsx */ "./src/client/view/common/PillLayout.jsx");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var ExistingRoute =
/*#__PURE__*/
function (_Component) {
  _inherits(ExistingRoute, _Component);

  function ExistingRoute(props) {
    _classCallCheck(this, ExistingRoute);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExistingRoute).call(this, props));
  }

  _createClass(ExistingRoute, [{
    key: "setNav",
    value: function setNav(e) {
      document.getElementById('updateButton').style.display = 'inline-block';
      document.getElementById('submitButton').style.display = 'none';
      $('#existinglinks').modal('toggle');
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          _this.props.onChoice(e, _this.props);

          _this.setNav();
        }
      }, this.props.navInnerText)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navMethod), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navHref), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navPriv), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navMenu), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navHeader), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navActive), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, this.props.navIsNotApi));
    }
  }]);

  return ExistingRoute;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var ExistingRoutes =
/*#__PURE__*/
function (_Component2) {
  _inherits(ExistingRoutes, _Component2);

  function ExistingRoutes(props) {
    var _this2;

    _classCallCheck(this, ExistingRoutes);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ExistingRoutes).call(this, props));
    _this2.state = {
      links: [null],
      unAuthorized: false
    };

    _this2.getLinks();

    return _this2;
  }

  _createClass(ExistingRoutes, [{
    key: "getLinks",
    value: function getLinks() {
      var _this3 = this;

      $.ajax('/api/admin/getAllRoutes?token=' + window.THQ.token, {
        method: 'GET',
        success: function success(links) {
          if (links.error) {
            console.error(links.message);
          } else {
            _this3.setState({
              links: links
            });
          }
        },
        error: function error(err) {
          throw err;
        }
      });
      /*
      fetch('/api/admin/getAllRoutes?token=' + window.THQ.token)
      .then(res => {
          return res.json()
      })
      .then(links => {
          if (links.error) {
              console.error(links.message)
          } else {
              this.setState({links})
          }
      })
      .catch(err => {
          console.error(err)
      })
      */
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "existinglinks",
        className: "modal fade",
        tabIndex: "-1",
        role: "dialog"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-dialog modal-xl",
        role: "document"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "modal-title"
      }, "Navigation"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "data-dismiss": "modal",
        "aria-label": "Close"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
        className: "thead-dark"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Inner Text"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Method"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Href"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Privilege"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Menu"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Heading"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Active"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "UI"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, this.state.links.map(function (link, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ExistingRoute, _extends({
          onChoice: _this4.props.onChoice,
          key: i
        }, link));
      })))))));
    }
  }]);

  return ExistingRoutes;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Routes =
/*#__PURE__*/
function (_Component3) {
  _inherits(Routes, _Component3);

  function Routes(props) {
    var _this5;

    _classCallCheck(this, Routes);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Routes).call(this, props));

    _this5.getRoles();

    _this5.state = {
      hideNav: true,
      roles: [{
        value: '',
        text: '-- None --'
      }],
      message: null,
      link: {
        navActive: '',
        navIsNotApi: '',
        navMethod: '',
        navHref: '',
        navHeader: '',
        navMenu: '',
        navPriv: '',
        navInnerText: '',
        navId: ''
      }
    };
    return _this5;
  }

  _createClass(Routes, [{
    key: "getRoles",
    value: function getRoles() {
      var _this6 = this;

      $.ajax('/api/admin/getPrivs?token=' + window.THQ.token, {
        method: 'GET',
        success: function success(roles) {
          if (roles.error) {
            console.error(roles.message);

            _this6.setState({
              unAuthorized: true
            });
          }

          var roleOpts = [];
          roles.details.forEach(function (role) {
            roleOpts.push({
              value: role.rpPriv,
              text: role.rpPriv
            });
          });

          _this6.setState({
            roles: roleOpts
          });
        },
        error: function error(err) {
          throw err;
        }
      });
      /*
      fetch('/api/admin/getPrivs?token=' + window.THQ.token)
      .then(res => {
          return res.json()
      })
      .then(roles => {
          if (roles.error) {
              console.error(roles.message)
              this.setState({unAuthorized: true})
          }
          let roleOpts = []
          roles.details.forEach(role => {
              roleOpts.push({
                  value: role.rpPriv,
                  text: role.rpPriv
              })
          })
          this.setState({roles: roleOpts})
      })
      .catch(err => {
          console.error(err)
      })
      */
    }
  }, {
    key: "handleOnTypeChange",
    value: function handleOnTypeChange(e) {
      if (e.target.value === '1') {
        this.setState({
          hideNav: false
        });
      } else {
        this.setState({
          hideNav: true
        });
      }
    }
  }, {
    key: "submitAdd",
    value: function submitAdd() {
      var _this7 = this;

      var fields = document.getElementById('navLinkForm').querySelectorAll('input, select, textarea');
      var body;
      body = {};
      fields.forEach(function (field) {
        var fieldName = field.getAttribute('name') || field.id;
        var fieldValue = field.value;

        if (fieldValue === '1') {
          fieldValue = true;
        } else if (fieldValue === '0') {
          fieldValue = false;
        }

        body[fieldName] = fieldValue;
      });
      Object(_lib_formSubmission_js__WEBPACK_IMPORTED_MODULE_3__["submitForm"])({
        body: [body],
        action: '/api/admin/addRoute?token=' + window.THQ.token,
        method: 'POST',
        cb: function cb(err, response) {
          if (err) {
            console.error(err);
          }

          if (response.error) {
            _this7.setState({
              message: {
                type: 'danger',
                message: response.error
              }
            });
          } else {
            if (response.details.navLinksEntered.length === 1) {
              _this7.setState({
                message: {
                  type: 'success',
                  message: response.message
                }
              });
            } else {
              _this7.setState({
                message: {
                  type: 'danger',
                  message: response.message
                }
              });
            }
          }
        }
      });
    }
  }, {
    key: "submitUpdate",
    value: function submitUpdate() {
      var _this8 = this;

      var fields = document.getElementById('navLinkForm').querySelectorAll('input, select, textarea');
      var body;
      body = {};
      fields.forEach(function (field) {
        var fieldName = field.getAttribute('name') || field.id;
        var fieldValue = field.value;

        if (fieldValue === '1') {
          fieldValue = true;
        } else if (fieldValue === '0') {
          fieldValue = false;
        }

        body[fieldName] = fieldValue;
      });
      Object(_lib_formSubmission_js__WEBPACK_IMPORTED_MODULE_3__["submitForm"])({
        body: body,
        action: '/api/admin/updateRoute?token=' + window.THQ.token,
        method: 'POST',
        cb: function cb(err, response) {
          if (err) {
            alert(err);
          }

          if (response.error) {
            _this8.setState({
              message: {
                type: 'danger',
                message: response.error
              }
            });
          } else {
            if (response.details) {
              _this8.setState({
                message: {
                  type: 'success',
                  message: response.message
                }
              });
            } else {
              _this8.setState({
                message: {
                  type: 'danger',
                  message: response.message
                }
              });
            }
          }
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var value = e.target.value;
      var name = e.target.id;

      var link = _objectSpread({}, this.state.link); // Clone the existing link


      link[name] = value; // Insert the changed value

      this.setState({
        link: link
      }); // Set the state
    }
  }, {
    key: "setLink",
    value: function setLink(e, link) {
      this.setState({
        link: link
      });

      if (link.navIsNotApi) {
        this.setState({
          hideNav: false
        });
      } else {
        this.setState({
          hideNav: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      if (this.state.unAuthorized) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          id: "navLinkForm",
          className: this.props.className + " m-3"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_errors_jsx__WEBPACK_IMPORTED_MODULE_5__["E401"], null));
      } else {
        var _React$createElement;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          id: "navLinkForm",
          className: this.props.className + " m-3"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ExistingRoutes, {
          onChoice: this.setLink.bind(this)
        }), this.state.message && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
          message: this.state.message.message,
          alertType: this.state.message.type
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "hidden",
          id: "navId",
          value: this.state.link.navId
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          id: "navInnerText",
          type: "text",
          label: "Inner Text of <a> tag",
          value: this.state.link.navInnerText,
          onChange: this.handleChange.bind(this)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          id: "navHref",
          type: "text",
          label: "Full Path",
          value: this.state.link.navHref,
          onChange: this.handleChange.bind(this)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], {
          id: "navMethod",
          label: "Method",
          value: this.state.link.navMethod,
          onChange: this.handleChange.bind(this),
          opts: [{
            value: 'GET',
            text: 'GET'
          }, {
            value: 'POST',
            text: 'POST'
          }]
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], {
          id: "navIsNotApi",
          label: "Link Type",
          value: this.state.link.navIsNotApi,
          opts: [{
            value: '0',
            text: 'API'
          }, {
            value: '1',
            text: 'Navigation'
          }],
          otherField: false,
          onChange: function onChange(e) {
            _this9.handleOnTypeChange(e);

            _this9.handleChange(e);
          }
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          isHidden: this.state.hideNav,
          id: "navMenu",
          label: "Root Menu",
          type: "text",
          value: this.state.link.navMenu,
          onChange: this.handleChange.bind(this)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          isHidden: this.state.hideNav,
          id: "navHeader",
          label: "SubHeading",
          type: "text",
          value: this.state.link.navHeader,
          onChange: this.handleChange.bind(this)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], {
          id: "navPriv",
          label: "Privilege",
          opts: this.state.roles,
          otherField: true,
          value: this.state.link.navPriv,
          onChange: this.handleChange.bind(this)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], (_React$createElement = {
          id: "navActive",
          value: "true",
          label: "Active"
        }, _defineProperty(_React$createElement, "value", this.state.link.navActive), _defineProperty(_React$createElement, "onChange", this.handleChange.bind(this)), _defineProperty(_React$createElement, "opts", [{
          value: '1',
          text: 'Active'
        }, {
          value: '0',
          text: 'Inactive'
        }]), _React$createElement)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          id: "updateButton",
          className: "btn btn-primary",
          style: {
            display: 'none'
          },
          onClick: function onClick() {
            _this9.submitUpdate();
          }
        }, "Update"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          id: "submitButton",
          className: "btn btn-primary",
          onClick: function onClick() {
            _this9.submitAdd();
          }
        }, "Submit"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "btn btn-secondary ml-2",
          "data-toggle": "modal",
          "data-target": "#existinglinks"
        }, "Existing"));
      }
    }
  }]);

  return Routes;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var PrivTable =
/*#__PURE__*/
function (_Component4) {
  _inherits(PrivTable, _Component4);

  function PrivTable(props) {
    var _this10;

    _classCallCheck(this, PrivTable);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(PrivTable).call(this, props));
    var allPrivs = [{
      text: '-- None --',
      value: ''
    }];

    if (props.allPrivs) {
      props.allPrivs.map(function (priv) {
        allPrivs.push(priv.rpPriv);
      });
    }

    _this10.state = {
      allPrivs: allPrivs
    };
    return _this10;
  }

  _createClass(PrivTable, [{
    key: "render",
    value: function render() {
      var _this11 = this;

      var rows = [];
      var unUsed = this.props.allPrivs.filter(function (privilege) {
        return _this11.props.privs.indexOf(privilege) === -1;
      });
      this.props.privs[0] !== null && this.props.privs.map(function (priv) {
        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          scope: "row",
          key: Math.floor(Math.random() * 10000)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this11.props.rpId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, priv), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "javascript:void(0)",
          onClick: _this11.props.onDelete,
          "data-target": priv
        }, "Delete"))));
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
        className: "thead-dark"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Role"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Priv"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        scope: "col"
      }, "Mod"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        scope: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, this.props.rpId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "p-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], {
        opts: unUsed,
        id: "newPriv",
        onChange: this.props.onChange,
        value: this.props.newPrivValue
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:void(0)",
        onClick: this.props.onAdd,
        "data-for": this.props.rpId
      }, "Add")))));
    }
  }]);

  return PrivTable;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Roles =
/*#__PURE__*/
function (_Component5) {
  _inherits(Roles, _Component5);

  function Roles(props) {
    var _this12;

    _classCallCheck(this, Roles);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(Roles).call(this, props));
    _this12.state = {
      error: false,
      status: null,
      roles: [{
        text: '-- None --',
        value: ''
      }],
      privs: [null],
      allPrivs: [null],
      rpId: '',
      newPriv: ''
    };

    _this12.getRoles();

    _this12.getPrivs(true);

    return _this12;
  }

  _createClass(Roles, [{
    key: "getRoles",
    value: function getRoles() {
      var _this13 = this;

      $.ajax('/api/admin/getRoles?token=' + window.THQ.token, {
        success: function success(response) {
          if (response.error) {
            _this13.setState({
              error: true,
              status: response.message
            });
          } else {
            var rolesFormatted = [{
              text: '-- None --',
              value: 'none'
            }];
            response.details.map(function (role) {
              rolesFormatted.push({
                value: role.rpId,
                text: role.rpId
              });
            });
            console.log(rolesFormatted);

            _this13.setState({
              error: false,
              roles: rolesFormatted
            });
          }
        }
      });
    }
  }, {
    key: "getPrivs",
    value: function getPrivs(all, specificRole) {
      var _this14 = this;

      var url = '';

      if (all) {
        url = "/api/admin/getPrivs?token=".concat(window.THQ.token);
      } else if (specificRole) {
        url = "/api/admin/getPrivs?role=".concat(specificRole, "&token=").concat(window.THQ.token);
      } else {
        url = "/api/admin/getPrivs?role=".concat(this.state.rpId, "&token=").concat(window.THQ.token);
      }

      $.ajax(url, {
        success: function success(response) {
          if (!response.error) {
            var receivedPrivs = [];
            response.details.map(function (priv) {
              receivedPrivs.push(priv.rpPriv);
            });

            if (all) {
              _this14.setState({
                error: false,
                allPrivs: receivedPrivs
              });
            } else {
              _this14.setState({
                error: false,
                privs: receivedPrivs
              });
            }
          } else {
            _this14.setState({
              error: true,
              status: response.message
            });
          }
        },
        error: function error(err) {
          _this14.setState({
            error: true,
            status: err
          });
        }
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      var _this15 = this;

      var rpPriv = e.target.getAttribute('data-target');
      $.ajax("/api/admin/roles/remove?rpId=".concat(this.state.rpId, "&rpPriv=").concat(rpPriv, "&token=").concat(window.THQ.token), {
        method: 'POST',
        success: function success(response) {
          if (response.error) {
            _this15.setState({
              error: true,
              status: response.message
            });
          } else {
            var newPrivs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _this15.state.roles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var priv = _step.value;

                if (priv.rpPriv == rpPriv) {
                  continue;
                } else {
                  newPrivs.push(priv);
                }
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

            _this15.setState({
              error: false,
              status: response.message,
              privs: newPrivs
            });
          }
        },
        error: function error(err) {
          _this15.setState({
            error: true,
            status: 'Could not remove link. Please try again later'
          });
        }
      });
    }
  }, {
    key: "handleAdd",
    value: function handleAdd(e) {
      var _this16 = this;

      var rpId = e.target.getAttribute('data-for');
      var rpPriv = this.state.newPriv;

      if (rpId && rpPriv) {
        $.ajax("/api/admin/roles/add?rpId=".concat(rpId, "&rpPriv=").concat(rpPriv, "&token=").concat(window.THQ.token), {
          method: 'POST',
          success: function success(response) {
            if (response.error) {
              _this16.setState({
                error: true,
                status: response.message
              });
            } else {
              var privs = _this16.state.privs;
              privs.push(rpPriv);

              _this16.setState({
                error: false,
                status: response.message,
                privs: privs
              });
            }
          }
        });
      } else {
        this.setState({
          error: true,
          status: 'Missing role or priv'
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var name = e.target.id;
      var value = e.target.value;
      this.setState(_defineProperty({}, name, value));

      if (name === 'rpId' && value !== 'none') {
        console.log('Fetching privs for ', value);
        this.getPrivs(false, value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.className + " m-3"
      }, this.state.status && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_alerts_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
        message: this.state.status,
        alertType: this.state.error ? 'danger' : 'success'
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "hidden",
        id: "oldrpId",
        value: this.state.oldrpId
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["SelectField"], {
        id: "rpId",
        opts: this.state.roles,
        value: this.state.rpId,
        onChange: this.handleChange.bind(this),
        otherField: true
      }), this.state.privs[0] !== null && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PrivTable, {
        privs: this.state.privs,
        allPrivs: this.state.allPrivs,
        onDelete: this.handleDelete.bind(this),
        onAdd: this.handleAdd.bind(this),
        rpId: this.state.rpId,
        onChange: this.handleChange.bind(this),
        newPrivValue: this.state.newPriv
      }));
    }
  }]);

  return Roles;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var AdminWireFrame =
/*#__PURE__*/
function (_Component6) {
  _inherits(AdminWireFrame, _Component6);

  function AdminWireFrame(props) {
    var _this17;

    _classCallCheck(this, AdminWireFrame);

    _this17 = _possibleConstructorReturn(this, _getPrototypeOf(AdminWireFrame).call(this, props));
    _this17.state = {
      fields: _this17.props.fields
    };
    return _this17;
  }

  _createClass(AdminWireFrame, [{
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
    key: "render",
    value: function render() {
      var comps = {
        routes: {
          id: 'routes',
          label: 'Routes',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Routes, null)
        },
        roles: {
          id: 'roles',
          label: 'Roles',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Roles, null)
        },
        tables: {
          id: 'tables',
          label: 'Tables',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
            table: "sys_db_object_list",
            hideActions: true
          })
        },
        views: {
          id: 'views',
          label: 'Columns',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
            table: "sys_db_dictionary_list",
            perPage: 15,
            cols: ['column_name', 'label', 'table_name', 'hint', 'col_order']
          })
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({
        pills: comps,
        handleChange: this.handleChange.bind(this)
      }, this.state)));
    }
  }]);

  return AdminWireFrame;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/Stats.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/admin/Stats.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stats; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common/forms.jsx */ "./src/client/view/common/forms.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Stats =
/*#__PURE__*/
function (_Component) {
  _inherits(Stats, _Component);

  function Stats(props) {
    var _this;

    _classCallCheck(this, Stats);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stats).call(this, props));
    _this.state = {
      stats: null,
      loaded: false
    };

    _this.getStats();

    return _this;
  }

  _createClass(Stats, [{
    key: "getStats",
    value: function getStats() {
      var _this2 = this;

      _lib_API_js__WEBPACK_IMPORTED_MODULE_1__["default"].GET({
        path: '/stats'
      }).then(function (stats) {
        console.log(stats);

        _this2.setState({
          stats: stats,
          loaded: true
        });
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row m-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-lg-6 col-md-8 col-sm-11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Server Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        id: "cpuCount",
        value: this.state.stats.os.host,
        label: "Node Hostname",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.os.OS,
        label: "Operating System",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.os.cpuCount,
        label: "CPU Count",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        id: "architecture",
        value: this.state.stats.os.architecture,
        label: "Architecture",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: ~~(this.state.stats.os.openMem / 1e+6),
        label: "Available Memory (MB)",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        id: "openMem",
        value: ~~(this.state.stats.os.totMem / 1e+6),
        label: "Total Memory (MB)",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.db.NODE_ENV,
        label: "Node Environment",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Database Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.db.version[0].VERSION,
        label: "Version",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.db.poolLimit,
        label: "Pool Limit",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        value: this.state.stats.db.dbName,
        label: "Database Name",
        type: "text",
        attributes: {
          readOnly: 'readonly'
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      })));
    }
  }]);

  return Stats;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/TableMaint.jsx":
/*!**********************************************!*\
  !*** ./src/client/view/admin/TableMaint.jsx ***!
  \**********************************************/
/*! exports provided: TableModifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableModifier", function() { return TableModifier; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../common/PillLayout.jsx */ "./src/client/view/common/PillLayout.jsx");
/* harmony import */ var _common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/forms.jsx */ "./src/client/view/common/forms.jsx");
/* harmony import */ var _lib_API_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/API.js */ "./src/client/view/lib/API.js");
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
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







var TableGeneralInformation =
/*#__PURE__*/
function (_Component) {
  _inherits(TableGeneralInformation, _Component);

  function TableGeneralInformation(props) {
    var _this;

    _classCallCheck(this, TableGeneralInformation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableGeneralInformation).call(this, props));
    _this.state = {
      fields: {
        name: null
      },
      sys_id: props.sys_id,
      loaded: false
    };

    _this.fetchTableInformation();

    return _this;
  }

  _createClass(TableGeneralInformation, [{
    key: "fetchTableInformation",
    value: function fetchTableInformation() {
      var _this2 = this;

      _lib_API_js__WEBPACK_IMPORTED_MODULE_3__["default"].GET({
        path: '/api/q/sys_db_object/' + this.state.sys_id
      }).then(function (response) {
        _this2.setState({
          fields: response.data.sys_db_object || {},
          loaded: true
        });
      }).catch(function (e) {
        throw e;
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
    key: "submitChange",
    value: function submitChange(e) {}
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.loaded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: "Label",
        value: this.state.fields.label,
        onChange: this.handleChange.bind(this)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_forms_jsx__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: "Name",
        value: this.state.fields.name,
        onChange: this.handleChange.bind(this),
        readOnly: "readonly"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary btn-block",
        onClick: this.submitChange.bind(this)
      })));
    }
  }]);

  return TableGeneralInformation;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var TableModifier =
/*#__PURE__*/
function (_Component2) {
  _inherits(TableModifier, _Component2);

  function TableModifier(props) {
    var _this3;

    _classCallCheck(this, TableModifier);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(TableModifier).call(this, props));
    _this3.state = {
      sys_id: props.match.params.sys_id
    };
    return _this3;
  }

  _createClass(TableModifier, [{
    key: "render",
    value: function render() {
      var pills = {
        /**            roles: {
            id: 'roles',
            label: 'Roles',
            body: <Roles/>
        }, */
        generalInformation: {
          id: 'general',
          label: 'General Info',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TableGeneralInformation, {
            sys_id: this.state.sys_id
          })
        },
        relatedFields: {
          id: 'related',
          label: 'Fields',
          body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
            table: "sys_db_dictionary_list",
            args: {
              table_sys_id: this.state.sys_id
            }
          })
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        pills: pills
      });
    }
  }]);

  return TableModifier;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Column =
/*#__PURE__*/
function (_Component3) {
  _inherits(Column, _Component3);

  function Column(props) {
    var _this4;

    _classCallCheck(this, Column);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Column).call(this, props));
    _this4.state = {
      cols: cols
    };
    return _this4;
  }

  _createClass(Column, [{
    key: "render",
    value: function render() {
      var pills = {};
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_PillLayout_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null);
    }
  }]);

  return Column;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./src/client/view/admin/TableViews.jsx":
/*!**********************************************!*\
  !*** ./src/client/view/admin/TableViews.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TableViews; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Table.jsx */ "./src/client/view/common/Table.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TableViews =
/*#__PURE__*/
function (_Component) {
  _inherits(TableViews, _Component);

  function TableViews(props) {
    _classCallCheck(this, TableViews);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableViews).call(this, props));
  }

  _createClass(TableViews, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_Table_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        table: "sys_db_dictionary_list"
      });
    }
  }]);

  return TableViews;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/admin/Wetty.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/admin/Wetty.jsx ***!
  \*****************************************/
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



var Wetty =
/*#__PURE__*/
function (_Component) {
  _inherits(Wetty, _Component);

  function Wetty(props) {
    _classCallCheck(this, Wetty);

    return _possibleConstructorReturn(this, _getPrototypeOf(Wetty).call(this, props));
  }

  _createClass(Wetty, [{
    key: "render",
    value: function render() {
      var wettyHeight = $(window).innerHeight() - ($('nav')[0].clientHeight + $('footer')[0].clientHeight);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        src: "/wetty",
        className: "wetty",
        style: {
          height: wettyHeight + 'px'
        }
      })));
    }
  }]);

  return Wetty;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Wetty);

/***/ }),

/***/ "./src/client/view/common/tabs.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/common/tabs.jsx ***!
  \*****************************************/
/*! exports provided: Tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
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



var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));
    _this.state = {
      selectedTab: 'tab0',
      tabs: props.tabs
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "onSelection",
    value: function onSelection(tab, e) {
      this.setState({
        selectedTab: tab
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tabs = [];
      var pages = [];

      if (this.props.tabs) {
        var key = 0;
        this.props.tabs.forEach(function (tab) {
          tabs.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tab, {
            key: "tab" + key,
            onClick: _this2.onSelection.bind(_this2, "tab" + key),
            selectedTab: _this2.state.selectedTab,
            title: tab.title,
            thisKey: "tab" + key
          }));
          pages.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabPage, {
            key: "pagetab" + key,
            component: tab.component,
            selectedPage: "pagetab" + _this2.state.selectedTab,
            isHidden: !("page" + _this2.state.selectedTab === "pagetab" + key)
          }));
          key++;
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "mt-1 ml-1"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
          className: "nav nav-tabs"
        }, tabs), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "p-5"
        }, pages));
      } else {
        return null;
      }
    }
  }]);

  return Tabs;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Tab =
/*#__PURE__*/
function (_Component2) {
  _inherits(Tab, _Component2);

  function Tab(props) {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tab).call(this, props));
  }

  _createClass(Tab, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "nav-item",
        id: this.props.thisKey,
        onClick: this.props.onClick
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: this.props.selectedTab !== this.props.thisKey ? 'nav-link' : 'nav-link active',
        href: "#"
      }, this.props.title));
    }
  }]);

  return Tab;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var TabPage =
/*#__PURE__*/
function (_Component3) {
  _inherits(TabPage, _Component3);

  function TabPage(props) {
    _classCallCheck(this, TabPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabPage).call(this, props));
  }

  _createClass(TabPage, [{
    key: "render",
    value: function render() {
      var className = this.props.isHidden ? 'tab-page' : 'tab-page active';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.props.component, {
        className: className
      });
    }
  }]);

  return TabPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/client/view/lib/formSubmission.js":
/*!***********************************************!*\
  !*** ./src/client/view/lib/formSubmission.js ***!
  \***********************************************/
/*! exports provided: submitForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "submitForm", function() { return submitForm; });
function submitForm(_ref) {
  var body = _ref.body,
      action = _ref.action,
      method = _ref.method,
      cb = _ref.cb;
  $.ajax(action, {
    method: method,
    data: JSON.stringify(body),
    headers: {
      'Content-Type': 'Application/json'
    },
    success: function success(data) {
      cb(null, data);
    },
    error: cb
  });
  /*
  fetch(action, {
      method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })
  .then(res => {
      return res.json()
  })
  .then(data => {
      cb(null, data)
  })
  .catch(err => {
      cb(err)
  })
  */
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvYWRtaW4vQWRtaW4uanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9hZG1pbi9Db2x1bW4uanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9hZG1pbi9OYXZpZ2F0aW9uUm9sZXMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9hZG1pbi9TdGF0cy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2FkbWluL1RhYmxlTWFpbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9hZG1pbi9UYWJsZVZpZXdzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvYWRtaW4vV2V0dHkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9jb21tb24vdGFicy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC92aWV3L2xpYi9mb3JtU3VibWlzc2lvbi5qcyJdLCJuYW1lcyI6WyJBZG1pbiIsInByb3BzIiwiQ3VzdG9tZXJzIiwiVXNlcnMiLCJVc2VyUHJvZmlsZSIsIkFkbWluV2lyZUZyYW1lIiwiV2V0dHkiLCJTdGF0cyIsIkNvbHVtbiIsIlRhYmxlTW9kaWZpZXIiLCJFNDA0IiwiQ29tcG9uZW50IiwiQ29sdW1uR2VuZXJhbEluZm9ybWF0aW9uIiwic3RhdGUiLCJzeXNfaWQiLCJmaWVsZHMiLCJpbmZvIiwibW9kaWZpZWRGaWVsZHMiLCJzYXZlRGlzYWJsZWQiLCJkaXNhYmxlZCIsImUiLCJ0YXJnZXQiLCJpZCIsInZhbHVlIiwiaW5jbHVkZXMiLCJwdXNoIiwic2V0U3RhdGUiLCJjb25zb2xlIiwibG9nIiwiZGF0YVR5cGVzIiwibGVuZ3RoIiwidHlwZSIsInJlYWRPbmx5IiwiY29sdW1uX25hbWUiLCJoYW5kbGVDaGFuZ2UiLCJiaW5kIiwibGFiZWwiLCJ0YWJsZV9uYW1lIiwiaGludCIsImhhbmRsZVN1Ym1pdCIsIkNvbHVtblRhYmxlcyIsInJlZmVyZW5jZV9pZCIsImVycm9yIiwibG9hZGVkIiwibWF0Y2giLCJwYXJhbXMiLCJnZW5lcmFsSW5mbyIsInRhYmxlIiwiZGlzYWJsZVN1Ym1pdCIsImdldEluZm8iLCJBUEkiLCJHRVQiLCJwYXRoIiwicXVlcnkiLCJ0aGVuIiwiZGF0YSIsInN5c19kYl9kaWN0aW9uYXJ5IiwiY2F0Y2giLCJtZXNzYWdlIiwicGlsbHMiLCJnZW5lcmFsIiwiYm9keSIsInJlZiIsIkV4aXN0aW5nUm91dGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJkaXNwbGF5IiwiJCIsIm1vZGFsIiwib25DaG9pY2UiLCJzZXROYXYiLCJuYXZJbm5lclRleHQiLCJuYXZNZXRob2QiLCJuYXZIcmVmIiwibmF2UHJpdiIsIm5hdk1lbnUiLCJuYXZIZWFkZXIiLCJuYXZBY3RpdmUiLCJuYXZJc05vdEFwaSIsIkV4aXN0aW5nUm91dGVzIiwibGlua3MiLCJ1bkF1dGhvcml6ZWQiLCJnZXRMaW5rcyIsImFqYXgiLCJ3aW5kb3ciLCJUSFEiLCJ0b2tlbiIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJlcnIiLCJtYXAiLCJsaW5rIiwiaSIsIlJvdXRlcyIsImdldFJvbGVzIiwiaGlkZU5hdiIsInJvbGVzIiwidGV4dCIsIm5hdklkIiwicm9sZU9wdHMiLCJkZXRhaWxzIiwiZm9yRWFjaCIsInJvbGUiLCJycFByaXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmllbGQiLCJmaWVsZE5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJmaWVsZFZhbHVlIiwic3VibWl0Rm9ybSIsImFjdGlvbiIsImNiIiwicmVzcG9uc2UiLCJuYXZMaW5rc0VudGVyZWQiLCJhbGVydCIsIm5hbWUiLCJjbGFzc05hbWUiLCJzZXRMaW5rIiwiaGFuZGxlT25UeXBlQ2hhbmdlIiwic3VibWl0VXBkYXRlIiwic3VibWl0QWRkIiwiUHJpdlRhYmxlIiwiYWxsUHJpdnMiLCJwcml2Iiwicm93cyIsInVuVXNlZCIsImZpbHRlciIsInByaXZpbGVnZSIsInByaXZzIiwiaW5kZXhPZiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJwSWQiLCJvbkRlbGV0ZSIsIm9uQ2hhbmdlIiwibmV3UHJpdlZhbHVlIiwib25BZGQiLCJSb2xlcyIsInN0YXR1cyIsIm5ld1ByaXYiLCJnZXRQcml2cyIsInJvbGVzRm9ybWF0dGVkIiwiYWxsIiwic3BlY2lmaWNSb2xlIiwidXJsIiwicmVjZWl2ZWRQcml2cyIsIm5ld1ByaXZzIiwib2xkcnBJZCIsImhhbmRsZURlbGV0ZSIsImhhbmRsZUFkZCIsImNvbXBzIiwicm91dGVzIiwidGFibGVzIiwidmlld3MiLCJzdGF0cyIsImdldFN0YXRzIiwib3MiLCJob3N0IiwiT1MiLCJjcHVDb3VudCIsImFyY2hpdGVjdHVyZSIsIm9wZW5NZW0iLCJ0b3RNZW0iLCJkYiIsIk5PREVfRU5WIiwidmVyc2lvbiIsIlZFUlNJT04iLCJwb29sTGltaXQiLCJkYk5hbWUiLCJUYWJsZUdlbmVyYWxJbmZvcm1hdGlvbiIsImZldGNoVGFibGVJbmZvcm1hdGlvbiIsInN5c19kYl9vYmplY3QiLCJzdWJtaXRDaGFuZ2UiLCJnZW5lcmFsSW5mb3JtYXRpb24iLCJyZWxhdGVkRmllbGRzIiwidGFibGVfc3lzX2lkIiwiY29scyIsIlRhYmxlVmlld3MiLCJ3ZXR0eUhlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaGVpZ2h0IiwiVGFicyIsInNlbGVjdGVkVGFiIiwidGFicyIsInRhYiIsInBhZ2VzIiwia2V5Iiwib25TZWxlY3Rpb24iLCJ0aXRsZSIsImNvbXBvbmVudCIsIlRhYiIsInRoaXNLZXkiLCJvbkNsaWNrIiwiVGFiUGFnZSIsImlzSGlkZGVuIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0YsbUJBQVluTSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0ZBQ1RBLEtBRFM7QUFFbEI7Ozs7NkJBRVE7QUFDTCxVQUFNb0gsU0FBUyxHQUFHLEtBQUtwSCxLQUFMLENBQVdvTSxRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLGlCQUFyRDtBQUNBLGFBQU9DLDRDQUFLLENBQUNDLGFBQU4sQ0FBb0IsS0FBS3RNLEtBQUwsQ0FBVytMLFNBQS9CLEVBQTBDO0FBQUMzRSxpQkFBUyxFQUFUQTtBQUFELE9BQTFDLENBQVA7QUFDSDs7OztFQVJpQjFHLCtDOzs7Ozs7Ozs7Ozs7OztBQ3ZFdEI7QUFBQTtBQUFPLFNBQVNtRyxVQUFULE9BQWdEO0FBQUEsTUFBM0JqRCxJQUEyQixRQUEzQkEsSUFBMkI7QUFBQSxNQUFyQmtELE1BQXFCLFFBQXJCQSxNQUFxQjtBQUFBLE1BQWJ2QixNQUFhLFFBQWJBLE1BQWE7QUFBQSxNQUFMd0IsRUFBSyxRQUFMQSxFQUFLO0FBQ25ENUMsR0FBQyxDQUFDZ0IsSUFBRixDQUFPMkIsTUFBUCxFQUFlO0FBQ1h2QixVQUFNLEVBQU5BLE1BRFc7QUFFWGpDLFFBQUksRUFBRWlKLElBQUksQ0FBQ0MsU0FBTCxDQUFlNUksSUFBZixDQUZLO0FBR1g2SSxXQUFPLEVBQUU7QUFDTCxzQkFBZ0I7QUFEWCxLQUhFO0FBTVhqSCxXQUFPLEVBQUUsaUJBQUNsQyxJQUFELEVBQVU7QUFDZnlELFFBQUUsQ0FBQyxJQUFELEVBQU96RCxJQUFQLENBQUY7QUFDSCxLQVJVO0FBU1hiLFNBQUssRUFBRXNFO0FBVEksR0FBZjtBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkgsQyIsImZpbGUiOiIwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IHsgQWRtaW5XaXJlRnJhbWUgfSBmcm9tICcuL05hdmlnYXRpb25Sb2xlcy5qc3gnO1xyXG5pbXBvcnQgQ3VzdG9tZXJzIGZyb20gJy4vQ3VzdG9tZXJzLmpzeCdcclxuaW1wb3J0IHsgRTQwNCB9IGZyb20gJy4vLi4vY29tbW9uL2Vycm9ycy5qc3gnXHJcbmltcG9ydCBXZXR0eSBmcm9tICcuL1dldHR5LmpzeCc7XHJcbmltcG9ydCBVc2VycyBmcm9tICcuL1VzZXJzLmpzeCc7XHJcbmltcG9ydCBVc2VyUHJvZmlsZSBmcm9tICcuLi9ob21lL1VzZXJQcm9maWxlLmpzeCc7XHJcbmltcG9ydCBTdGF0cyBmcm9tICcuL1N0YXRzLmpzeCc7XHJcbmltcG9ydCBDb2x1bW4gZnJvbSAnLi9Db2x1bW4uanN4JztcclxuaW1wb3J0IHsgVGFibGVNb2RpZmllciB9IGZyb20gJy4vVGFibGVNYWludC5qc3gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7IFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTd2l0Y2g+XHJcbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9jdXN0b21lcnNcIiBjb21wb25lbnQ9e0N1c3RvbWVyc30gLz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkbWluL3VzZXJzXCIgY29tcG9uZW50PXtVc2Vyc30gLz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkbWluL3VzZXIvOnVzZXJJZFwiIGNvbXBvbmVudD17VXNlclByb2ZpbGV9IC8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9uYXZyb2xlc1wiIGNvbXBvbmVudD17QWRtaW5XaXJlRnJhbWV9IC8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi93ZXR0eVwiIGNvbXBvbmVudD17V2V0dHl9IC8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9zdGF0c1wiIGNvbXBvbmVudD17U3RhdHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZG1pbi9jb2x1bW4vOnN5c19pZFwiIGNvbXBvbmVudD17Q29sdW1ufSAvPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRtaW4vdGFibGUvOnN5c19pZFwiIGNvbXBvbmVudD17VGFibGVNb2RpZmllcn0gLz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e0U0MDR9IC8+XHJcbiAgICAgICAgICAgIDwvU3dpdGNoPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQaWxscyBmcm9tICcuLi9jb21tb24vUGlsbExheW91dC5qc3gnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vY29tbW9uL1RhYmxlLmpzeCdcclxuaW1wb3J0IHsgRmllbGQsIFNlbGVjdEZpZWxkIH0gZnJvbSAnLi4vY29tbW9uL2Zvcm1zLmpzeCdcclxuaW1wb3J0IEFQSSBmcm9tICcuLi9saWIvQVBJLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5HZW5lcmFsSW5mb3JtYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzeXNfaWQ6IHByb3BzLnN5c19pZCxcclxuICAgICAgICAgICAgZmllbGRzOiB7Li4ucHJvcHMuaW5mb30sXHJcbiAgICAgICAgICAgIG1vZGlmaWVkRmllbGRzOiBbXSxcclxuICAgICAgICAgICAgc2F2ZURpc2FibGVkOiB7ZGlzYWJsZWQ6ICdkaXNhYmxlZCd9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gey4uLnRoaXMuc3RhdGV9XHJcbiAgICAgICAgc3RhdGUuZmllbGRzW2UudGFyZ2V0LmlkXSA9IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgaWYgKCFzdGF0ZS5tb2RpZmllZEZpZWxkcy5pbmNsdWRlcyhlLnRhcmdldC5pZCkpIHN0YXRlLm1vZGlmaWVkRmllbGRzLnB1c2goZS50YXJnZXQuaWQpXHJcbiAgICAgICAgc3RhdGUuc2F2ZURpc2FibGVkID0ge31cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YVR5cGVzID0gW1xyXG4gICAgICAgICAgICAnQ0hBUicsXHJcbiAgICAgICAgICAgICdWQVJDSEFSJyxcclxuICAgICAgICAgICAgJ0lOVCcsXHJcbiAgICAgICAgICAgICdGTE9BVCcsXHJcbiAgICAgICAgICAgICdURVhUJyxcclxuICAgICAgICAgICAgJ0JPT0xFQU4nXHJcbiAgICAgICAgXVxyXG4gICAgICAgIGxldCBsZW5ndGggPSB7fVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnR5cGUgaW4gWydDSEFSJywgJ1ZBUkNIQVInXSkgbGVuZ3RoID0ge3JlYWRPbmx5OiAncmVhZG9ubHknfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8aDQ+IEdlbmVyYWwgSW5mb3JtYXRpb24gPC9oND5cclxuICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLXJvd1wiIG5hbWU9XCJpbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInN5c19pZFwiIHZhbHVlPXt0aGlzLnN0YXRlLnN5c19pZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cImNvbHVtbl9uYW1lXCIgbGFiZWw9XCJDb2x1bW4gTmFtZVwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5jb2x1bW5fbmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC0xMlwiIGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGlkPVwibGFiZWxcIiBsYWJlbD1cIkxhYmVsXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLmxhYmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJ0YWJsZV9uYW1lXCIgbGFiZWw9XCJUYWJsZVwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy50YWJsZV9uYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGlkPVwiaGludFwiIGxhYmVsPVwiSGludFwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5oaW50fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTEyXCIgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdEZpZWxkIGlkPVwidHlwZVwiIGxhYmVsPVwiRGF0YSBUeXBlXCIgdmFsdWU9e3RoaXMuc3RhdGUuZmllbGRzLnR5cGV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtMTJcIiBvcHRzPXtkYXRhVHlwZXN9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJsZW5ndGhcIiBsYWJlbD1cIkxlbmd0aFwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5sZW5ndGh9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSBhdHRyaWJ1dGVzPXtsZW5ndGh9IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC0xMlwiIHR5cGU9XCJudW1iZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9jayBzdWJtaXRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfSBkYXRhLWZvcm09XCJpbmZvXCIgdHlwZT1cImJ1dHRvblwiIHsuLi50aGlzLnN0YXRlLnNhdmVEaXNhYmxlZH0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbHVtblRhYmxlcyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN5c19pZDogcHJvcHMuc3lzX2lkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gey4uLnRoaXMuc3RhdGV9XHJcbiAgICAgICAgc3RhdGUuZmllbGRzW2UudGFyZ2V0LmlkXSA9IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgaWYgKCFzdGF0ZS5tb2RpZmllZEZpZWxkcy5pbmNsdWRlcyhlLnRhcmdldC5pZCkpIHN0YXRlLm1vZGlmaWVkRmllbGRzLnB1c2goZS50YXJnZXQuaWQpXHJcbiAgICAgICAgc3RhdGUuc2F2ZURpc2FibGVkID0ge31cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFibGUgdGFibGU9XCJzeXNfZGJfZGljdGlvbmFyeV9saXN0XCIgYXJncz17e3JlZmVyZW5jZV9pZDogdGhpcy5zdGF0ZS5zeXNfaWR9fS8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN5c19pZDogcHJvcHMubWF0Y2gucGFyYW1zLnN5c19pZCxcclxuICAgICAgICAgICAgZ2VuZXJhbEluZm86IHt9LFxyXG4gICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbl9uYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcclxuICAgICAgICAgICAgICAgIGhpbnQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgdGFibGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJycsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW9kaWZpZWRGaWVsZHM6IHt9LFxyXG4gICAgICAgICAgICBkaXNhYmxlU3VibWl0OiB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluZm8oKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEluZm8oKSB7XHJcbiAgICAgICAgQVBJLkdFVCh7XHJcbiAgICAgICAgICAgIHBhdGg6ICcvYXBpL3Evc3lzX2RiX2RpY3Rpb25hcnkvJyArIHRoaXMuc3RhdGUuc3lzX2lkLFxyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgZmllbGRzOiAnc3lzX2lkLGNvbHVtbl9uYW1lLGxhYmVsLHRhYmxlX25hbWUsaGludCx0eXBlLGxlbmd0aCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHsuLi50aGlzLnN0YXRlfVxyXG4gICAgICAgICAgICBzdGF0ZS5nZW5lcmFsSW5mbyA9IGRhdGEuZGF0YS5zeXNfZGJfZGljdGlvbmFyeVxyXG4gICAgICAgICAgICBzdGF0ZS5sb2FkZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBlLm1lc3NhZ2UsIGxvYWRlZDogdHJ1ZX0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gey4uLnRoaXMuc3RhdGV9XHJcbiAgICAgICAgc3RhdGUuZGlzYWJsZVN1Ym1pdCA9IHt9XHJcbiAgICAgICAgc3RhdGUubW9kaWZpZWRGaWVsZHNbZS50YXJnZXQuaWRdID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICBzdGF0ZS5maWVsZHNbZS50YXJnZXQuaWRdID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdHRlZCcpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHBpbGxzID0ge1xyXG4gICAgICAgICAgICBnZW5lcmFsOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2dlbmVyYWwnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdHZW5lcmFsJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IDxDb2x1bW5HZW5lcmFsSW5mb3JtYXRpb24gaW5mbz17dGhpcy5zdGF0ZS5nZW5lcmFsSW5mb30gc3lzX2lkPXt0aGlzLnN0YXRlLnN5c19pZH0gLz5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVmOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3JlZmVyZW5jZXMnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSZWZlcmVuY2VzJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IDxDb2x1bW5UYWJsZXMgc3lzX2lkPXt0aGlzLnN0YXRlLnN5c19pZH0gLz5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubG9hZGVkICYmIDxQaWxscyBwaWxscz17cGlsbHN9IGhhbmRsZUNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gaGFuZGxlU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0gey4uLnRoaXMuc3RhdGV9IC8+fVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFRhYnMgfSBmcm9tICcuLi9jb21tb24vdGFicy5qc3gnO1xyXG5pbXBvcnQgeyBGaWVsZCwgU2VsZWN0RmllbGQgfSBmcm9tICcuLy4uL2NvbW1vbi9mb3Jtcy5qc3gnXHJcbmltcG9ydCB7IHN1Ym1pdEZvcm0gfSBmcm9tICcuLi9saWIvZm9ybVN1Ym1pc3Npb24uanMnO1xyXG5pbXBvcnQgQWxlcnQgZnJvbSAnLi4vY29tbW9uL2FsZXJ0cy5qc3gnO1xyXG5pbXBvcnQgeyBFNDAxIH0gZnJvbSAnLi4vY29tbW9uL2Vycm9ycy5qc3gnXHJcbmltcG9ydCBBUEkgZnJvbSAnLi4vbGliL0FQSS5qcydcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL2NvbW1vbi9UYWJsZS5qc3gnXHJcbmltcG9ydCBUYWJsZVZpZXdzIGZyb20gJy4vVGFibGVWaWV3cy5qc3gnO1xyXG5pbXBvcnQgUGlsbHMgZnJvbSAnLi4vY29tbW9uL1BpbGxMYXlvdXQuanN4J1xyXG5cclxuY2xhc3MgRXhpc3RpbmdSb3V0ZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgfVxyXG5cclxuICAgIHNldE5hdihlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZUJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRCdXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgJCgnI2V4aXN0aW5nbGlua3MnKS5tb2RhbCgndG9nZ2xlJylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXsoZSkgPT4ge3RoaXMucHJvcHMub25DaG9pY2UoZSwgdGhpcy5wcm9wcyk7IHRoaXMuc2V0TmF2KCl9fT57dGhpcy5wcm9wcy5uYXZJbm5lclRleHR9PC9hPjwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj57dGhpcy5wcm9wcy5uYXZNZXRob2R9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPnt0aGlzLnByb3BzLm5hdkhyZWZ9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPnt0aGlzLnByb3BzLm5hdlByaXZ9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPnt0aGlzLnByb3BzLm5hdk1lbnV9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPnt0aGlzLnByb3BzLm5hdkhlYWRlcn08L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+e3RoaXMucHJvcHMubmF2QWN0aXZlfTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj57dGhpcy5wcm9wcy5uYXZJc05vdEFwaX08L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXhpc3RpbmdSb3V0ZXMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsaW5rczogW251bGxdLFxyXG4gICAgICAgICAgICB1bkF1dGhvcml6ZWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0TGlua3MoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldExpbmtzKCkge1xyXG4gICAgICAgICQuYWpheCgnL2FwaS9hZG1pbi9nZXRBbGxSb3V0ZXM/dG9rZW49JyArIHdpbmRvdy5USFEudG9rZW4sIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogKGxpbmtzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlua3MuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGxpbmtzLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xpbmtzfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRocm93IGVyclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZldGNoKCcvYXBpL2FkbWluL2dldEFsbFJvdXRlcz90b2tlbj0nICsgd2luZG93LlRIUS50b2tlbilcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4obGlua3MgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlua3MuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobGlua3MubWVzc2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xpbmtzfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImV4aXN0aW5nbGlua3NcIiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXhsXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5OYXZpZ2F0aW9uPC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9XCJ0aGVhZC1kYXJrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPklubmVyIFRleHQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+TWV0aG9kPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPkhyZWY8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+UHJpdmlsZWdlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPk1lbnU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+SGVhZGluZzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5BY3RpdmU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+VUk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5saW5rcy5tYXAoKGxpbmssIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPEV4aXN0aW5nUm91dGUgb25DaG9pY2U9e3RoaXMucHJvcHMub25DaG9pY2V9IGtleT17aX0gey4uLmxpbmt9Lz4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvdXRlcyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuZ2V0Um9sZXMoKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGhpZGVOYXY6IHRydWUsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICctLSBOb25lIC0tJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBudWxsLFxyXG4gICAgICAgICAgICBsaW5rOiB7XHJcbiAgICAgICAgICAgICAgICBuYXZBY3RpdmU6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmF2SXNOb3RBcGk6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmF2TWV0aG9kOiAnJyxcclxuICAgICAgICAgICAgICAgIG5hdkhyZWY6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmF2SGVhZGVyOiAnJyxcclxuICAgICAgICAgICAgICAgIG5hdk1lbnU6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmF2UHJpdjogJycsXHJcbiAgICAgICAgICAgICAgICBuYXZJbm5lclRleHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmF2SWQ6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um9sZXMoKSB7XHJcbiAgICAgICAgJC5hamF4KCcvYXBpL2FkbWluL2dldFByaXZzP3Rva2VuPScgKyB3aW5kb3cuVEhRLnRva2VuLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyb2xlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGVzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyb2xlcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VuQXV0aG9yaXplZDogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9sZU9wdHMgPSBbXVxyXG4gICAgICAgICAgICAgICAgcm9sZXMuZGV0YWlscy5mb3JFYWNoKHJvbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVPcHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm9sZS5ycFByaXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJvbGUucnBQcml2XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyb2xlczogcm9sZU9wdHN9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZmV0Y2goJy9hcGkvYWRtaW4vZ2V0UHJpdnM/dG9rZW49JyArIHdpbmRvdy5USFEudG9rZW4pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJvbGVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJvbGVzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJvbGVzLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1bkF1dGhvcml6ZWQ6IHRydWV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByb2xlT3B0cyA9IFtdXHJcbiAgICAgICAgICAgIHJvbGVzLmRldGFpbHMuZm9yRWFjaChyb2xlID0+IHtcclxuICAgICAgICAgICAgICAgIHJvbGVPcHRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb2xlLnJwUHJpdixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByb2xlLnJwUHJpdlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cm9sZXM6IHJvbGVPcHRzfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcclxuICAgICAgICB9KVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT25UeXBlQ2hhbmdlKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT09ICcxJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtoaWRlTmF2OiBmYWxzZX0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGlkZU5hdjogdHJ1ZX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdEFkZCgpIHtcclxuICAgICAgICBsZXQgZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdkxpbmtGb3JtJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKVxyXG4gICAgICAgIGxldCBib2R5O1xyXG4gICAgICAgIGJvZHkgPSB7fVxyXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGZpZWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IGZpZWxkLmlkXHJcbiAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gZmllbGQudmFsdWVcclxuICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWVsZFZhbHVlID09PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHlbZmllbGROYW1lXSA9IGZpZWxkVmFsdWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzdWJtaXRGb3JtKHtcclxuICAgICAgICAgICAgYm9keTogW2JvZHldLFxyXG4gICAgICAgICAgICBhY3Rpb246ICcvYXBpL2FkbWluL2FkZFJvdXRlP3Rva2VuPScgKyB3aW5kb3cuVEhRLnRva2VuLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgXHJcbiAgICAgICAgICAgIGNiOiAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7Y29uc29sZS5lcnJvcihlcnIpfVxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5lcnJvclxyXG4gICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGV0YWlscy5uYXZMaW5rc0VudGVyZWQubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIH19KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfX0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0VXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBmaWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2TGlua0Zvcm0nKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpXHJcbiAgICAgICAgbGV0IGJvZHk7XHJcbiAgICAgICAgYm9keSA9IHt9XHJcbiAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmllbGROYW1lID0gZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgZmllbGQuaWRcclxuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVmFsdWUgPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9keVtmaWVsZE5hbWVdID0gZmllbGRWYWx1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHN1Ym1pdEZvcm0oe1xyXG4gICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICBhY3Rpb246ICcvYXBpL2FkbWluL3VwZGF0ZVJvdXRlP3Rva2VuPScgKyB3aW5kb3cuVEhRLnRva2VuLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgY2I6IChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHthbGVydChlcnIpfVxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5lcnJvclxyXG4gICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH19KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5pZFxyXG4gICAgICAgIGxldCBsaW5rID0gey4uLnRoaXMuc3RhdGUubGlua30gLy8gQ2xvbmUgdGhlIGV4aXN0aW5nIGxpbmtcclxuICAgICAgICBsaW5rW25hbWVdID0gdmFsdWUgLy8gSW5zZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlua30pIC8vIFNldCB0aGUgc3RhdGVcclxuICAgIH1cclxuXHJcbiAgICBzZXRMaW5rKGUsIGxpbmspIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsaW5rfSlcclxuICAgICAgICBpZiAobGluay5uYXZJc05vdEFwaSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtoaWRlTmF2OiBmYWxzZX0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGlkZU5hdjogdHJ1ZX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS51bkF1dGhvcml6ZWQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibmF2TGlua0Zvcm1cIiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lICsgXCIgbS0zXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxFNDAxLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJuYXZMaW5rRm9ybVwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWUgKyBcIiBtLTNcIn0+XHJcbiAgICAgICAgICAgICAgICA8RXhpc3RpbmdSb3V0ZXMgb25DaG9pY2U9e3RoaXMuc2V0TGluay5iaW5kKHRoaXMpfS8+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlICYmIDxBbGVydCBtZXNzYWdlPXt0aGlzLnN0YXRlLm1lc3NhZ2UubWVzc2FnZX0gYWxlcnRUeXBlPXt0aGlzLnN0YXRlLm1lc3NhZ2UudHlwZX0vPn1cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJuYXZJZFwiIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2SWR9Lz5cclxuICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm5hdklubmVyVGV4dFwiIHR5cGU9XCJ0ZXh0XCIgbGFiZWw9XCJJbm5lciBUZXh0IG9mIDxhPiB0YWdcIiB2YWx1ZT17dGhpcy5zdGF0ZS5saW5rLm5hdklubmVyVGV4dH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9PjwvRmllbGQ+XHJcbiAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJuYXZIcmVmXCIgdHlwZT1cInRleHRcIiBsYWJlbD1cIkZ1bGwgUGF0aFwiIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2SHJlZn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9PjwvRmllbGQ+XHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0RmllbGQgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJuYXZNZXRob2RcIiBcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIk1ldGhvZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2TWV0aG9kfSBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgICAgICBvcHRzPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnR0VUJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdQT1NUJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9Lz5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RGaWVsZCBcclxuICAgICAgICAgICAgICAgICAgICBpZD1cIm5hdklzTm90QXBpXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJMaW5rIFR5cGVcIiBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5saW5rLm5hdklzTm90QXBpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdHM9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQVBJJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdOYXZpZ2F0aW9uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBvdGhlckZpZWxkPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHt0aGlzLmhhbmRsZU9uVHlwZUNoYW5nZShlKTsgdGhpcy5oYW5kbGVDaGFuZ2UoZSl9fVxyXG4gICAgICAgICAgICAgICAgPjwvU2VsZWN0RmllbGQ+XHJcbiAgICAgICAgICAgICAgICA8RmllbGQgaXNIaWRkZW49e3RoaXMuc3RhdGUuaGlkZU5hdn0gaWQ9XCJuYXZNZW51XCIgbGFiZWw9XCJSb290IE1lbnVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2TWVudX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9PjwvRmllbGQ+XHJcbiAgICAgICAgICAgICAgICA8RmllbGQgaXNIaWRkZW49e3RoaXMuc3RhdGUuaGlkZU5hdn0gaWQ9XCJuYXZIZWFkZXJcIiBsYWJlbD1cIlN1YkhlYWRpbmdcIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2SGVhZGVyfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0+PC9GaWVsZD5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RGaWVsZCBcclxuICAgICAgICAgICAgICAgICAgICBpZD1cIm5hdlByaXZcIiBcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlByaXZpbGVnZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdHM9e3RoaXMuc3RhdGUucm9sZXN9IFxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyRmllbGQ9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubGluay5uYXZQcml2fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgPjwvU2VsZWN0RmllbGQ+XHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0RmllbGQgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJuYXZBY3RpdmVcIiBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInRydWVcIiBcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkFjdGl2ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmxpbmsubmF2QWN0aXZlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdHM9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJbmFjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSAvPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInVwZGF0ZUJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX0gb25DbGljaz17KCkgPT4ge3RoaXMuc3VibWl0VXBkYXRlKCl9fT5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJzdWJtaXRCdXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5zdWJtaXRBZGQoKX19PlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeSBtbC0yXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2V4aXN0aW5nbGlua3NcIj5FeGlzdGluZzwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByaXZUYWJsZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIGxldCBhbGxQcml2cyA9IFt7XHJcbiAgICAgICAgICAgIHRleHQ6ICctLSBOb25lIC0tJyxcclxuICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgfV1cclxuICAgICAgICBpZiAocHJvcHMuYWxsUHJpdnMpIHtcclxuICAgICAgICAgICAgcHJvcHMuYWxsUHJpdnMubWFwKHByaXYgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxsUHJpdnMucHVzaChwcml2LnJwUHJpdilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgYWxsUHJpdnNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByb3dzID0gW11cclxuICAgICAgICBjb25zdCB1blVzZWQgPSB0aGlzLnByb3BzLmFsbFByaXZzLmZpbHRlcihwcml2aWxlZ2UgPT4gdGhpcy5wcm9wcy5wcml2cy5pbmRleE9mKHByaXZpbGVnZSkgPT09IC0xKVxyXG4gICAgICAgIHRoaXMucHJvcHMucHJpdnNbMF0gIT09IG51bGwgJiYgIHRoaXMucHJvcHMucHJpdnMubWFwKChwcml2KSA9PiB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCg8dHIgc2NvcGU9XCJyb3dcIiBrZXk9e01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX0+XHJcbiAgICAgICAgICAgICAgICA8dGQ+e3RoaXMucHJvcHMucnBJZH08L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPntwcml2fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25EZWxldGV9IGRhdGEtdGFyZ2V0PXtwcml2fT5EZWxldGU8L2E+PC90ZD5cclxuICAgICAgICAgICAgPC90cj4pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9XCJ0aGVhZC1kYXJrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5Sb2xlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+UHJpdjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPk1vZDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAge3Jvd3N9XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyIHNjb3BlPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnJwSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RGaWVsZCBvcHRzPXt1blVzZWR9IGlkPVwibmV3UHJpdlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSB2YWx1ZT17dGhpcy5wcm9wcy5uZXdQcml2VmFsdWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQWRkfSBkYXRhLWZvcj17dGhpcy5wcm9wcy5ycElkfT5BZGQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBSb2xlcyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdHVzOiBudWxsLFxyXG4gICAgICAgICAgICByb2xlczogW3tcclxuICAgICAgICAgICAgICAgIHRleHQ6ICctLSBOb25lIC0tJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgcHJpdnM6IFtudWxsXSxcclxuICAgICAgICAgICAgYWxsUHJpdnM6IFtudWxsXSxcclxuICAgICAgICAgICAgcnBJZDogJycsXHJcbiAgICAgICAgICAgIG5ld1ByaXY6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0Um9sZXMoKVxyXG4gICAgICAgIHRoaXMuZ2V0UHJpdnModHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb2xlcygpIHtcclxuICAgICAgICAkLmFqYXgoJy9hcGkvYWRtaW4vZ2V0Um9sZXM/dG9rZW49JyArIHdpbmRvdy5USFEudG9rZW4sIHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb2xlc0Zvcm1hdHRlZCA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICctLSBOb25lIC0tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGV0YWlscy5tYXAocm9sZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzRm9ybWF0dGVkLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvbGUucnBJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJvbGUucnBJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocm9sZXNGb3JtYXR0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXM6IHJvbGVzRm9ybWF0dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpdnMoYWxsLCBzcGVjaWZpY1JvbGUpIHtcclxuICAgICAgICBsZXQgdXJsID0gJydcclxuICAgICAgICBpZiAoYWxsKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGAvYXBpL2FkbWluL2dldFByaXZzP3Rva2VuPSR7d2luZG93LlRIUS50b2tlbn1gXHJcbiAgICAgICAgfSBlbHNlIGlmKHNwZWNpZmljUm9sZSkge1xyXG4gICAgICAgICAgICB1cmwgPSBgL2FwaS9hZG1pbi9nZXRQcml2cz9yb2xlPSR7c3BlY2lmaWNSb2xlfSZ0b2tlbj0ke3dpbmRvdy5USFEudG9rZW59YFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCA9IGAvYXBpL2FkbWluL2dldFByaXZzP3JvbGU9JHt0aGlzLnN0YXRlLnJwSWR9JnRva2VuPSR7d2luZG93LlRIUS50b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQuYWpheCh1cmwsIHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY2VpdmVkUHJpdnMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRldGFpbHMubWFwKHByaXYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlZFByaXZzLnB1c2gocHJpdi5ycFByaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUHJpdnM6IHJlY2VpdmVkUHJpdnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZzOiByZWNlaXZlZFByaXZzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGVyclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGVsZXRlKGUpIHtcclxuICAgICAgICBsZXQgcnBQcml2ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXHJcbiAgICAgICAgJC5hamF4KGAvYXBpL2FkbWluL3JvbGVzL3JlbW92ZT9ycElkPSR7dGhpcy5zdGF0ZS5ycElkfSZycFByaXY9JHtycFByaXZ9JnRva2VuPSR7d2luZG93LlRIUS50b2tlbn1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiB0cnVlLCBzdGF0dXM6IHJlc3BvbnNlLm1lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UHJpdnMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByaXYgb2YgdGhpcy5zdGF0ZS5yb2xlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpdi5ycFByaXYgPT0gcnBQcml2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UHJpdnMucHVzaChwcml2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBmYWxzZSwgc3RhdHVzOiByZXNwb25zZS5tZXNzYWdlLCBwcml2czogbmV3UHJpdnN9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IHRydWUsIHN0YXR1czogJ0NvdWxkIG5vdCByZW1vdmUgbGluay4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlcid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBZGQoZSkge1xyXG4gICAgICAgIGxldCBycElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpXHJcbiAgICAgICAgbGV0IHJwUHJpdiA9IHRoaXMuc3RhdGUubmV3UHJpdlxyXG4gICAgICAgIGlmIChycElkICYmIHJwUHJpdikge1xyXG4gICAgICAgICAgICAkLmFqYXgoYC9hcGkvYWRtaW4vcm9sZXMvYWRkP3JwSWQ9JHtycElkfSZycFByaXY9JHtycFByaXZ9JnRva2VuPSR7d2luZG93LlRIUS50b2tlbn1gLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcml2cyA9IHRoaXMuc3RhdGUucHJpdnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpdnMucHVzaChycFByaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpdnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogJ01pc3Npbmcgcm9sZSBvciBwcml2J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5pZFxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSlcclxuICAgICAgICBpZiAobmFtZSA9PT0gJ3JwSWQnICYmIHZhbHVlICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHByaXZzIGZvciAnLCB2YWx1ZSlcclxuICAgICAgICAgICAgdGhpcy5nZXRQcml2cyhmYWxzZSwgdmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWUgKyBcIiBtLTNcIn0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zdGF0dXMgJiYgPEFsZXJ0IG1lc3NhZ2U9e3RoaXMuc3RhdGUuc3RhdHVzfSBhbGVydFR5cGU9e3RoaXMuc3RhdGUuZXJyb3IgPyAnZGFuZ2VyJyA6ICdzdWNjZXNzJ30gLz59XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwib2xkcnBJZFwiIHZhbHVlPXt0aGlzLnN0YXRlLm9sZHJwSWR9Lz5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RGaWVsZCBpZD1cInJwSWRcIiBvcHRzPXt0aGlzLnN0YXRlLnJvbGVzfSB2YWx1ZT17dGhpcy5zdGF0ZS5ycElkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gb3RoZXJGaWVsZD17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUucHJpdnNbMF0gIT09IG51bGwgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgPFByaXZUYWJsZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpdnM9e3RoaXMuc3RhdGUucHJpdnN9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxQcml2cz17dGhpcy5zdGF0ZS5hbGxQcml2c30gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmhhbmRsZURlbGV0ZS5iaW5kKHRoaXMpfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25BZGQ9e3RoaXMuaGFuZGxlQWRkLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJwSWQ9e3RoaXMuc3RhdGUucnBJZH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQcml2VmFsdWU9e3RoaXMuc3RhdGUubmV3UHJpdn1cclxuICAgICAgICAgICAgICAgICAgICAvPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIEFkbWluV2lyZUZyYW1lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZmllbGRzOiB0aGlzLnByb3BzLmZpZWxkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIGxldCBmaWVsZHMgPSB7Li4udGhpcy5zdGF0ZS5maWVsZHN9XHJcbiAgICAgICAgbGV0IG1vZGlmaWVkRmllbGRzID0gdGhpcy5zdGF0ZS5tb2RpZmllZEZpZWxkc1xyXG4gICAgICAgIGZpZWxkc1tlLnRhcmdldC5pZF0gPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgIGlmIChtb2RpZmllZEZpZWxkcy5pbmRleE9mKGUudGFyZ2V0LmlkKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgbW9kaWZpZWRGaWVsZHMucHVzaChlLnRhcmdldC5pZClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmllbGRzLCBtb2RpZmllZEZpZWxkc30pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjb21wcyA9IHtcclxuICAgICAgICAgICAgcm91dGVzOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3JvdXRlcycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1JvdXRlcycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiA8Um91dGVzLz5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAncm9sZXMnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSb2xlcycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiA8Um9sZXMvPlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJsZXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAndGFibGVzJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVGFibGVzJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IDxUYWJsZSB0YWJsZT1cInN5c19kYl9vYmplY3RfbGlzdFwiIGhpZGVBY3Rpb25zPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICd2aWV3cycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvbHVtbnMnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogPFRhYmxlIHRhYmxlPVwic3lzX2RiX2RpY3Rpb25hcnlfbGlzdFwiIHBlclBhZ2U9ezE1fSBjb2xzPXtbJ2NvbHVtbl9uYW1lJywnbGFiZWwnLCd0YWJsZV9uYW1lJywgJ2hpbnQnLCAnY29sX29yZGVyJ119IC8+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxQaWxscyBwaWxscz17Y29tcHN9IGhhbmRsZUNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgQWRtaW5XaXJlRnJhbWUgfVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQVBJIGZyb20gJy4vLi4vbGliL0FQSS5qcydcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLy4uL2NvbW1vbi9mb3Jtcy5qc3gnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0YXRzOiBudWxsLFxyXG4gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0U3RhdHMoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0YXRzKCkge1xyXG4gICAgICAgIEFQSS5HRVQoe3BhdGg6ICcvc3RhdHMnfSlcclxuICAgICAgICAudGhlbihzdGF0cyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRzKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0cywgbG9hZGVkOiB0cnVlfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2FkZWQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbS01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNiBjb2wtbWQtOCBjb2wtc20tMTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5TZXJ2ZXIgU3RhdHVzPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgaWQ9XCJjcHVDb3VudFwiIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXRzLm9zLmhvc3R9IGxhYmVsPVwiTm9kZSBIb3N0bmFtZVwiIHR5cGU9XCJ0ZXh0XCIgYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXRzLm9zLk9TfSBsYWJlbD1cIk9wZXJhdGluZyBTeXN0ZW1cIiB0eXBlPVwidGV4dFwiIGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0cy5vcy5jcHVDb3VudH0gbGFiZWw9XCJDUFUgQ291bnRcIiB0eXBlPVwidGV4dFwiIGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cImFyY2hpdGVjdHVyZVwiIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXRzLm9zLmFyY2hpdGVjdHVyZX0gbGFiZWw9XCJBcmNoaXRlY3R1cmVcIiB0eXBlPVwidGV4dFwiIGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgdmFsdWU9e35+KHRoaXMuc3RhdGUuc3RhdHMub3Mub3Blbk1lbSAvIDFlKzYpfSBsYWJlbD1cIkF2YWlsYWJsZSBNZW1vcnkgKE1CKVwiIHR5cGU9XCJ0ZXh0XCIgYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBpZD1cIm9wZW5NZW1cIiB2YWx1ZT17fn4odGhpcy5zdGF0ZS5zdGF0cy5vcy50b3RNZW0gLyAxZSs2KX0gbGFiZWw9XCJUb3RhbCBNZW1vcnkgKE1CKVwiIHR5cGU9XCJ0ZXh0XCIgYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0cy5kYi5OT0RFX0VOVn0gbGFiZWw9XCJOb2RlIEVudmlyb25tZW50XCIgdHlwZT1cInRleHRcIiBhdHRyaWJ1dGVzPXt7cmVhZE9ubHk6ICdyZWFkb25seSd9fS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkRhdGFiYXNlIFN0YXR1czwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXRzLmRiLnZlcnNpb25bMF0uVkVSU0lPTn0gbGFiZWw9XCJWZXJzaW9uXCIgdHlwZT1cInRleHRcIiBhdHRyaWJ1dGVzPXt7cmVhZE9ubHk6ICdyZWFkb25seSd9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgdmFsdWU9e3RoaXMuc3RhdGUuc3RhdHMuZGIucG9vbExpbWl0fSBsYWJlbD1cIlBvb2wgTGltaXRcIiB0eXBlPVwidGV4dFwiIGF0dHJpYnV0ZXM9e3tyZWFkT25seTogJ3JlYWRvbmx5J319Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0cy5kYi5kYk5hbWV9IGxhYmVsPVwiRGF0YWJhc2UgTmFtZVwiIHR5cGU9XCJ0ZXh0XCIgYXR0cmlidXRlcz17e3JlYWRPbmx5OiAncmVhZG9ubHknfX0vPlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGlsbHMgZnJvbSAnLi8uLi9jb21tb24vUGlsbExheW91dC5qc3gnXHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vY29tbW9uL2Zvcm1zLmpzeCc7XHJcbmltcG9ydCBBUEkgZnJvbSAnLi4vbGliL0FQSS5qcyc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9jb21tb24vVGFibGUuanN4J1xyXG5cclxuY2xhc3MgVGFibGVHZW5lcmFsSW5mb3JtYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3lzX2lkOiBwcm9wcy5zeXNfaWQsXHJcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mZXRjaFRhYmxlSW5mb3JtYXRpb24oKVxyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVGFibGVJbmZvcm1hdGlvbigpIHtcclxuICAgICAgICBBUEkuR0VUKHtwYXRoOiAnL2FwaS9xL3N5c19kYl9vYmplY3QvJyArIHRoaXMuc3RhdGUuc3lzX2lkfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkczogcmVzcG9uc2UuZGF0YS5zeXNfZGJfb2JqZWN0IHx8IHt9LCBsb2FkZWQ6IHRydWV9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICB0aHJvdyBlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHsuLi50aGlzLnN0YXRlfVxyXG4gICAgICAgIHN0YXRlLmZpZWxkc1tlLnRhcmdldC5pZF0gPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0Q2hhbmdlKGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJMYWJlbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmZpZWxkcy5sYWJlbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIk5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5maWVsZHMubmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IHJlYWRPbmx5PVwicmVhZG9ubHlcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1wiIG9uQ2xpY2s9e3RoaXMuc3VibWl0Q2hhbmdlLmJpbmQodGhpcyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlTW9kaWZpZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzeXNfaWQ6IHByb3BzLm1hdGNoLnBhcmFtcy5zeXNfaWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHBpbGxzID0ge1xyXG4gICAgICAgICAgICAvKiogICAgICAgICAgICByb2xlczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdyb2xlcycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1JvbGVzJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IDxSb2xlcy8+XHJcbiAgICAgICAgICAgIH0sICovXHJcbiAgICAgICAgICAgIGdlbmVyYWxJbmZvcm1hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdnZW5lcmFsJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnR2VuZXJhbCBJbmZvJyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IDxUYWJsZUdlbmVyYWxJbmZvcm1hdGlvbiBzeXNfaWQ9e3RoaXMuc3RhdGUuc3lzX2lkfS8+XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlbGF0ZWRGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAncmVsYXRlZCcsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpZWxkcycsXHJcbiAgICAgICAgICAgICAgICBib2R5OiA8VGFibGUgdGFibGU9XCJzeXNfZGJfZGljdGlvbmFyeV9saXN0XCIgYXJncz17e3RhYmxlX3N5c19pZDogdGhpcy5zdGF0ZS5zeXNfaWR9fSAvPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQaWxscyBwaWxscz17cGlsbHN9IC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb2x1bW4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjb2xzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBwaWxscyA9IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQaWxscyAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9jb21tb24vVGFibGUuanN4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlVmlld3MgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7cmV0dXJuIDxUYWJsZSB0YWJsZT1cInN5c19kYl9kaWN0aW9uYXJ5X2xpc3RcIiAvPn1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgV2V0dHkgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblx0Y29uc3Qgd2V0dHlIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKSAtICggJCgnbmF2JylbMF0uY2xpZW50SGVpZ2h0ICsgJCgnZm9vdGVyJylbMF0uY2xpZW50SGVpZ2h0ICkgXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICBcdDxpZnJhbWUgc3JjPVwiL3dldHR5XCIgY2xhc3NOYW1lPVwid2V0dHlcIiBzdHlsZT17e2hlaWdodDogd2V0dHlIZWlnaHQgKyAncHgnfX0vPlxyXG5cdFx0PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2V0dHlcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5cclxuY2xhc3MgVGFicyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVGFiOiAndGFiMCcsXHJcbiAgICAgICAgICAgIHRhYnM6IHByb3BzLnRhYnNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3Rpb24odGFiLCBlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRUYWI6IHRhYn0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB0YWJzID0gW11cclxuICAgICAgICBsZXQgcGFnZXMgPSBbXVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhYnMpIHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IDBcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy50YWJzLmZvckVhY2godGFiID0+IHtcclxuICAgICAgICAgICAgICAgIHRhYnMucHVzaCg8VGFiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1widGFiXCIgKyBrZXl9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblNlbGVjdGlvbi5iaW5kKHRoaXMsIFwidGFiXCIgKyBrZXkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWI9e3RoaXMuc3RhdGUuc2VsZWN0ZWRUYWJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dGFiLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0tleT17XCJ0YWJcIiArIGtleX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+KVxyXG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaCg8VGFiUGFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJwYWdldGFiXCIgKyBrZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PXt0YWIuY29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUGFnZT17XCJwYWdldGFiXCIgKyB0aGlzLnN0YXRlLnNlbGVjdGVkVGFifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuPXshKFwicGFnZVwiICsgdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYiA9PT0gXCJwYWdldGFiXCIgKyBrZXkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4pXHJcbiAgICAgICAgICAgICAgICBrZXkrK1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIG1sLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWJzfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3BhZ2VzfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYWIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgaWQ9e3RoaXMucHJvcHMudGhpc0tleX0gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT5cclxuICAgICAgICAgICAgICAgIDxhIFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5zZWxlY3RlZFRhYiAhPT0gdGhpcy5wcm9wcy50aGlzS2V5ID8gJ25hdi1saW5rJyA6ICduYXYtbGluayBhY3RpdmUnfSBcclxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIFxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiUGFnZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pc0hpZGRlbiA/ICd0YWItcGFnZScgOiAndGFiLXBhZ2UgYWN0aXZlJ1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LCB7Y2xhc3NOYW1lfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVGFicyB9IiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRGb3JtKHtib2R5LCBhY3Rpb24sIG1ldGhvZCwgY2J9KSB7XHJcbiAgICAkLmFqYXgoYWN0aW9uLCB7XHJcbiAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdBcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY2IobnVsbCwgZGF0YSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBjYlxyXG4gICAgfSlcclxuICAgIC8qXHJcbiAgICBmZXRjaChhY3Rpb24sIHtcclxuICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgfSlcclxuICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgIH0pXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBjYihudWxsLCBkYXRhKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNiKGVycilcclxuICAgIH0pXHJcbiAgICAqL1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==