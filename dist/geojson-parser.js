"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feature_1 = require("./lib/models/feature");
var Geojson = /** @class */ (function () {
    function Geojson() {
    }
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    Geojson.prototype.parse = function (json) {
        if (!json && json.length == 0) {
            return null;
        }
        return new feature_1.FeatureCollection();
    };
    return Geojson;
}());
exports.Geojson = Geojson;
