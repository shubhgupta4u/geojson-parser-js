import { GeojsonHelpers } from "./lib/geojson-helpers";
export declare class GeojsonValidator extends GeojsonHelpers {
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    isValid(jsonString: string): boolean;
}
