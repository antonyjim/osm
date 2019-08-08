(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/admin/Column.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Column; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_PillLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/PillLayout.tsx");
/* harmony import */ var _common_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/common/Table/index.tsx");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _ColumnInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/admin/ColumnInfo.tsx");


var _jsxFileName = "/var/www/osm/clientApp/src/admin/Column.tsx";






function ColumnTables(props) {
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_Table__WEBPACK_IMPORTED_MODULE_4__["Table"], {
    table: "sys_db_dictionary_list",
    args: {
      reference_id: props.sys_id
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  });
}

function Column(props) {
  // @ts-ignore
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    error: '',
    sys_id: props.match.params.id,
    generalInfo: {},
    modifiedFields: {},
    disableSubmit: true,
    fields: ['sys_id', 'column_name', 'label', 'table_name', 'hint', 'type', 'len', 'readonly', 'default_view', 'nullable', 'reference_id', 'table_name_display', 'reference_id_display', 'required_on_update', 'required_on_create'],
    loaded: props.match.params.id !== 'new' ? false : true
  }),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  function getInfo() {
    _lib_API__WEBPACK_IMPORTED_MODULE_5__["default"].get({
      path: '/api/q/sys_db_dictionary/' + state.sys_id,
      query: {
        fields: state.fields.join(',')
      }
    }).then(function (data) {
      var newState = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state);

      newState.generalInfo = data.data.sys_db_dictionary;
      newState.loaded = true;
      setState(newState);
    }).catch(function (e) {
      setState(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        error: e.message,
        loaded: true
      }));
      console.error(e);
    });
  }

  function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      var newState = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state);

      newState.disableSubmit = false;
      newState.modifiedFields[e.target.id] = e.target.value;
      newState.fields[e.target.id] = e.target.value;
      setState(newState);
    }
  }

  function handleSubmit(e) {
    console.log('submitted');
  }

  var pills = {
    general: {
      id: 'general',
      label: 'General',
      body: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ColumnInfo__WEBPACK_IMPORTED_MODULE_6__["ColumnGeneralInformation"], {
        info: state.generalInfo,
        sys_id: state.sys_id,
        fields: state.fields,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      })
    },
    ref: {
      id: 'references',
      label: 'References',
      body: react__WEBPACK_IMPORTED_MODULE_2__["createElement"](ColumnTables, {
        sys_id: state.sys_id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      })
    }
  };
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (props.match.params.id !== 'new') {
      getInfo();
    }
  }, [props.match.params.id]);
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, state.loaded && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_PillLayout__WEBPACK_IMPORTED_MODULE_3__["default"], Object.assign({
    pills: pills
  }, state, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: this
  })));
}

/***/ }),

