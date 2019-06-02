import { FeatureProperty } from "./feature-property";
import { GeometryType } from "./enum";
import { Coordinate } from "./coordinate";

export abstract class Geometry {
    public readonly featureProperties: Array<FeatureProperty>;
    public readonly type: GeometryType;
    public readonly id: string="";
    constructor(type: GeometryType, id: string) {
        this.featureProperties = new Array<FeatureProperty>();
        this.type = type;
        if (!id && id.length > 0) {
            this.id = id;
        }
    }
}

export class Point extends Geometry {
    public readonly coordinate:Coordinate;

    constructor(lat:number,lng:number,id: string = "") {
        super(GeometryType.Point, id);
        this.coordinate = new Coordinate(lat,lng); 
    }
}
export class LineString extends Geometry {
    public readonly coordinates:Array<Coordinate>;
    constructor(id: string = "") {
        super(GeometryType.LineString, id);
        this.coordinates = new Array<Coordinate>();
    }
}
export class Polygon extends Geometry {
    public readonly coordinates:Array<Coordinate>;
    constructor(type:GeometryType,id: string = "") {
        super(type|GeometryType.Polygon, id);
        this.coordinates = new Array<Coordinate>();
    }
}
export class PolygonWithHole extends Polygon {
    public readonly holes:Array<Polygon>;
    constructor(id: string = "") {
        super(GeometryType.PolygonWithHole, id);
        this.holes = new Array<Polygon>();
    }
}
export class MultiPoint extends Geometry {
    public readonly points:Array<Point>;
    constructor(id: string = "") {
        super(GeometryType.MultiPoint, id);
        this.points = new Array<Point>();
    }
}
export class MultiLineString extends Geometry {
    public readonly LinesString:Array<LineString>;
    constructor(id: string = "") {
        super(GeometryType.MultiLineString, id);
        this.LinesString = new Array<LineString>();
    }
}
export class MultiPolygon extends Geometry {
    public readonly polygons:Array<Polygon|PolygonWithHole>;
    constructor(id: string = "") {
        super(GeometryType.MultiPoint, id);
        this.polygons = new Array<Polygon|PolygonWithHole>();  
    }
}