import { Geometry } from "./geometry";
import { FeatureProperty } from "./feature-property";
export declare class FeatureCollection {
    readonly type: string;
    readonly metadata: Array<FeatureProperty>;
    readonly geometries: Array<Geometry>;
    constructor(type?: string);
}
