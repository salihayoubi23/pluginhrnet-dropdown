"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./DropdownStyles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // Votre fichier React (Dropdown.js)
// Importez le fichier CSS

var Dropdown = function Dropdown(_ref) {
  var dropdownData = _ref.dropdownData,
    onChange = _ref.onChange,
    _ref$onReset = _ref.onReset,
    onReset = _ref$onReset === void 0 ? false : _ref$onReset,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? Math.random() : _ref$name,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? Math.random() : _ref$id;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    dropdownIsOpen = _useState2[0],
    setDropdownIsOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(dropdownData[0]),
    _useState4 = _slicedToArray(_useState3, 2),
    dropdownSelection = _useState4[0],
    setDropdownSelection = _useState4[1];
  var _useState5 = (0, _react.useState)(_toConsumableArray(dropdownData)),
    _useState6 = _slicedToArray(_useState5, 2),
    filteredDropdownData = _useState6[0],
    setFilteredDropdownData = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    dropdownZIndex = _useState8[0],
    setDropdownZIndex = _useState8[1];
  var dropdownRef = (0, _react.useRef)(null);
  var toogleDropdown = function toogleDropdown() {
    setDropdownIsOpen(function (state) {
      return !state;
    });
    setDropdownZIndex(function (dropdownZIndex) {
      return dropdownZIndex === 0 ? 10 : 0;
    });
    if (filteredDropdownData.length < dropdownData.length) {
      setFilteredDropdownData(_toConsumableArray(dropdownData));
    }
  };
  var handleSelectionClick = function handleSelectionClick(e) {
    var tagName = e.target.tagName.toLowerCase();
    if (tagName && tagName === "p") {
      setDropdownSelection(e.target.innerText);
    }
    if (tagName && tagName === "div") {
      var p = e.target.querySelector("p");
      setDropdownSelection(p.innerText);
    }
    toogleDropdown();
  };
  var filterData = function filterData(e) {
    var search = e.target.value;
    if (typeof search === "string") {
      search = search.toLowerCase();
    }
    setFilteredDropdownData(dropdownData.filter(function (elem) {
      if (typeof elem === "string") {
        elem = elem.toLowerCase();
      }
      return elem.includes(search);
    }));
  };
  (0, _react.useEffect)(function () {
    onChange(dropdownSelection);
  }, [dropdownSelection]);
  (0, _react.useEffect)(function () {
    if (onReset) {
      setDropdownIsOpen(false);
      setDropdownSelection(dropdownData[0]);
      setFilteredDropdownData(_toConsumableArray(dropdownData));
      setDropdownZIndex(0);
    }
  }, [onReset]);
  var handleOutsideClick = function handleOutsideClick(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toogleDropdown();
    }
  };
  (0, _react.useEffect)(function () {
    if (dropdownIsOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return function () {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownIsOpen]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "DropdownWrapper BaseContainer",
    ref: dropdownRef
  }, /*#__PURE__*/_react["default"].createElement("input", {
    className: "InputBtn",
    type: "button",
    value: dropdownSelection,
    onClick: function onClick() {
      toogleDropdown();
    },
    name: name,
    id: id
  }), dropdownIsOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "DropdownMenu BaseContainer"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    className: "SearchBar",
    type: "text",
    placeholder: "Search",
    onChange: function onChange(e) {
      return filterData(e);
    }
  }), filteredDropdownData.length && filteredDropdownData.length > 0 ? filteredDropdownData.map(function (elem, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "DropdownSelectionContainer",
      key: "dropdownMenu__selectionContainer" + index,
      onClick: function onClick(e) {
        return handleSelectionClick(e);
      }
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "DropdownSelection"
    }, elem));
  }) : /*#__PURE__*/_react["default"].createElement("p", {
    className: "NoDataErrMsg"
  }, "No content to display after search")));
};
Dropdown.propTypes = {
  dropdownData: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onReset: _propTypes["default"].bool,
  name: _propTypes["default"].number,
  id: _propTypes["default"].number
};
var _default = exports["default"] = Dropdown;