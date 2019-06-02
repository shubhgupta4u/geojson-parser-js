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
var geojson_helpers_1 = require("./lib/geojson-helpers");
var GeojsonValidator = /** @class */ (function (_super) {
    __extends(GeojsonValidator, _super);
    function GeojsonValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    GeojsonValidator.prototype.isValid = function (jsonString) {
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
    return GeojsonValidator;
}(geojson_helpers_1.GeojsonHelpers));
exports.GeojsonValidator = GeojsonValidator;
