import { Geometry } from "./geometry";
import { FeatureProperty } from "./feature-property";

export class FeatureCollection{
    public readonly type:string;
    public readonly metadata:Array<FeatureProperty>;
    public readonly geometries: Array<Geometry>;
    constructor(type:string=""){
        this.geometries = new  Array<Geometry>();
        this.metadata = new  Array<FeatureProperty>();
        if(type==""){
            type = "FeatureCollection";
        }
        this.type =type;
    }
}