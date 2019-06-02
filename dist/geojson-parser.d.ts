import { FeatureCollection } from "./lib/models/feature";
import { GeojsonHelpers } from "./lib/geojson-helpers";
export declare abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    static parse(jsonString: string): FeatureCollection;
}
