import { FeatureCollection } from "./models/geojson";
import { GeojsonHelpers } from "./geojson-helpers";
export declare abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {FeatureCollection}
    */
    static parse(jsonString: string): FeatureCollection;
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {boolean}
    */
    static isValid(jsonString: string): boolean;
    /**
    * @Method: create a geojson string from the FeatureCollection instance.
    * @Param {FeatureCollection}
    * @Return {string}
    */
    static create(features: FeatureCollection): string;
}
