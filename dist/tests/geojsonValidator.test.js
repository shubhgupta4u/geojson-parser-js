"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var GeojsonValidator_1 = require("../GeojsonValidator");
describe('validateGeojson', function () {
    var validator = new GeojsonValidator_1.GeojsonValidator();
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
