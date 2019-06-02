"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeatureCollection = /** @class */ (function () {
    function FeatureCollection(type) {
        if (type === void 0) { type = ""; }
        this.geometries = new Array();
        this.metadata = new Array();
        if (type == "") {
            type = "FeatureCollection";
        }
        this.type = type;
    }
    return FeatureCollection;
}());
exports.FeatureCollection = FeatureCollection;
