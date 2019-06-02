import { FeatureCollection } from "./lib/models/feature";
import { GeojsonHelpers } from "./lib/geojson-helpers";

export abstract class Geojson extends GeojsonHelpers {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    public static parse(jsonString: string): FeatureCollection {
        try{
            if(!jsonString || jsonString==""){
                throw new SyntaxError("jsonString can't be null or empty.");
            }
            let geoJson:any = JSON.parse(jsonString);
            return GeojsonHelpers.parse(geoJson);
        }
        catch(error){
            throw error;
        }
        
        return new FeatureCollection();
    }
}
