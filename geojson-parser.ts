import { FeatureCollection } from "./lib/models/feature";

export abstract class Geojson {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    public static parse(json: string): FeatureCollection|null {
        if(!json && json.length==0){
            return null;
        }
        return new FeatureCollection();
    }
}
