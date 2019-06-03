import { FeatureCollection } from "./models/geojson";
import { GeojsonHelpers } from "./lib/geojson-helpers";

export abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
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

        return new FeatureCollection();
    }

    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
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
}
