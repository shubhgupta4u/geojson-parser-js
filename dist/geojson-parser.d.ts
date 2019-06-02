import { FeatureCollection } from "./lib/models/feature";
import { GeojsonHelpers } from "./lib/geojson-helpers";
export declare abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    static parse(jsonString: string): FeatureCollection;
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    static isValid(jsonString: string): boolean;
}
