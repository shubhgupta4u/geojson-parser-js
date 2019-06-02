"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeojsonParser = /** @class */ (function () {
    function GeojsonParser() {
    }
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    GeojsonParser.prototype.parse = function (json) {
        if (!json && json.length == 0) {
            return false;
        }
        return true;
    };
    return GeojsonParser;
}());
exports.GeojsonParser = GeojsonParser;
