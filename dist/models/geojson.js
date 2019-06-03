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
var GeometryType;
(function (GeometryType) {
    GeometryType[GeometryType["Point"] = 0] = "Point";
    GeometryType[GeometryType["LineString"] = 1] = "LineString";
    GeometryType[GeometryType["Polygon"] = 2] = "Polygon";
    GeometryType[GeometryType["PolygonWithHole"] = 3] = "PolygonWithHole";
    GeometryType[GeometryType["MultiPoint"] = 4] = "MultiPoint";
    GeometryType[GeometryType["MultiLineString"] = 5] = "MultiLineString";
    GeometryType[GeometryType["MultiPolygon"] = 6] = "MultiPolygon";
})(GeometryType = exports.GeometryType || (exports.GeometryType = {}));
var Coordinate = /** @class */ (function () {
    function Coordinate(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return Coordinate;
}());
exports.Coordinate = Coordinate;
var FeatureCollection = /** @class */ (function () {
    function FeatureCollection() {
        this.geometries = new Array();
        this.metadata = new Array();
    }
    return FeatureCollection;
}());
exports.FeatureCollection = FeatureCollection;
var FeatureProperty = /** @class */ (function () {
    function FeatureProperty(key, value) {
        this.key = key;
        this.value = value;
    }
    return FeatureProperty;
}());
exports.FeatureProperty = FeatureProperty;
var Geometry = /** @class */ (function () {
    function Geometry(type, id) {
        this.id = "";
        this.featureProperties = new Array();
        this.type = type;
        this.id = id;
    }
    return Geometry;
}());
exports.Geometry = Geometry;
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(lat, lng, id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, GeometryType.Point, id) || this;
        _this.coordinate = new Coordinate(lat, lng);
        return _this;
    }
    return Point;
}(Geometry));
exports.Point = Point;
var LineString = /** @class */ (function (_super) {
    __extends(LineString, _super);
    function LineString(id) {
        if (id === void 0) { id = ""; }
        var _this = _super.call(this, GeometryType.LineString, id) || this;
        _this.coordinates = new Array();
        return _this;
    }
    return LineString;
}(Geometry));
exports.LineString = LineString;
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(id, type) {
        if (id === void 0) { id = ""; }
        if (type === void 0) { type = GeometryType.Polygon; }
        var _this = _super.call(this, type, id) || this;
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
        var _this = _super.call(this, id, GeometryType.PolygonWithHole) || this;
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
        var _this = _super.call(this, GeometryType.MultiPoint, id) || this;
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
        var _this = _super.call(this, GeometryType.MultiLineString, id) || this;
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
        var _this = _super.call(this, GeometryType.MultiPolygon, id) || this;
        _this.polygons = new Array();
        return _this;
    }
    return MultiPolygon;
}(Geometry));
exports.MultiPolygon = MultiPolygon;
