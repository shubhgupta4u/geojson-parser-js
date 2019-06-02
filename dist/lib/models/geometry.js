"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var coordinate_1 = require("./coordinate");
var Geometry = /** @class */ (function () {
    function Geometry(type, id) {
        this.id = "";
        this.featureProperties = new Array();
        this.type = type;
        if (!id && id.length > 0) {
            this.id = id;
        }
    }
    return Geometry;
}());
exports.Geometry = Geometry;
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(lat, lng, id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.Point, id) || this;
        _this.coordinate = new coordinate_1.Coordinate(lat, lng);
        return _this;
    }
    return Point;
}(Geometry));
exports.Point = Point;
var LineString = /** @class */ (function (_super) {
    __extends(LineString, _super);
    function LineString(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.LineString, id) || this;
        _this.coordinates = new Array();
        return _this;
    }
    return LineString;
}(Geometry));
exports.LineString = LineString;
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(type, id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, type | enum_1.GeometryType.Polygon, id) || this;
        _this.coordinates = new Array();
        return _this;
    }
    return Polygon;
}(Geometry));
exports.Polygon = Polygon;
var PolygonWithHole = /** @class */ (function (_super) {
    __extends(PolygonWithHole, _super);
    function PolygonWithHole(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.PolygonWithHole, id) || this;
        _this.holes = new Array();
        return _this;
    }
    return PolygonWithHole;
}(Polygon));
exports.PolygonWithHole = PolygonWithHole;
var MultiPoint = /** @class */ (function (_super) {
    __extends(MultiPoint, _super);
    function MultiPoint(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.MultiPoint, id) || this;
        _this.points = new Array();
        return _this;
    }
    return MultiPoint;
}(Geometry));
exports.MultiPoint = MultiPoint;
var MultiLineString = /** @class */ (function (_super) {
    __extends(MultiLineString, _super);
    function MultiLineString(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.MultiLineString, id) || this;
        _this.LinesString = new Array();
        return _this;
    }
    return MultiLineString;
}(Geometry));
exports.MultiLineString = MultiLineString;
var MultiPolygon = /** @class */ (function (_super) {
    __extends(MultiPolygon, _super);
    function MultiPolygon(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, enum_1.GeometryType.MultiPoint, id) || this;
        _this.polygons = new Array();
        return _this;
    }
    return MultiPolygon;
}(Geometry));
exports.MultiPolygon = MultiPolygon;
