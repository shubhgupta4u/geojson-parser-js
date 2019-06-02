"use strict";
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
