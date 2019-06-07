import { FeatureCollection } from "./models/geojson";
import { GeojsonHelpers } from "./geojson-helpers";

export abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {FeatureCollection}
    */
    public static parse(jsonString: string): FeatureCollection {
        try {
            if (!jsonString || jsonString == "") {
                throw new SyntaxError("jsonString can't be null or empty.");
            }
            let geoJson: any = JSON.parse(jsonString);
            return GeojsonHelpers.parse(geoJson);
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
    public static isValid(jsonString: string): boolean {
        try {
            if (!jsonString || jsonString == "") {
                return false;
            }
            let geoJson: any = JSON.parse(jsonString);
            let features: FeatureCollection = GeojsonHelpers.parse(geoJson);
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
    public static create(features: FeatureCollection): string {
        try {
            if (!features) {
                throw new SyntaxError("FeatureCollection instance can't be null.");
            }
            else {
                let geojsonObj: any = GeojsonHelpers.create(features);
                let geoJsonStr: string = JSON.stringify(geojsonObj);
                return geoJsonStr;
            }
        }
        catch (error) {
            throw error;
        }
    }
}

