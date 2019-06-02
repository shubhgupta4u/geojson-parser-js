import { Geometry } from "./geometry";
import { FeatureProperty } from "./feature-property";

export class FeatureCollection{
    public readonly metadata:Array<FeatureProperty>;
    public readonly geometries: Array<Geometry>;
    constructor(){
        this.geometries = new  Array<Geometry>();
        this.metadata = new  Array<FeatureProperty>();
    }
}