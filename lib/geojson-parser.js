"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var geojson_helpers_1 = require("./geojson-helpers");
var Geojson = /** @class */ (function (_super) {
    __extends(Geojson, _super);
    function Geojson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {FeatureCollection}
    */
    Geojson.parse = function (jsonString) {
        try {
            if (!jsonString || jsonString == "") {
                throw new SyntaxError("jsonString can't be null or empty.");
            }
            var geoJson = JSON.parse(jsonString);
            return geojson_helpers_1.GeojsonHelpers.parse(geoJson);
        }
        catch (error) {
            throw error;
        }
    };
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {boolean}
    */
    Geojson.isValid = function (jsonString) {
        try {
            if (!jsonString || jsonString == "") {
                return false;
            }
            var geoJson = JSON.parse(jsonString);
            var features = geojson_helpers_1.GeojsonHelpers.parse(geoJson);
            if (features) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    };
    /**
    * @Method: create a geojson string from the FeatureCollection instance.
    * @Param {FeatureCollection}
    * @Return {string}
    */
    Geojson.create = function (features) {
        try {
            if (!features) {
                throw new SyntaxError("FeatureCollection instance can't be null.");
            }
            else {
                var geojsonObj = geojson_helpers_1.GeojsonHelpers.create(features);
                var geoJsonStr = JSON.stringify(geojsonObj);
                return geoJsonStr;
            }
        }
        catch (error) {
            throw error;
        }
    };
    return Geojson;
}(geojson_helpers_1.GeojsonHelpers));
exports.Geojson = Geojson;
