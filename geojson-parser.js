"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_helpers_1 = require("./geojson-helpers");
class Geojson extends geojson_helpers_1.GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {FeatureCollection}
    */
    static parse(jsonString) {
        try {
            if (!jsonString || jsonString == "") {
                throw new SyntaxError("jsonString can't be null or empty.");
            }
            let geoJson = JSON.parse(jsonString);
            return geojson_helpers_1.GeojsonHelpers.parse(geoJson);
        }
        catch (error) {
            throw error;
        }
    }
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {boolean}
    */
    static isValid(jsonString) {
        try {
            if (!jsonString || jsonString == "") {
                return false;
            }
            let geoJson = JSON.parse(jsonString);
            let features = geojson_helpers_1.GeojsonHelpers.parse(geoJson);
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
    }
    /**
    * @Method: create a geojson string from the FeatureCollection instance.
    * @Param {FeatureCollection}
    * @Return {string}
    */
    static create(features) {
        try {
            if (!features) {
                throw new SyntaxError("FeatureCollection instance can't be null.");
            }
            else {
                let geojsonObj = geojson_helpers_1.GeojsonHelpers.create(features);
                let geoJsonStr = JSON.stringify(geojsonObj);
                return geoJsonStr;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Geojson = Geojson;
