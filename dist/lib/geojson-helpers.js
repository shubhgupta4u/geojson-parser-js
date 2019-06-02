"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feature_1 = require("./models/feature");
var geometry_1 = require("./models/geometry");
var feature_property_1 = require("./models/feature-property");
var coordinate_1 = require("./models/coordinate");
var GeojsonHelpers = /** @class */ (function () {
    function GeojsonHelpers() {
    }
    GeojsonHelpers.isValid = function (geoJson) {
        if (geoJson.type && (geoJson.type.toLowerCase() == "featurecollection" || geoJson.type.toLowerCase() == "feature")
            && ((geoJson.type.toLowerCase() == "featurecollection" && geoJson.features && geoJson.features instanceof Array)
                || (geoJson.type.toLowerCase() == "feature" && geoJson.geometry && geoJson.geometry.type && geoJson.geometry.coordinates))) {
            return true;
        }
        return false;
    };
    GeojsonHelpers.parse = function (geoJson) {
        {
            try {
                if (!GeojsonHelpers.isValid(geoJson)) {
                    throw new SyntaxError("geoJson string is not valid.");
                }
                var features_1 = new feature_1.FeatureCollection();
                var featureArray = void 0;
                if (geoJson.features) {
                    featureArray = geoJson.features;
                }
                else {
                    featureArray = new Array();
                    featureArray.push(geoJson);
                }
                if (featureArray.length > 0) {
                    featureArray.forEach(function (feature) {
                        var geometry = GeojsonHelpers.parseFeature(feature);
                        if (geometry) {
                            features_1.geometries.push(geometry);
                        }
                    });
                }
                var featureProperties = GeojsonHelpers.getProperties(geoJson.metadata);
                if (featureProperties && featureProperties.length > 0) {
                    featureProperties.forEach(function (property) {
                        features_1.metadata.push(property);
                    });
                }
                // console.log(features);
                return features_1;
            }
            catch (error) {
                throw error;
            }
        }
    };
    GeojsonHelpers.parseFeature = function (feature) {
        var geometry;
        var inputGeom;
        try {
            if (feature.type.toLowerCase() == "feature" && feature.geometry) {
                inputGeom = feature.geometry;
            }
            else {
                throw new SyntaxError("geoJson string is not valid.");
            }
            switch (inputGeom.type.toLowerCase()) {
                case "point":
                    geometry = GeojsonHelpers.getPoint(inputGeom);
                    break;
                case "linestring":
                    geometry = GeojsonHelpers.getLineString(inputGeom);
                    break;
                case "polygon":
                    geometry = GeojsonHelpers.getPolygon(inputGeom);
                    break;
                case "multipoint":
                    geometry = GeojsonHelpers.getMultiPoint(inputGeom);
                    break;
                case "multilinestring":
                    geometry = GeojsonHelpers.getMultiLineString(inputGeom);
                    break;
                case "multipolygon":
                    geometry = GeojsonHelpers.getMultiPolygon(inputGeom);
                    break;
                default:
                    throw new SyntaxError("Feature type '" + inputGeom.type + "' is not supported.");
            }
            var featureProperties = GeojsonHelpers.getProperties(feature.properties);
            if (featureProperties && featureProperties.length > 0) {
                featureProperties.forEach(function (property) {
                    geometry.featureProperties.push(property);
                });
            }
        }
        catch (error) {
            throw error;
        }
        return geometry;
    };
    GeojsonHelpers.getProperties = function (properties) {
        try {
            var featureProperties_1 = new Array();
            if (properties) {
                var propertyKeyArray = Object.keys(properties);
                if (propertyKeyArray != null && propertyKeyArray.length > 0) {
                    propertyKeyArray.forEach(function (key) {
                        featureProperties_1.push(new feature_property_1.FeatureProperty(key, properties[key]));
                    });
                }
            }
            return featureProperties_1;
        }
        catch (error) {
            throw error;
        }
    };
    GeojsonHelpers.getPoint = function (geometry) {
        var coord = GeojsonHelpers.getCoordinate(geometry.coordinates);
        var point = new geometry_1.Point(coord.lat, coord.lng, geometry.id);
        return point;
    };
    GeojsonHelpers.getMultiPoint = function (geometry) {
        var multiPoint = new geometry_1.MultiPoint(geometry.id);
        var coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach(function (coord) {
                multiPoint.points.push(new geometry_1.Point(coord.lat, coord.lng));
            });
        }
        return multiPoint;
    };
    GeojsonHelpers.getLineString = function (geometry) {
        var lineString = new geometry_1.LineString(geometry.id);
        var coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach(function (coord) {
                lineString.coordinates.push(coord);
            });
        }
        return lineString;
    };
    GeojsonHelpers.getMultiLineString = function (geometry) {
        var multiLineString = new geometry_1.MultiLineString(geometry.id);
        var multiLinestringCoords = geometry.coordinates;
        if (multiLinestringCoords && multiLinestringCoords.length > 0) {
            multiLinestringCoords.forEach(function (linestringCoords) {
                var lineString = new geometry_1.LineString();
                var coordinates = GeojsonHelpers.getCoordinates(linestringCoords);
                if (coordinates && coordinates.length > 0) {
                    coordinates.forEach(function (coord) {
                        lineString.coordinates.push(coord);
                    });
                }
                multiLineString.LinesString.push(lineString);
            });
            return multiLineString;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    };
    GeojsonHelpers.getPolygon = function (geometry) {
        var polygonCoords = geometry.coordinates;
        if (polygonCoords.length > 1) {
            var polygonWithHole_1 = new geometry_1.PolygonWithHole();
            var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
            if (coordinates && coordinates.length > 0) {
                coordinates.forEach(function (coord) {
                    polygonWithHole_1.coordinates.push(coord);
                });
            }
            var _loop_1 = function (index) {
                var polygon = new geometry_1.Polygon();
                var coordinates_1 = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                if (coordinates_1 && coordinates_1.length > 0) {
                    coordinates_1.forEach(function (coord) {
                        polygon.coordinates.push(coord);
                    });
                }
                polygonWithHole_1.holes.push(polygon);
            };
            for (var index = 1; index < polygonCoords.length; index++) {
                _loop_1(index);
            }
            return polygonWithHole_1;
        }
        else if (polygonCoords.length == 1) {
            var polygon_1 = new geometry_1.Polygon();
            var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
            if (coordinates && coordinates.length > 0) {
                coordinates.forEach(function (coord) {
                    polygon_1.coordinates.push(coord);
                });
            }
            return polygon_1;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    };
    GeojsonHelpers.getMultiPolygon = function (geometry) {
        var multiPolygon = new geometry_1.MultiPolygon(geometry.id);
        if (geometry.coordinates && geometry.coordinates.length > 0) {
            var multiPolygonCoords = geometry.coordinates;
            multiPolygonCoords.forEach(function (polygonCoords) {
                if (polygonCoords.length > 1) {
                    var polygonWithHole_2 = new geometry_1.PolygonWithHole();
                    var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
                    if (coordinates && coordinates.length > 0) {
                        coordinates.forEach(function (coord) {
                            polygonWithHole_2.coordinates.push(coord);
                        });
                    }
                    var _loop_2 = function (index) {
                        var polygon = new geometry_1.Polygon();
                        var coordinates_2 = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                        if (coordinates_2 && coordinates_2.length > 0) {
                            coordinates_2.forEach(function (coord) {
                                polygon.coordinates.push(coord);
                            });
                        }
                        polygonWithHole_2.holes.push(polygon);
                    };
                    for (var index = 1; index < polygonCoords.length; index++) {
                        _loop_2(index);
                    }
                    multiPolygon.polygons.push(polygonWithHole_2);
                }
                else if (polygonCoords.length == 1) {
                    var polygon_2 = new geometry_1.Polygon();
                    var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
                    if (coordinates && coordinates.length > 0) {
                        coordinates.forEach(function (coord) {
                            polygon_2.coordinates.push(coord);
                        });
                    }
                    multiPolygon.polygons.push(polygon_2);
                }
            });
        }
        return multiPolygon;
    };
    GeojsonHelpers.getCoordinates = function (coords) {
        var coordinates = new Array();
        if (coords && coords.length > 0) {
            coords.forEach(function (coord) {
                coordinates.push(GeojsonHelpers.getCoordinate(coord));
            });
        }
        return coordinates;
    };
    GeojsonHelpers.getCoordinate = function (coord) {
        if (coord && coord.length == 2) {
            var coordinate = new coordinate_1.Coordinate(coord[0], coord[1]);
            return coordinate;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    };
    return GeojsonHelpers;
}());
exports.GeojsonHelpers = GeojsonHelpers;
