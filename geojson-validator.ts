import { GeojsonHelpers } from "./lib/geojson-helpers";
import { FeatureCollection } from "./lib/models/feature";

export abstract class GeojsonValidator extends GeojsonHelpers{
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    public static isValid(jsonString: string): boolean {
        try{
            if(!jsonString || jsonString==""){
                return false;
            }
            let geoJson:any = JSON.parse(jsonString);
            let features :FeatureCollection = GeojsonHelpers.parse(geoJson);
            if(features){
                return true;
            }
            else{
                return false;
            }
        }
        catch(error){
            return false;
        }
    }
}
