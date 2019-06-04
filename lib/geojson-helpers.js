"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geojson_1 = require("./models/geojson");
var geojson_2 = require("./models/geojson");
var geojson_3 = require("./models/geojson");
var geojson_4 = require("./models/geojson");
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
    //Start of methods for creating geojson object from FeatureCollection instance
    GeojsonHelpers.create = function (features) {
        {
            try {
                var geojsonObj_1 = {};
                geojsonObj_1.type = "FeatureCollection";
                geojsonObj_1.features = new Array();
                if (features) {
                    if (features.metadata && features.metadata.length > 0) {
                        geojsonObj_1.metadata = {};
                        features.metadata.forEach(function (metadata) {
                            geojsonObj_1.metadata[metadata.key] = metadata.value;
                        });
                    }
                    if (features.geometries && features.geometries.length > 0) {
                        features.geometries.forEach(function (geometry) {
                            var feature = {};
                            feature.type = "Feature";
                            if (geometry.id && geometry.id != "") {
                                feature.id = geometry.id;
                            }
                            feature.properties = {};
                            if (geometry.featureProperties && geometry.featureProperties.length > 0) {
                                geometry.featureProperties.forEach(function (property) {
                                    feature.properties[property.key] = property.value;
                                });
                            }
                            feature.geometry = {};
                            feature.geometry.type = GeojsonHelpers.GetGeojsonFeatureType(geometry.type);
                            feature.geometry.coordinates = GeojsonHelpers.GetGeojsonGeometryCoordinates(geometry);
                            geojsonObj_1.features.push(feature);
                        });
                    }
                }
                return geojsonObj_1;
            }
            catch (error) {
                throw error;
            }
        }
    };
    GeojsonHelpers.GetGeojsonFeatureType = function (type) {
        switch (type) {
            case geojson_2.GeometryType.Point: return "Point";
            case geojson_2.GeometryType.LineString: return "LineString";
            case geojson_2.GeometryType.Polygon: return "Polygon";
            case geojson_2.GeometryType.PolygonWithHole: return "Polygon";
            case geojson_2.GeometryType.MultiPoint: return "MultiPoint";
            case geojson_2.GeometryType.MultiLineString: return "MultiLineString";
            case geojson_2.GeometryType.MultiPolygon: return "MultiPolygon";
        }
    };
    GeojsonHelpers.GetGeojsonGeometryCoordinates = function (geometry) {
        var coordinates = new Array();
        try {
            switch (geometry.type) {
                case geojson_2.GeometryType.Point:
                    var point = geometry;
                    if (point.coordinate) {
                        coordinates.push(point.coordinate.lat);
                        coordinates.push(point.coordinate.lng);
                    }
                    break;
                case geojson_2.GeometryType.LineString:
                    var lineString = geometry;
                    if (lineString.coordinates) {
                        lineString.coordinates.forEach(function (coord) {
                            var innerCoordinates = new Array();
                            innerCoordinates.push(coord.lat);
                            innerCoordinates.push(coord.lng);
                            coordinates.push(innerCoordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.Polygon:
                    var polygon = geometry;
                    if (polygon.coordinates) {
                        coordinates = GeojsonHelpers.getPolygonCoordinate(polygon);
                    }
                    break;
                case geojson_2.GeometryType.PolygonWithHole:
                    var polygonWithHole = geometry;
                    if (polygonWithHole.coordinates) {
                        coordinates = GeojsonHelpers.getPolygonWithHoleCoordinate(polygonWithHole);
                    }
                    break;
                case geojson_2.GeometryType.MultiPoint:
                    var multiPoint = geometry;
                    if (multiPoint.points) {
                        multiPoint.points.forEach(function (point) {
                            var innerCoordinates = new Array();
                            if (point.coordinate) {
                                innerCoordinates.push(point.coordinate.lat);
                                innerCoordinates.push(point.coordinate.lng);
                            }
                            coordinates.push(innerCoordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.MultiLineString:
                    var multiLineString = geometry;
                    if (multiLineString.LinesString && multiLineString.LinesString.length > 0) {
                        multiLineString.LinesString.forEach(function (lineString) {
                            var child1Coordinates = new Array();
                            lineString.coordinates.forEach(function (coord) {
                                var innerCoordinates = new Array();
                                innerCoordinates.push(coord.lat);
                                innerCoordinates.push(coord.lng);
                                child1Coordinates.push(innerCoordinates);
                            });
                            coordinates.push(child1Coordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.MultiPolygon:
                    var multiPolygon = geometry;
                    if (multiPolygon.polygons && multiPolygon.polygons.length > 0) {
                        multiPolygon.polygons.forEach(function (polygon) {
                            if (polygon instanceof geojson_2.PolygonWithHole) {
                                coordinates.push(GeojsonHelpers.getPolygonWithHoleCoordinate(polygon));
                            }
                            else {
                                coordinates.push(GeojsonHelpers.getPolygonCoordinate(polygon));
                            }
                        });
                    }
                    break;
            }
        }
        catch (error) {
            throw error;
        }
        return coordinates;
    };
    GeojsonHelpers.getPolygonCoordinate = function (polygon) {
        try {
            var coordinates = new Array();
            if (polygon.coordinates) {
                var child1Coordinates_1 = new Array();
                polygon.coordinates.forEach(function (coord) {
                    var innerCoordinates = new Array();
                    innerCoordinates.push(coord.lat);
                    innerCoordinates.push(coord.lng);
                    child1Coordinates_1.push(innerCoordinates);
                });
                coordinates.push(child1Coordinates_1);
                return coordinates;
            }
            else {
                throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
            }
        }
        catch (error) {
            throw error;
        }
    };
    GeojsonHelpers.getPolygonWithHoleCoordinate = function (polygonWithHole) {
        try {
            var coordinates_1 = new Array();
            if (polygonWithHole.coordinates) {
                var child1Coordinates_2 = new Array();
                polygonWithHole.coordinates.forEach(function (coord) {
                    var innerCoordinates = new Array();
                    innerCoordinates.push(coord.lat);
                    innerCoordinates.push(coord.lng);
                    child1Coordinates_2.push(innerCoordinates);
                });
                coordinates_1.push(child1Coordinates_2);
                if (polygonWithHole.holes && polygonWithHole.holes.length > 0) {
                    polygonWithHole.holes.forEach(function (polygon) {
                        child1Coordinates_2 = new Array();
                        polygon.coordinates.forEach(function (coord) {
                            var innerCoordinates = new Array();
                            innerCoordinates.push(coord.lat);
                            innerCoordinates.push(coord.lng);
                            child1Coordinates_2.push(innerCoordinates);
                        });
                        coordinates_1.push(child1Coordinates_2);
                    });
                }
                return coordinates_1;
            }
            else {
                throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
            }
        }
        catch (error) {
            throw error;
        }
    };
    //End of methods for creating geojson geojson object from FeatureCollection instance
    //Start of methods for reading geometries from geojson object
    GeojsonHelpers.parse = function (geoJson) {
        {
            try {
                if (!GeojsonHelpers.isValid(geoJson)) {
                    throw new SyntaxError("geoJson string is not valid.");
                }
                var features_1 = new geojson_1.FeatureCollection();
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
                feature.geometry.id = feature.id;
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
                        featureProperties_1.push(new geojson_3.FeatureProperty(key, properties[key]));
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
        var point = new geojson_2.Point(coord.lat, coord.lng, geometry.id);
        return point;
    };
    GeojsonHelpers.getMultiPoint = function (geometry) {
        var multiPoint = new geojson_2.MultiPoint(geometry.id);
        var coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach(function (coord) {
                multiPoint.points.push(new geojson_2.Point(coord.lat, coord.lng));
            });
        }
        return multiPoint;
    };
    GeojsonHelpers.getLineString = function (geometry) {
        var lineString = new geojson_2.LineString(geometry.id);
        var coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach(function (coord) {
                lineString.coordinates.push(coord);
            });
        }
        return lineString;
    };
    GeojsonHelpers.getMultiLineString = function (geometry) {
        var multiLineString = new geojson_2.MultiLineString(geometry.id);
        var multiLinestringCoords = geometry.coordinates;
        if (multiLinestringCoords && multiLinestringCoords.length > 0) {
            multiLinestringCoords.forEach(function (linestringCoords) {
                var lineString = new geojson_2.LineString();
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
            var polygonWithHole_1 = new geojson_2.PolygonWithHole();
            var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
            if (coordinates && coordinates.length > 0) {
                coordinates.forEach(function (coord) {
                    polygonWithHole_1.coordinates.push(coord);
                });
            }
            var _loop_1 = function (index) {
                var polygon = new geojson_2.Polygon();
                var coordinates_2 = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                if (coordinates_2 && coordinates_2.length > 0) {
                    coordinates_2.forEach(function (coord) {
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
            var polygon_1 = new geojson_2.Polygon();
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
        var multiPolygon = new geojson_2.MultiPolygon(geometry.id);
        if (geometry.coordinates && geometry.coordinates.length > 0) {
            var multiPolygonCoords = geometry.coordinates;
            multiPolygonCoords.forEach(function (polygonCoords) {
                if (polygonCoords.length > 1) {
                    var polygonWithHole_2 = new geojson_2.PolygonWithHole();
                    var coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
                    if (coordinates && coordinates.length > 0) {
                        coordinates.forEach(function (coord) {
                            polygonWithHole_2.coordinates.push(coord);
                        });
                    }
                    var _loop_2 = function (index) {
                        var polygon = new geojson_2.Polygon();
                        var coordinates_3 = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                        if (coordinates_3 && coordinates_3.length > 0) {
                            coordinates_3.forEach(function (coord) {
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
                    var polygon_2 = new geojson_2.Polygon();
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
            var coordinate = new geojson_4.Coordinate(coord[0], coord[1]);
            return coordinate;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    };
    return GeojsonHelpers;
}());
exports.GeojsonHelpers = GeojsonHelpers;
