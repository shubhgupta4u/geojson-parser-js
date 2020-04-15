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
class Coordinate {
    constructor(lng, lat) {
        this.lat = lat;
        this.lng = lng;
    }
}
exports.Coordinate = Coordinate;
class FeatureCollection {
    constructor() {
        this.geometries = new Array();
        this.metadata = new Array();
    }
}
exports.FeatureCollection = FeatureCollection;
class FeatureProperty {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
exports.FeatureProperty = FeatureProperty;
class Geometry {
    constructor(type, id) {
        this.id = "";
        this.featureProperties = new Array();
        this.type = type;
        this.id = id;
    }
}
exports.Geometry = Geometry;
class Point extends Geometry {
    constructor(coordinate, id = "") {
        super(GeometryType.Point, id);
        this.coordinate = coordinate;
    }
}
exports.Point = Point;
class LineString extends Geometry {
    constructor(id = "") {
        super(GeometryType.LineString, id);
        this.coordinates = new Array();
    }
}
exports.LineString = LineString;
class Polygon extends Geometry {
    constructor(id = "", type = GeometryType.Polygon) {
        super(type, id);
        this.coordinates = new Array();
    }
}
exports.Polygon = Polygon;
class PolygonWithHole extends Polygon {
    constructor(id = "") {
        super(id, GeometryType.PolygonWithHole);
        this.holes = new Array();
    }
}
exports.PolygonWithHole = PolygonWithHole;
class MultiPoint extends Geometry {
    constructor(id = "") {
        super(GeometryType.MultiPoint, id);
        this.points = new Array();
    }
}
exports.MultiPoint = MultiPoint;
class MultiLineString extends Geometry {
    constructor(id = "") {
        super(GeometryType.MultiLineString, id);
        this.LinesString = new Array();
    }
}
exports.MultiLineString = MultiLineString;
class MultiPolygon extends Geometry {
    constructor(id = "") {
        super(GeometryType.MultiPolygon, id);
        this.polygons = new Array();
    }
}
exports.MultiPolygon = MultiPolygon;
