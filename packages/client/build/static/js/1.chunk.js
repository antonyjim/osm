(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/admin/Admin.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Admin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _common_Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/Errors.tsx");
/* harmony import */ var _Wetty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/admin/Wetty.tsx");
/* harmony import */ var _Stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/admin/Stats.tsx");
var _jsxFileName = "/var/www/osm/clientApp/src/admin/Admin.tsx";

 // import { AdminWireFrame } from './NavigationRoles'




function Admin() {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/admin/wetty",
    component: _Wetty__WEBPACK_IMPORTED_MODULE_3__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/admin/stats",
    component: _Stats__WEBPACK_IMPORTED_MODULE_4__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    component: _common_Errors__WEBPACK_IMPORTED_MODULE_2__["E404"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }));
}

/***/ }),

/***/ "./src/admin/Stats.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stats; });
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_API__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/API.ts");
/* harmony import */ var _common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/common/FormControls/TextField.tsx");


var _jsxFileName = "/var/www/osm/clientApp/src/admin/Stats.tsx";



function Stats() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"]({
    os: {
      cpuCount: 0,
      architecture: '',
      openMem: 0,
      totMem: 0,
      host: '',
      OS: '',
      processMem: {
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        external: 0
      }
    },
    db: {
      poolLimit: 0,
      dbName: '',
      NODE_ENV: '',
      version: [{}] // version: { VERSION: string }[]

    }
  }),
      _React$useState2 = Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      stats = _React$useState2[0],
      setStats = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    _lib_API__WEBPACK_IMPORTED_MODULE_3__["default"].get({
      path: '/stats'
    }).then(function (serverStats) {
      console.log(serverStats);
      setStats(Object(_var_www_osm_clientApp_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, serverStats, {
        loaded: true
      }));
    }).catch(function (err) {
      console.error(err);
    });
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, stats && stats.loaded && react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "row m-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col-lg-6 col-md-8 col-sm-11",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, "Server Status"), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    id: "cpuCount",
    name: "cpuCount",
    value: stats.os.host,
    label: "Node Hostname",
    type: "text",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.os.OS,
    label: "Operating System",
    name: "os",
    type: "text",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.os.cpuCount,
    label: "CPU Count",
    type: "text",
    name: "cpu",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    name: "architecture",
    value: stats.os.architecture,
    label: "Architecture",
    type: "text",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: ~~(stats.os.openMem / 1e6),
    label: 'Available Memory (MB) (' + ~~(~~(stats.os.openMem / 1e6) / ~~(stats.os.totMem / 1e6) * 100) + '%)',
    name: "open",
    type: "text",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: ~~(stats.os.processMem.rss / 1e6),
    label: 'Memory Used By Node (' + ~~(~~(stats.os.processMem.rss / 1e6) / ~~(stats.os.totMem / 1e6) * 100) + '%)',
    name: "used",
    type: "text",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    id: "openMem",
    value: ~~(stats.os.totMem / 1e6),
    label: "Total Memory (MB)",
    type: "text",
    name: "openMem",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.db.NODE_ENV,
    label: "Node Environment",
    type: "text",
    name: "env",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    },
    __self: this
  }, "Database Status"), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.db.version[0].VERSION,
    label: "Version",
    type: "text",
    name: "dbVersion",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.db.poolLimit,
    label: "Pool Limit",
    type: "text",
    name: "poolLimit",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_common_FormControls_TextField__WEBPACK_IMPORTED_MODULE_4__["Field"], {
    value: stats.db.dbName,
    label: "Database Name",
    type: "text",
    name: "dbName",
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152
    },
    __self: this
  })));
}

/***/ }),

/***/ "./src/admin/Wetty.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/var/www/osm/clientApp/src/admin/Wetty.tsx";
 // import $ from 'jquery'

function Wetty() {
  var wettyHeight = window.innerHeight - ($('nav')[0].clientHeight + $('footer')[0].clientHeight);
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("iframe", {
    src: "/wetty",
    className: "wetty",
    style: {
      height: wettyHeight + 'px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (Wetty);

/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map