/***/ "./src/admin/ColumnInfo.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnGeneralInformation", function() { return ColumnGeneralInformation; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/common/FormControls/index.tsx");








var _jsxFileName = "/var/www/osm/clientApp/src/admin/ColumnInfo.tsx";




var ColumnGeneralInformation =
/*#__PURE__*/
function (_Component) {
  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(ColumnGeneralInformation, _Component);

  function ColumnGeneralInformation(props) {
    var _this;

    Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, ColumnGeneralInformation);

    _this = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(ColumnGeneralInformation).call(this, props));
    _this.state = {
      sys_id: props.sys_id,
      fields: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, props.info),
      modifiedFields: [],
      saveDisabled: {
        disabled: 'disabled'
      }
    };
    return _this;
  }

  Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(ColumnGeneralInformation, [{
    key: "handleChange",
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var prevState = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, this.state);

        prevState.fields[e.target.id] = e.target.value;

        if (e.target.type === 'checkbox') {
          prevState.fields[e.target.id] = e.target.checked;
        }

        if (!prevState.modifiedFields.includes(e.target.id)) {
          prevState.modifiedFields.push(e.target.id);
        }

        prevState.saveDisabled = {};
        this.setState(prevState);
      }
    }
  }, {
    key: "setReference",
    value: function setReference(updatedRef) {
      this.setState({
        sys_id: this.state.sys_id,
        fields: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, this.state.fields, Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, updatedRef.field, updatedRef.newValue)),
        modifiedFields: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(this.state.fields),
        saveDisabled: Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, this.state.disabled)
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      if (this.props.sys_id === 'new') {
        this.createNew();
      } else {
        var body = {
          sys_id: this.state.sys_id
        };
        this.state.modifiedFields.forEach(function (field) {
          body[field] = _this2.state.fields[field];
        });
        _lib_API__WEBPACK_IMPORTED_MODULE_9__["default"].patch({
          path: '/api/q/sys_db_dictionary/' + this.state.sys_id,
          body: body,
          query: {
            fields: this.props.fields.join(',')
          }
        }).then(function (res) {
          console.log(res);
        }).catch(function (err) {
          _this2.props.handleErrorMessage(err);
        });
      }
    }
  }, {
    key: "createNew",
    value: function createNew() {
      _lib_API__WEBPACK_IMPORTED_MODULE_9__["default"].post({
        path: '/api/q/sys_db_dictionary',
        query: {
          fields: this.props.fields.join(',')
        },
        body: this.state.fields
      }).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var dataTypes = ['CHAR', 'VARCHAR', 'INT', 'FLOAT', 'TEXT', 'BOOLEAN'];
      var length = {};
      var colNameReadonly = {};

      if (!(this.state.type in ['CHAR', 'VARCHAR'])) {
        length = {
          readOnly: 'readonly'
        };
      }

      if (this.props.sys_id !== 'new') colNameReadonly = {
        readOnly: 'readonly'
      };
      return react__WEBPACK_IMPORTED_MODULE_8__["createElement"](react__WEBPACK_IMPORTED_MODULE_8__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("h4", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, " General Information "), react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("form", {
        className: "form-row",
        name: "info",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("input", {
        type: "hidden",
        id: "sys_id",
        value: this.state.sys_id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "column_name",
        name: "column_name",
        label: "Column Name",
        value: this.state.fields.column_name,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        attributes: colNameReadonly,
        type: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "label",
        name: "label",
        label: "Label",
        value: this.state.fields.label,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Reference"], {
        id: "table_name",
        name: "table_name",
        label: "Table",
        value: this.state.fields.table_name,
        display: this.state.fields.table_name_display,
        setReference: this.setReference,
        className: "col-lg-6 col-md-12",
        references: "sys_db_object",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "hint",
        name: "hint",
        label: "Hint",
        value: this.state.fields.hint,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["SelectField"], {
        id: "type",
        label: "Data Type",
        value: this.state.fields.type,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        opts: dataTypes,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "len",
        name: "len",
        label: "Length",
        value: this.state.fields.len,
        onChange: this.handleChange.bind(this),
        attributes: length,
        className: "col-lg-6 col-md-12",
        type: "number",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Reference"], {
        id: "reference_id",
        name: "reference_id",
        label: "References",
        value: this.state.fields.reference_id,
        display: this.state.fields.reference_id_display,
        setReference: this.setReference,
        className: "col-lg-6 col-md-12",
        references: "sys_db_dictionary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "enum",
        name: "enum",
        label: "Enum",
        value: this.state.fields.enum,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Field"], {
        id: "col_order",
        name: "col_order",
        label: "Col Order",
        value: this.state.fields.col_order,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        type: "number",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "readonly",
        name: "readonly",
        label: "Readonly",
        checked: this.state.fields.readonly,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 200
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "nullable",
        name: "nullable",
        label: "Nullable",
        checked: this.state.fields.nullable,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "update_key",
        name: "update_key",
        label: "Primary Key",
        checked: this.state.fields.update_key,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 216
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "default_view",
        name: "default_view",
        label: "Show as Default",
        checked: this.state.fields.default_view,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "visible",
        name: "visible",
        label: "Show On Forms",
        checked: this.state.fields.visible,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "required_on_create",
        name: "required_on_create",
        label: "Require For Creation",
        checked: this.state.fields.required_on_create,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "required_on_update",
        name: "required_on_update",
        label: "Require For Update",
        checked: this.state.fields.required_on_update,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 248
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_10__["Checkbox"], {
        id: "display_field",
        name: "display_field",
        label: "Display As Link",
        value: this.state.fields.display_field,
        onChange: this.handleChange.bind(this),
        className: "col-lg-6 col-md-12",
        checked: this.state.fields.display_field,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 256
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("button", Object.assign({
        className: "btn btn-primary btn-block submit",
        onClick: this.handleSubmit.bind(this),
        "data-form": "info",
        type: "button"
      }, this.state.saveDisabled, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 265
        },
        __self: this
      }), "Save")));
    }
  }]);

  return ColumnGeneralInformation;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map