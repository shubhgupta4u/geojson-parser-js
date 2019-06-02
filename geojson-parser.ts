export class GeojsonParser {
    /**
    * @Method: Parse geometries from the json string.
    * @Param {string}
    * @Return {string}
    */
    public parse(json: string): any {
        if(!json && json.length==0){
            return false;
        }
        return true;
    }
}
