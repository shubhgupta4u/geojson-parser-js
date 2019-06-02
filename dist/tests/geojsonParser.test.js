"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var geojson_parser_1 = require("../geojson-parser");
var feature_1 = require("../lib/models/feature");
var geojsonSample1 = __importStar(require("./sample-geojson/sample1.json"));
var geojsonSample2 = __importStar(require("./sample-geojson/sample2.json"));
var geojsonSample3 = __importStar(require("./sample-geojson/sample3.json"));
var geojsonSample4 = __importStar(require("./sample-geojson/sample4.json"));
var enum_1 = require("../lib/models/enum");
var geometry_1 = require("../lib/models/geometry");
describe('Geojson', function () {
    it('parseGeojsonWithNoFeature', function () {
        var validGeojson = '{ "type": "FeatureCollection",  "features": [] }';
        var result = geojson_parser_1.Geojson.parse(validGeojson);
        chai_1.expect(result).instanceOf(feature_1.FeatureCollection);
        chai_1.expect(result.geometries).to.have.lengthOf(0);
    });
    it('parseEmptyGeojson', function () {
        var invalidGeojson = "";
        chai_1.expect(function () {
            geojson_parser_1.Geojson.parse(invalidGeojson);
        }).to.throw(SyntaxError);
    });
    it('parseGeojsonWithEmptyFeatureCollection', function () {
        var geojsonStr = JSON.stringify(geojsonSample1);
        var result = geojson_parser_1.Geojson.parse(geojsonStr);
        chai_1.should().exist(result);
        chai_1.expect(result.geometries).to.have.lengthOf(0);
    });
    it('parseGeojsonWithSimpleFeature', function () {
        var geojsonStr = JSON.stringify(geojsonSample3);
        var result = geojson_parser_1.Geojson.parse(geojsonStr);
        chai_1.should().exist(result);
        chai_1.expect(result.geometries).to.have.lengthOf(1);
        chai_1.expect(result.geometries[0].featureProperties).to.have.lengthOf(1);
        chai_1.expect(result.geometries[0]).instanceOf(geometry_1.Point);
        chai_1.should().exist(result.geometries[0].coordinate);
        chai_1.expect(result.geometries[0].type).equals(enum_1.GeometryType.Point);
    });
    it('parseGeojsonWithSimpleFeatureCollection', function () {
        var geojsonStr = JSON.stringify(geojsonSample4);
        var result = geojson_parser_1.Geojson.parse(geojsonStr);
        chai_1.should().exist(result);
        chai_1.expect(result.geometries).to.have.lengthOf(2);
        chai_1.expect(result.geometries[0].featureProperties).to.have.lengthOf(26);
        chai_1.expect(result.geometries[0]).instanceOf(geometry_1.Point);
        chai_1.should().exist(result.geometries[0].coordinate);
        chai_1.expect(result.geometries[0].type).equals(enum_1.GeometryType.Point);
        chai_1.expect(result.geometries[1].featureProperties).to.have.lengthOf(22);
        chai_1.expect(result.geometries[1]).instanceOf(geometry_1.MultiPolygon);
        chai_1.expect(result.geometries[1].polygons).to.have.lengthOf(1);
        chai_1.expect(result.geometries[1].polygons[0].coordinates).to.have.lengthOf(40);
        chai_1.expect(result.geometries[1].type).equals(enum_1.GeometryType.MultiPolygon);
    });
    it('parseGeojsonWithComplexFeatureCollection', function () {
        var geojsonStr = JSON.stringify(geojsonSample2);
        var result = geojson_parser_1.Geojson.parse(geojsonStr);
        chai_1.expect(result).instanceOf(feature_1.FeatureCollection);
        chai_1.should().exist(result);
        chai_1.expect(result.geometries).to.have.lengthOf(23);
        chai_1.expect(result.geometries[0].featureProperties).to.have.lengthOf(31);
        chai_1.expect(result.geometries[0]).instanceOf(geometry_1.Point);
        chai_1.should().exist(result.geometries[0].coordinate);
        chai_1.expect(result.geometries[0].type).equals(enum_1.GeometryType.Point);
        chai_1.expect(result.geometries[1].featureProperties).to.have.lengthOf(12);
        chai_1.expect(result.geometries[1]).instanceOf(geometry_1.Polygon);
        chai_1.expect(result.geometries[1].coordinates).to.have.lengthOf(204);
        chai_1.expect(result.geometries[1].type).equals(enum_1.GeometryType.Polygon);
        chai_1.expect(result.geometries[12].featureProperties).to.have.lengthOf(12);
        chai_1.expect(result.geometries[12]).instanceOf(geometry_1.LineString);
        chai_1.expect(result.geometries[12].coordinates).to.have.lengthOf(2);
        chai_1.expect(result.geometries[12].type).equals(enum_1.GeometryType.LineString);
    });
});
