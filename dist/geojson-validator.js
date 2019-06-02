"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeojsonValidator = /** @class */ (function () {
    function GeojsonValidator() {
    }
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    GeojsonValidator.prototype.isValid = function (json) {
        if (!json && json.length == 0) {
            return false;
        }
        return true;
    };
    return GeojsonValidator;
}());
exports.GeojsonValidator = GeojsonValidator;
