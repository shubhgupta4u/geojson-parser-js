"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var geojson_parser_1 = require("../geojson-parser");
describe('validateGeojson', function () {
    it('validGeojsonWithNoFeature', function () {
        var validGeojson = '{ "type": "FeatureCollection",  "features": [] }';
        var result = geojson_parser_1.Geojson.isValid(validGeojson);
        chai_1.expect(result).equal(true);
    });
    it('emptyGeojson', function () {
        var invalidGeojson = "";
        var result = geojson_parser_1.Geojson.isValid(invalidGeojson);
        chai_1.expect(result).equal(false);
    });
});
