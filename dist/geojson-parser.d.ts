import { FeatureCollection } from "./lib/models/feature";
export declare class Geojson {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    parse(json: string): FeatureCollection | null;
}
