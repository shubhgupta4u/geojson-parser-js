"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var geojson_validator_1 = require("../geojson-validator");
describe('validateGeojson', function () {
    var validator = new geojson_validator_1.GeojsonValidator();
    it('validGeojsonWithNoFeature', function () {
        var validGeojson = '{ "type": "FeatureCollection",  "features": [] }';
        var result = validator.isValid(validGeojson);
        chai_1.expect(result).equal(true);
    });
    it('emptyGeojson', function () {
        var invalidGeojson = "";
        var result = validator.isValid(invalidGeojson);
        chai_1.expect(result).equal(false);
    });
});
