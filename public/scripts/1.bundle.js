(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/client/view/common/rbac.jsx":
/*!*****************************************!*\
  !*** ./src/client/view/common/rbac.jsx ***!
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



var Can =
/*#__PURE__*/
function (_Component) {
  _inherits(Can, _Component);

  function Can(props) {
    var _this;

    _classCallCheck(this, Can);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Can).call(this, props));
    _this.state = {
      privs: window.THQ.user.privs || []
    };
    document.addEventListener('thq.receivedNav', function (e) {
      _this.setState({
        privs: window.THQ.user.privs
      });
    });
    return _this;
  }

  _createClass(Can, [{
    key: "validate",
    value: function validate() {
      if (this.props.role && this.state.privs && this.state.privs.indexOf(this.props.role) > -1) {
        return true;
      } else if (this.props.if) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var shouldRender = this.validate();

      if (shouldRender) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.props.children);
      } else {
        return null;
      }
    }
  }]);

  return Can;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Can);

/***/ }),

/***/ "./src/client/view/home/dashboard.jsx":
/*!********************************************!*\
  !*** ./src/client/view/home/dashboard.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../common/rbac.jsx */ "./src/client/view/common/rbac.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Dashboard =
/*#__PURE__*/
function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));
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

  _createClass(Dashboard, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 mt-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card shadow mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header bg-goodyear"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "card-title text-light"
      }, "Transactions"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body bg-light"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Find everything you need to finalize and manage deliveries or upload and download data using the TPP POS integration system."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Start a delivery for:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=a"
      }, "National Account"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=b"
      }, "Local Government"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=d"
      }, "State Government"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        role: "Create-CA-Delivery"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "/delivery/?type=j"
      }, "CA National Account")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        role: "View-More"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "#"
      }, "Deliveries On Hold"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "#"
      }, "Deliveries Sent"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "#"
      }, "Roadside Service Calls"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-goodyear m-1",
        href: "#"
      }, "TPP Info")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "dropdown-toggle btn-goodyear btn text-light mt-1",
        href: "#",
        id: "dropdownacct",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, "More..."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownacct"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "dropdown-item",
        href: "/delivery/?type=c"
      }, "C - Local Price Support"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "dropdown-item",
        href: "/delivery/?type=e"
      }, "E - Federal Government"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "dropdown-item",
        href: "/delivery/?type=f"
      }, "F - Purchase & Resale"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "dropdown-item",
        href: "/delivery/?type=h"
      }, "H - Direct Dealer")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        if: this.state.menus.indexOf('Tires And Ordering') > -1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card shadow mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header bg-info shadow-sm"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "card-title text-light"
      }, "Order Tires"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body bg-light"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Search tire inventory and determine product availability using the Tire Finder. Plus, order tires to capitalize on the selling power of Goodyear\xAE, Dunlop\xAE and Kelly\xAE tires."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-info m-1",
        href: "#"
      }, "Find Tires"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-info m-1",
        href: "#"
      }, "Check Order Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-info m-1",
        href: "#"
      }, "View Tire Price Book"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-info m-1",
        href: "#"
      }, "Quotes")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        if: this.state.menus.indexOf('Financial') > -1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card shadow mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header bg-secondary"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "card-title text-light"
      }, "Financial Information"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body bg-light"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Check your account balance and remit payments. Retrieve invoices, statements, and Sales Status reports in Financials."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Or view:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-secondary m-1",
        href: "#"
      }, "Invoices"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-secondary m-1",
        href: "#"
      }, "Account Payable Summary"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-secondary m-1",
        href: "#"
      }, "Account Claim Form"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-secondary m-1",
        href: "#"
      }, "Ultimate Purchaser Certificate")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_rbac_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        if: this.state.menus.indexOf('Dealer Programs') > -1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card mb-3 mb-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header bg-warning"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "card-title text-dark"
      }, "Dealer Programs"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body bg-light"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Access valuable information and documents designed to help you effectively manage your business while supporting National Accounts and Government Sales customers."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-warning m-1",
        href: "#"
      }, "Service Price Book"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-warning m-1",
        href: "#"
      }, "Government Approval Info"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-warning m-1",
        href: "#"
      }, "View Online Orders"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card mt-4 h-50"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header bg-gold"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: "card-title"
      }, "News")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body bg-darkish"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "news-carousel",
        className: "carousel",
        "data-ride": "carousel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "carousel-inner"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "carousel-item active"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "d-block w-100",
        src: "public/images/tirehub.png",
        alt: "TireHub News"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "carousel-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "d-block w-100",
        src: "public/images/logo.png",
        alt: "THQ"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "carousel-item"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "carousel-control-prev",
        href: "#news-carousel",
        rol: "button",
        "data-slide": "prev"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "carousel-control-prev-icon",
        "aria-hidden": "true"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "sr-only"
      }, "Previous")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "carousel-control-next",
        href: "#news-carousel",
        role: "button",
        "data-slide": "next"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "carousel-control-next-icon text-dark",
        "aria-hidden": "true"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "sr-only"
      }, "Next"))))))));
    }
  }]);

  return Dashboard;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3ZpZXcvY29tbW9uL3JiYWMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvdmlldy9ob21lL2Rhc2hib2FyZC5qc3giXSwibmFtZXMiOlsiQ2FuIiwicHJvcHMiLCJzdGF0ZSIsInByaXZzIiwid2luZG93IiwiVEhRIiwidXNlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzZXRTdGF0ZSIsInJvbGUiLCJpbmRleE9mIiwiaWYiLCJzaG91bGRSZW5kZXIiLCJ2YWxpZGF0ZSIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiRGFzaGJvYXJkIiwibWVudXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFTUEsRzs7Ozs7QUFDRixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsNkVBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMsV0FBSyxFQUFFQyxNQUFNLENBQUNDLEdBQVAsQ0FBV0MsSUFBWCxDQUFnQkgsS0FBaEIsSUFBeUI7QUFEdkIsS0FBYjtBQUdBSSxZQUFRLENBQUNDLGdCQUFULENBQTBCLGlCQUExQixFQUE2QyxVQUFDQyxDQUFELEVBQU87QUFDaEQsWUFBS0MsUUFBTCxDQUFjO0FBQUNQLGFBQUssRUFBRUMsTUFBTSxDQUFDQyxHQUFQLENBQVdDLElBQVgsQ0FBZ0JIO0FBQXhCLE9BQWQ7QUFDSCxLQUZEO0FBTGU7QUFRbEI7Ozs7K0JBRVU7QUFDUCxVQUFJLEtBQUtGLEtBQUwsQ0FBV1UsSUFBWCxJQUFtQixLQUFLVCxLQUFMLENBQVdDLEtBQTlCLElBQXVDLEtBQUtELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQlMsT0FBakIsQ0FBeUIsS0FBS1gsS0FBTCxDQUFXVSxJQUFwQyxJQUE0QyxDQUFDLENBQXhGLEVBQTJGO0FBQ3ZGLGVBQU8sSUFBUDtBQUNILE9BRkQsTUFFTyxJQUFJLEtBQUtWLEtBQUws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QU1JO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0k7QUFBRyxZQUFJLEVBQUM7QUFBUixTQUFZO0FBQUssaUJBQVMsRUFBQyxlQUFmO0FBQStCLFdBQUcsRUFBQyx3QkFBbkM7QUFBNEQsV0FBRyxFQUFDO0FBQWhFLFFBQVosQ0FESixDQU5KLEVBVUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsUUFWSixDQURKLEVBaUJJO0FBQUcsaUJBQVMsRUFBQyx1QkFBYjtBQUFxQyxZQUFJLEVBQUMsZ0JBQTFDO0FBQTJELFdBQUcsRUFBQyxRQUEvRDtBQUF3RSxzQkFBVztBQUFuRixTQUNJO0FBQU0saUJBQVMsRUFBQyw0QkFBaEI7QUFBNkMsdUJBQVk7QUFBekQsUUFESixFQUVJO0FBQU0saUJBQVMsRUFBQztBQUFoQixvQkFGSixDQWpCSixFQXFCSTtBQUFHLGlCQUFTLEVBQUMsdUJBQWI7QUFBcUMsWUFBSSxFQUFDLGdCQUExQztBQUEyRCxZQUFJLEVBQUMsUUFBaEU7QUFBeUUsc0JBQVc7QUFBcEYsU0FDSTtBQUFNLGlCQUFTLEVBQUMsc0NBQWhCO0FBQXVELHVCQUFZO0FBQW5FLFFBREosRUFFSTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsZ0JBRkosQ0FyQkosQ0FESixDQUpKLENBREosQ0FqRUosQ0FESixDQURKO0FBeUdIOzs7O0VBcEhrQ0ssK0MiLCJmaWxlIjoiMS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgQ2FuIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcHJpdnM6IHdpbmRvdy5USFEudXNlci5wcml2cyB8fCBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0aHEucmVjZWl2ZWROYXYnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwcml2czogd2luZG93LlRIUS51c2VyLnByaXZzfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvbGUgJiYgdGhpcy5zdGF0ZS5wcml2cyAmJiB0aGlzLnN0YXRlLnByaXZzLmluZGV4T2YodGhpcy5wcm9wcy5yb2xlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmlmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc2hvdWxkUmVuZGVyID0gdGhpcy52YWxpZGF0ZSgpXHJcbiAgICAgICAgaWYgKHNob3VsZFJlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIFxyXG5leHBvcnQgZGVmYXVsdCBDYW4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2FuIGZyb20gJy4vLi4vY29tbW9uL3JiYWMuanN4J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWVudXM6IHdpbmRvdy5USFEubWVudXMgfHwgW11cclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGhxLnJlY2VpdmVkTmF2JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHttZW51czogd2luZG93LlRIUS5tZW51c30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC04IG10LTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkIHNoYWRvdyBtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXIgYmctZ29vZHllYXJcIj48aDQgY2xhc3NOYW1lPVwiY2FyZC10aXRsZSB0ZXh0LWxpZ2h0XCI+VHJhbnNhY3Rpb25zPC9oND48L2Rpdj48L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keSBiZy1saWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RmluZCBldmVyeXRoaW5nIHlvdSBuZWVkIHRvIGZpbmFsaXplIGFuZCBtYW5hZ2UgZGVsaXZlcmllcyBvciB1cGxvYWQgYW5kIGRvd25sb2FkIGRhdGEgdXNpbmcgdGhlIFRQUCBQT1MgaW50ZWdyYXRpb24gc3lzdGVtLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNj5TdGFydCBhIGRlbGl2ZXJ5IGZvcjo8L2g2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWFcIj5OYXRpb25hbCBBY2NvdW50PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWJcIj5Mb2NhbCBHb3Zlcm5tZW50PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWRcIj5TdGF0ZSBHb3Zlcm5tZW50PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhbiByb2xlPVwiQ3JlYXRlLUNBLURlbGl2ZXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWpcIj5DQSBOYXRpb25hbCBBY2NvdW50PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FuIHJvbGU9XCJWaWV3LU1vcmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLWdvb2R5ZWFyIG0tMVwiIGhyZWY9XCIjXCI+RGVsaXZlcmllcyBPbiBIb2xkPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZ29vZHllYXIgbS0xXCIgaHJlZj1cIiNcIj5EZWxpdmVyaWVzIFNlbnQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiI1wiPlJvYWRzaWRlIFNlcnZpY2UgQ2FsbHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1nb29keWVhciBtLTFcIiBocmVmPVwiI1wiPlRQUCBJbmZvPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZSBidG4tZ29vZHllYXIgYnRuIHRleHQtbGlnaHQgbXQtMVwiIGhyZWY9XCIjXCIgaWQ9XCJkcm9wZG93bmFjY3RcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5Nb3JlLi4uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZHJvcGRvd25hY2N0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWNcIj5DIC0gTG9jYWwgUHJpY2UgU3VwcG9ydDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIvZGVsaXZlcnkvP3R5cGU9ZVwiPkUgLSBGZWRlcmFsIEdvdmVybm1lbnQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiL2RlbGl2ZXJ5Lz90eXBlPWZcIj5GIC0gUHVyY2hhc2UgJmFtcDsgUmVzYWxlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIi9kZWxpdmVyeS8/dHlwZT1oXCI+SCAtIERpcmVjdCBEZWFsZXI8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYW4gaWY9e3RoaXMuc3RhdGUubWVudXMuaW5kZXhPZignVGlyZXMgQW5kIE9yZGVyaW5nJykgPiAtMX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgc2hhZG93IG1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXIgYmctaW5mbyBzaGFkb3ctc21cIj48aDQgY2xhc3NOYW1lPVwiY2FyZC10aXRsZSB0ZXh0LWxpZ2h0XCI+T3JkZXIgVGlyZXM8L2g0PjwvZGl2PjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keSBiZy1saWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5TZWFyY2ggdGlyZSBpbnZlbnRvcnkgYW5kIGRldGVybWluZSBwcm9kdWN0IGF2YWlsYWJpbGl0eSB1c2luZyB0aGUgVGlyZSBGaW5kZXIuIFBsdXMsIG9yZGVyIHRpcmVzIHRvIGNhcGl0YWxpemUgb24gdGhlIHNlbGxpbmcgcG93ZXIgb2YgR29vZHllYXLCriwgRHVubG9wwq4gYW5kIEtlbGx5wq4gdGlyZXMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gbS0xXCIgaHJlZj1cIiNcIj5GaW5kIFRpcmVzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gbS0xXCIgaHJlZj1cIiNcIj5DaGVjayBPcmRlciBTdGF0dXM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBtLTFcIiBocmVmPVwiI1wiPlZpZXcgVGlyZSBQcmljZSBCb29rPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gbS0xXCIgaHJlZj1cIiNcIj5RdW90ZXM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9DYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYW4gaWY9e3RoaXMuc3RhdGUubWVudXMuaW5kZXhPZignRmluYW5jaWFsJykgPiAtMX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgc2hhZG93IG1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXIgYmctc2Vjb25kYXJ5XCI+PGg0IGNsYXNzTmFtZT1cImNhcmQtdGl0bGUgdGV4dC1saWdodFwiPkZpbmFuY2lhbCBJbmZvcm1hdGlvbjwvaDQ+PC9kaXY+PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5IGJnLWxpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q2hlY2sgeW91ciBhY2NvdW50IGJhbGFuY2UgYW5kIHJlbWl0IHBheW1lbnRzLiBSZXRyaWV2ZSBpbnZvaWNlcywgc3RhdGVtZW50cywgYW5kIFNhbGVzIFN0YXR1cyByZXBvcnRzIGluIEZpbmFuY2lhbHMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNj5PciB2aWV3OjwvaDY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnkgbS0xXCIgaHJlZj1cIiNcIj5JbnZvaWNlczwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeSBtLTFcIiBocmVmPVwiI1wiPkFjY291bnQgUGF5YWJsZSBTdW1tYXJ5PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5IG0tMVwiIGhyZWY9XCIjXCI+QWNjb3VudCBDbGFpbSBGb3JtPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5IG0tMVwiIGhyZWY9XCIjXCI+VWx0aW1hdGUgUHVyY2hhc2VyIENlcnRpZmljYXRlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ2FuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2FuIGlmPXt0aGlzLnN0YXRlLm1lbnVzLmluZGV4T2YoJ0RlYWxlciBQcm9ncmFtcycpID4gLTF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkIG1iLTMgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+PGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlciBiZy13YXJuaW5nXCI+PGg0IGNsYXNzTmFtZT1cImNhcmQtdGl0bGUgdGV4dC1kYXJrXCI+RGVhbGVyIFByb2dyYW1zPC9oND48L2Rpdj48L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHkgYmctbGlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5BY2Nlc3MgdmFsdWFibGUgaW5mb3JtYXRpb24gYW5kIGRvY3VtZW50cyBkZXNpZ25lZCB0byBoZWxwIHlvdSBlZmZlY3RpdmVseSBtYW5hZ2UgeW91ciBidXNpbmVzcyB3aGlsZSBzdXBwb3J0aW5nIE5hdGlvbmFsIEFjY291bnRzIGFuZCBHb3Zlcm5tZW50IFNhbGVzIGN1c3RvbWVycy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIG0tMVwiIGhyZWY9XCIjXCI+U2VydmljZSBQcmljZSBCb29rPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyBtLTFcIiBocmVmPVwiI1wiPkdvdmVybm1lbnQgQXBwcm92YWwgSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgbS0xXCIgaHJlZj1cIiNcIj5WaWV3IE9ubGluZSBPcmRlcnM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9DYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgbXQtNCBoLTUwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyIGJnLWdvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPk5ld3M8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keSBiZy1kYXJraXNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm5ld3MtY2Fyb3VzZWxcIiBjbGFzc05hbWU9XCJjYXJvdXNlbFwiIGRhdGEtcmlkZT1cImNhcm91c2VsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWwtaW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcm91c2VsLWl0ZW0gYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj48aW1nIGNsYXNzTmFtZT1cImQtYmxvY2sgdy0xMDBcIiBzcmM9XCJwdWJsaWMvaW1hZ2VzL3RpcmVodWIucG5nXCIgYWx0PVwiVGlyZUh1YiBOZXdzXCIvPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcm91c2VsLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjxpbWcgY2xhc3NOYW1lPVwiZC1ibG9jayB3LTEwMFwiIHNyYz1cInB1YmxpYy9pbWFnZXMvbG9nby5wbmdcIiBhbHQ9XCJUSFFcIi8+PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWwtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIGhyZWY9XCIjbmV3cy1jYXJvdXNlbFwiIHJvbD1cImJ1dHRvblwiIGRhdGEtc2xpZGU9XCJwcmV2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5QcmV2aW91czwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjYXJvdXNlbC1jb250cm9sLW5leHRcIiBocmVmPVwiI25ld3MtY2Fyb3VzZWxcIiByb2xlPVwiYnV0dG9uXCIgZGF0YS1zbGlkZT1cIm5leHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uIHRleHQtZGFya1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5OZXh0PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==