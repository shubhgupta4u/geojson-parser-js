export declare enum GeometryType {
    Point = 0,
    LineString = 1,
    Polygon = 2,
    PolygonWithHole = 3,
    MultiPoint = 4,
    MultiLineString = 5,
    MultiPolygon = 6
}
export declare class Coordinate {
    readonly lat: number;
    readonly lng: number;
    constructor(lng: number, lat: number);
}
export declare class FeatureCollection {
    readonly metadata: Array<FeatureProperty>;
    readonly geometries: Array<Geometry>;
    constructor();
}
export declare class FeatureProperty {
    readonly key: string;
    readonly value: string;
    constructor(key: string, value: string);
}
export declare abstract class Geometry {
    readonly featureProperties: Array<FeatureProperty>;
    readonly type: GeometryType;
    readonly id: string;
    constructor(type: GeometryType, id: string);
}
export declare class Point extends Geometry {
    readonly coordinate: Coordinate;
    constructor(coordinate: Coordinate, id?: string);
}
export declare class LineString extends Geometry {
    readonly coordinates: Array<Coordinate>;
    constructor(id?: string);
}
export declare class Polygon extends Geometry {
    readonly coordinates: Array<Coordinate>;
    constructor(id?: string, type?: GeometryType);
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
