import { FeatureProperty } from "./feature-property";
import { GeometryType } from "./enum";
import { Coordinate } from "./coordinate";
export declare abstract class Geometry {
    readonly featureProperties: Array<FeatureProperty>;
    readonly type: GeometryType;
    readonly id: string;
    constructor(type: GeometryType, id: string);
}
export declare class Point extends Geometry {
    readonly coordinate: Coordinate;
    constructor(lat: number, lng: number, id?: string);
}
export declare class LineString extends Geometry {
    readonly coordinates: Array<Coordinate>;
    constructor(id?: string);
}
export declare class Polygon extends Geometry {
    readonly coordinates: Array<Coordinate>;
    constructor(type: GeometryType, id?: string);
}
export declare class PolygonWithHole extends Polygon {
    readonly holes: Array<Polygon>;
    constructor(id?: string);
}
export declare class MultiPoint extends Geometry {
    readonly points: Array<Point>;
    constructor(id?: string);
}
export declare class MultiLineString extends Geometry {
    readonly LinesString: Array<LineString>;
    constructor(id?: string);
}
export declare class MultiPolygon extends Geometry {
    readonly polygons: Array<Polygon | PolygonWithHole>;
    constructor(id?: string);
}
