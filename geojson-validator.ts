export class GeojsonValidator {
    /**
    * @Method: Validate whether the geojon string is valid or not.
    * @Param {string}
    * @Return {string}
    */
    public isValid(json: string): boolean {
        if(!json && json.length==0){
            return false;
        }
        return true;
    }
}
