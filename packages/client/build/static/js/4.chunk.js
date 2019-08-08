(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/admin/Hook.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hook; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_FormControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/FormControls/index.tsx");
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_Monaco__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/Monaco.tsx");


var _jsxFileName = "/var/www/osm/clientApp/src/admin/Hook.tsx";




function Hook(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    hook: '',
    hook_table: '',
    sys_id: props.match.params.id,
    table: 'sys_db_hook',
    description: '',
    hook_table_display: '',
    code: "#!/bin/env/node\n/**\n * Script hook for {HOOK GOES HERE} on table {TABLE NAME GOES HERE}\n * \n * The Towel API should provide everything that is needed to verify any fields.\n * Documentation can be found at /public/docs/Towel.md\n * \n * Please follow best practices when coding, making sure to use JSDOC comments\n * whenever possible. JSDOC documentation can be found at https://devdocs.io/jsdoc/\n * \n * NOTE: This script will run in an isolated environment. You cannot call on any\n * standard node modules or NPM modules. This script will be called using the Function()\n * constructor and will be passed the folowing 2 parameters:\n * \n * @param {string} sysId The ID of the record being modified\n * @param {object} incomingFields The fields that are in the request body (if applicable)\n * \n * If this function throws any errors, the request will be aborted and returned to the client\n * with an error 500 response. This function should return an object with the following keys:\n * \n * @returns {status: string, confirmedFields: object, warnings: object | object[]}\n */\nvar Towel = require('./../towel')\n\nmodule.exports = function(sysId, action, incomingFields) {\n  this.status = 'OK'\n  this.confirmedFields = {...incomingFields}\n  this.warnings = []\n\n  // Do stuff\n\n  return this\n}\n"
  }),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      hookInfo = _React$useState2[0],
      setHookInfo = _React$useState2[1];

  var getData = function getData() {
    new _lib_API__WEBPACK_IMPORTED_MODULE_4__["TowelRecord"](hookInfo.table).get({
      fields: 'hook_table,hook,code,description,sys_id,hook_table_display',
      id: hookInfo.sys_id
    }).then(function (res) {
      if (res && res.data && res.data[hookInfo.table]) {
        var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, hookInfo);

        for (var field in res.data[hookInfo.table]) {
          // if (field === 'code') {
          //   window.monaco.editor
          //     .getModels()[0]
          //     .setValue(res.data[hookInfo.table][field])
          //   state[field] = res.data[hookInfo.table][field]
          // } else {
          if (res.data[hookInfo.table][field]) {
            state[field] = res.data[hookInfo.table][field];
          } // }

        }

        setHookInfo(state);
      }
    }).catch(function (err) {
      console.error(err);
    });
  };

  var handleChange = function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, hookInfo);

      state[e.target.name] = e.target.value;
      setHookInfo(state); // setHookInfo({ [e.target.name]: e.target.value })
    }
  };

  var setReference = function setReference(updatedRef) {
    var state = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, hookInfo);

    state[updatedRef.field] = updatedRef.newValue;
    setHookInfo(state);
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var TowelQuery;

    if (props.match.params.id === 'new') {
      TowelQuery = new _lib_API__WEBPACK_IMPORTED_MODULE_4__["TowelRecord"]('sys_db_hook').create({
        description: hookInfo.description,
        hook_table: hookInfo.hook_table,
        hook: hookInfo.hook,
        code: getEditorValue()
      }, 'hook_table,hook,code,description,sys_id');
    } else {
      TowelQuery = new _lib_API__WEBPACK_IMPORTED_MODULE_4__["TowelRecord"]('sys_db_hook').update(props.match.params.id, {
        description: hookInfo.description,
        hook_table: hookInfo.hook_table,
        hook: hookInfo.hook,
        code: getEditorValue()
      });
    }

    TowelQuery.then(function (res) {
      if (res.okay() || res.status === 204) {
        console.log('Created or updated');
      }
    }).catch(function (err) {
      console.error(err);
    });
  };

  var getEditorValue = function getEditorValue() {
    return window.monaco.editor.getModels()[0].getValue();
  };

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (props.match.params.id !== 'new') getData();
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("form", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col-lg-10 col-md-8 mt-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("button", {
    className: "btn btn-primary float-right",
    onClick: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152
    },
    __self: this
  }, "Save"), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h4", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155
    },
    __self: this
  }, "Hook"), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"], {
    id: "description",
    type: "text",
    name: "description",
    onChange: handleChange,
    value: hookInfo.description,
    className: "col-lg-6 col-md-12",
    label: "Description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Reference"], {
    id: "hook_table",
    name: "hook_table",
    label: "Table",
    value: hookInfo.hook_table,
    display: hookInfo.hook_table_display,
    setReference: setReference,
    className: "col-lg-6 col-md-12",
    references: "sys_db_object",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls__WEBPACK_IMPORTED_MODULE_3__["Field"], {
    id: "hook",
    name: "hook",
    type: "text",
    onChange: handleChange,
    value: hookInfo.hook,
    className: "col-lg-6 col-md-12",
    label: "Hook",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177
    },
    __self: this
  }), hookInfo.code && react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_Monaco__WEBPACK_IMPORTED_MODULE_5__["Monaco"], {
    value: hookInfo.code,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189
    },
    __self: this
  }));
}

/***/ })

}]);
//# sourceMappingURL=4.chunk.js.map