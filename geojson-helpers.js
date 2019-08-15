"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("./models/geojson");
const geojson_2 = require("./models/geojson");
const geojson_3 = require("./models/geojson");
const geojson_4 = require("./models/geojson");
class GeojsonHelpers {
    static isValid(geoJson) {
        if (geoJson.type && (geoJson.type.toLowerCase() == "featurecollection" || geoJson.type.toLowerCase() == "feature")
            && ((geoJson.type.toLowerCase() == "featurecollection" && geoJson.features && geoJson.features instanceof Array)
                || (geoJson.type.toLowerCase() == "feature" && geoJson.geometry && geoJson.geometry.type && geoJson.geometry.coordinates))) {
            return true;
        }
        return false;
    }
    //Start of methods for creating geojson object from FeatureCollection instance
    static create(features) {
        {
            try {
                let geojsonObj = {};
                geojsonObj.type = "FeatureCollection";
                geojsonObj.features = new Array();
                if (features) {
                    if (features.metadata && features.metadata.length > 0) {
                        geojsonObj.metadata = {};
                        features.metadata.forEach((metadata) => {
                            geojsonObj.metadata[metadata.key] = metadata.value;
                        });
                    }
                    if (features.geometries && features.geometries.length > 0) {
                        features.geometries.forEach((geometry) => {
                            let feature = {};
                            feature.type = "Feature";
                            if (geometry.id && geometry.id != "") {
                                feature.id = geometry.id;
                            }
                            feature.properties = {};
                            if (geometry.featureProperties && geometry.featureProperties.length > 0) {
                                geometry.featureProperties.forEach((property) => {
                                    feature.properties[property.key] = property.value;
                                });
                            }
                            feature.geometry = {};
                            feature.geometry.type = GeojsonHelpers.GetGeojsonFeatureType(geometry.type);
                            feature.geometry.coordinates = GeojsonHelpers.GetGeojsonGeometryCoordinates(geometry);
                            geojsonObj.features.push(feature);
                        });
                    }
                }
                return geojsonObj;
            }
            catch (error) {
                throw error;
            }
        }
    }
    static GetGeojsonFeatureType(type) {
        switch (type) {
            case geojson_2.GeometryType.Point: return "Point";
            case geojson_2.GeometryType.LineString: return "LineString";
            case geojson_2.GeometryType.Polygon: return "Polygon";
            case geojson_2.GeometryType.PolygonWithHole: return "Polygon";
            case geojson_2.GeometryType.MultiPoint: return "MultiPoint";
            case geojson_2.GeometryType.MultiLineString: return "MultiLineString";
            case geojson_2.GeometryType.MultiPolygon: return "MultiPolygon";
        }
    }
    static GetGeojsonGeometryCoordinates(geometry) {
        let coordinates = new Array();
        try {
            switch (geometry.type) {
                case geojson_2.GeometryType.Point:
                    let point = geometry;
                    if (point.coordinate) {
                        coordinates.push(point.coordinate.lat);
                        coordinates.push(point.coordinate.lng);
                    }
                    break;
                case geojson_2.GeometryType.LineString:
                    let lineString = geometry;
                    if (lineString.coordinates) {
                        lineString.coordinates.forEach((coord) => {
                            let innerCoordinates = new Array();
                            innerCoordinates.push(coord.lat);
                            innerCoordinates.push(coord.lng);
                            coordinates.push(innerCoordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.Polygon:
                    let polygon = geometry;
                    if (polygon.coordinates) {
                        coordinates = GeojsonHelpers.getPolygonCoordinate(polygon);
                    }
                    break;
                case geojson_2.GeometryType.PolygonWithHole:
                    let polygonWithHole = geometry;
                    if (polygonWithHole.coordinates) {
                        coordinates = GeojsonHelpers.getPolygonWithHoleCoordinate(polygonWithHole);
                    }
                    break;
                case geojson_2.GeometryType.MultiPoint:
                    let multiPoint = geometry;
                    if (multiPoint.points) {
                        multiPoint.points.forEach((point) => {
                            let innerCoordinates = new Array();
                            if (point.coordinate) {
                                innerCoordinates.push(point.coordinate.lat);
                                innerCoordinates.push(point.coordinate.lng);
                            }
                            coordinates.push(innerCoordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.MultiLineString:
                    let multiLineString = geometry;
                    if (multiLineString.LinesString && multiLineString.LinesString.length > 0) {
                        multiLineString.LinesString.forEach((lineString) => {
                            let child1Coordinates = new Array();
                            lineString.coordinates.forEach((coord) => {
                                let innerCoordinates = new Array();
                                innerCoordinates.push(coord.lat);
                                innerCoordinates.push(coord.lng);
                                child1Coordinates.push(innerCoordinates);
                            });
                            coordinates.push(child1Coordinates);
                        });
                    }
                    break;
                case geojson_2.GeometryType.MultiPolygon:
                    let multiPolygon = geometry;
                    if (multiPolygon.polygons && multiPolygon.polygons.length > 0) {
                        multiPolygon.polygons.forEach((polygon) => {
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
    }
    static getPolygonCoordinate(polygon) {
        try {
            let coordinates = new Array();
            if (polygon.coordinates) {
                let child1Coordinates = new Array();
                polygon.coordinates.forEach((coord) => {
                    let innerCoordinates = new Array();
                    innerCoordinates.push(coord.lat);
                    innerCoordinates.push(coord.lng);
                    child1Coordinates.push(innerCoordinates);
                });
                coordinates.push(child1Coordinates);
                return coordinates;
            }
            else {
                throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
            }
        }
        catch (error) {
            throw error;
        }
    }
    static getPolygonWithHoleCoordinate(polygonWithHole) {
        try {
            let coordinates = new Array();
            if (polygonWithHole.coordinates) {
                let child1Coordinates = new Array();
                polygonWithHole.coordinates.forEach((coord) => {
                    let innerCoordinates = new Array();
                    innerCoordinates.push(coord.lat);
                    innerCoordinates.push(coord.lng);
                    child1Coordinates.push(innerCoordinates);
                });
                coordinates.push(child1Coordinates);
                if (polygonWithHole.holes && polygonWithHole.holes.length > 0) {
                    polygonWithHole.holes.forEach((polygon) => {
                        child1Coordinates = new Array();
                        polygon.coordinates.forEach((coord) => {
                            let innerCoordinates = new Array();
                            innerCoordinates.push(coord.lat);
                            innerCoordinates.push(coord.lng);
                            child1Coordinates.push(innerCoordinates);
                        });
                        coordinates.push(child1Coordinates);
                    });
                }
                return coordinates;
            }
            else {
                throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
            }
        }
        catch (error) {
            throw error;
        }
    }
    //End of methods for creating geojson geojson object from FeatureCollection instance
    //Start of methods for reading geometries from geojson object
    static parse(geoJson) {
        {
            try {
                if (!GeojsonHelpers.isValid(geoJson)) {
                    throw new SyntaxError("geoJson string is not valid.");
                }
                let features = new geojson_1.FeatureCollection();
                let featureArray;
                if (geoJson.features) {
                    featureArray = geoJson.features;
                }
                else {
                    featureArray = new Array();
                    featureArray.push(geoJson);
                }
                if (featureArray.length > 0) {
                    featureArray.forEach((feature) => {
                        let geometry = GeojsonHelpers.parseFeature(feature);
                        if (geometry) {
                            features.geometries.push(geometry);
                        }
                    });
                }
                let featureProperties = GeojsonHelpers.getProperties(geoJson.metadata);
                if (featureProperties && featureProperties.length > 0) {
                    featureProperties.forEach((property) => {
                        features.metadata.push(property);
                    });
                }
                // console.log(features);
                return features;
            }
            catch (error) {
                throw error;
            }
        }
    }
    static parseFeature(feature) {
        let geometry;
        let inputGeom;
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
            let featureProperties = GeojsonHelpers.getProperties(feature.properties);
            if (featureProperties && featureProperties.length > 0) {
                featureProperties.forEach((property) => {
                    geometry.featureProperties.push(property);
                });
            }
        }
        catch (error) {
            throw error;
        }
        return geometry;
    }
    static getProperties(properties) {
        try {
            let featureProperties = new Array();
            if (properties) {
                let propertyKeyArray = Object.keys(properties);
                if (propertyKeyArray != null && propertyKeyArray.length > 0) {
                    propertyKeyArray.forEach((key) => {
                        featureProperties.push(new geojson_3.FeatureProperty(key, properties[key]));
                    });
                }
            }
            return featureProperties;
        }
        catch (error) {
            throw error;
        }
    }
    static getPoint(geometry) {
        let coord = GeojsonHelpers.getCoordinate(geometry.coordinates);
        let point = new geojson_2.Point(coord, geometry.id);
        return point;
    }
    static getMultiPoint(geometry) {
        let multiPoint = new geojson_2.MultiPoint(geometry.id);
        let coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach((coord) => {
                multiPoint.points.push(new geojson_2.Point(coord));
            });
        }
        return multiPoint;
    }
    static getLineString(geometry) {
        let lineString = new geojson_2.LineString(geometry.id);
        let coordinates = GeojsonHelpers.getCoordinates(geometry.coordinates);
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach((coord) => {
                lineString.coordinates.push(coord);
            });
        }
        return lineString;
    }
    static getMultiLineString(geometry) {
        let multiLineString = new geojson_2.MultiLineString(geometry.id);
        let multiLinestringCoords = geometry.coordinates;
        if (multiLinestringCoords && multiLinestringCoords.length > 0) {
            multiLinestringCoords.forEach((linestringCoords) => {
                let lineString = new geojson_2.LineString();
                let coordinates = GeojsonHelpers.getCoordinates(linestringCoords);
                if (coordinates && coordinates.length > 0) {
                    coordinates.forEach((coord) => {
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
    }
    static getPolygon(geometry) {
        let polygonCoords = geometry.coordinates;
        if (polygonCoords.length > 1) {
            let polygonWithHole = new geojson_2.PolygonWithHole();
            let coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
            if (coordinates && coordinates.length > 0) {
                coordinates.forEach((coord) => {
                    polygonWithHole.coordinates.push(coord);
                });
            }
            for (let index = 1; index < polygonCoords.length; index++) {
                let polygon = new geojson_2.Polygon();
                let coordinates = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                if (coordinates && coordinates.length > 0) {
                    coordinates.forEach((coord) => {
                        polygon.coordinates.push(coord);
                    });
                }
                polygonWithHole.holes.push(polygon);
            }
            return polygonWithHole;
        }
        else if (polygonCoords.length == 1) {
            let polygon = new geojson_2.Polygon();
            let coordinates = GeojsonHelpers.getCoordinates(polygonCoords[0]);
            if (coordinates && coordinates.length > 0) {
                coordinates.forEach((coord) => {
                    polygon.coordinates.push(coord);
                });
            }
            return polygon;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    }
    static getMultiPolygon(geometry) {
        let multiPolygon = new geojson_2.MultiPolygon(geometry.id);
        if (geometry.coordinates && geometry.coordinates.length > 0) {
            let coordinates = geometry.coordinates;
            coordinates.forEach((multipolygonCoords) => {
                if (multipolygonCoords.length == 1) {
                    multipolygonCoords.forEach((polygonCoords) => {
                        if (polygonCoords.length > 1) {
                            let coordinates = GeojsonHelpers.getCoordinates(polygonCoords);
                            if (coordinates && coordinates.length > 0) {
                                let polygon = new geojson_2.Polygon();
                                coordinates.forEach((coord) => {
                                    polygon.coordinates.push(coord);
                                });
                                multiPolygon.polygons.push(polygon);
                            }
                        }
                    });
                }
                else if (multipolygonCoords.length > 1) {
                    let polygonWithHole = new geojson_2.PolygonWithHole();
                    let coordinates = GeojsonHelpers.getCoordinates(multipolygonCoords[0]);
                    if (coordinates && coordinates.length > 0) {
                        coordinates.forEach((coord) => {
                            polygonWithHole.coordinates.push(coord);
                        });
                    }
                    for (let index = 1; index < multipolygonCoords.length; index++) {
                        let coordinates = GeojsonHelpers.getCoordinates(multipolygonCoords[index]);
                        if (coordinates && coordinates.length > 0) {
                            let polygon = new geojson_2.Polygon();
                            coordinates.forEach((coord) => {
                                polygon.coordinates.push(coord);
                            });
                            polygonWithHole.holes.push(polygon);
                        }
                    }
                    multiPolygon.polygons.push(polygonWithHole);
                }
            });
        }
        return multiPolygon;
    }
    static getCoordinates(coords) {
        let coordinates = new Array();
        if (coords && coords.length > 0) {
            coords.forEach((coord) => {
                coordinates.push(GeojsonHelpers.getCoordinate(coord));
            });
        }
        return coordinates;
    }
    static getCoordinate(coord) {
        if (coord && coord.length >= 2) {
            let coordinate = new geojson_4.Coordinate(coord[0], coord[1]);
            return coordinate;
        }
        else {
            throw new SyntaxError("Coordinate value is invalid");
        }
    }
}
exports.GeojsonHelpers = GeojsonHelpers;
