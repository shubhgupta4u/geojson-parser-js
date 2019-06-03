export enum GeometryType {
    Point,
    LineString,
    Polygon,
    PolygonWithHole,
    MultiPoint,
    MultiLineString,
    MultiPolygon
}
export class Coordinate {
    public readonly lat: number;
    public readonly lng: number;
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
}
export class FeatureCollection {
    public readonly metadata: Array<FeatureProperty>;
    public readonly geometries: Array<Geometry>;
    constructor() {
        this.geometries = new Array<Geometry>();
        this.metadata = new Array<FeatureProperty>();
    }
}
export class FeatureProperty {
    public readonly key: string;
    public readonly value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
export abstract class Geometry {
    public readonly featureProperties: Array<FeatureProperty>;
    public readonly type: GeometryType;
    public readonly id: string = "";
    constructor(type: GeometryType, id: string) {
        this.featureProperties = new Array<FeatureProperty>();
        this.type = type;
        this.id = id;
    }
}

export class Point extends Geometry {
    public readonly coordinate: Coordinate;

    constructor(lat: number, lng: number, id: string = "") {
        super(GeometryType.Point, id);
        this.coordinate = new Coordinate(lat, lng);
    }
}
export class LineString extends Geometry {
    public readonly coordinates: Array<Coordinate>;
    constructor(id: string = "") {
        super(GeometryType.LineString, id);
        this.coordinates = new Array<Coordinate>();
    }
}
export class Polygon extends Geometry {
    public readonly coordinates: Array<Coordinate>;
    constructor(id: string = "", type: GeometryType = GeometryType.Polygon) {
        super(type, id);
        this.coordinates = new Array<Coordinate>();
    }
}
export class PolygonWithHole extends Polygon {
    public readonly holes: Array<Polygon>;
    constructor(id: string = "") {
        super(id, GeometryType.PolygonWithHole);
        this.holes = new Array<Polygon>();
    }
}
export class MultiPoint extends Geometry {
    public readonly points: Array<Point>;
    constructor(id: string = "") {
        super(GeometryType.MultiPoint, id);
        this.points = new Array<Point>();
    }
}
export class MultiLineString extends Geometry {
    public readonly LinesString: Array<LineString>;
    constructor(id: string = "") {
        super(GeometryType.MultiLineString, id);
        this.LinesString = new Array<LineString>();
    }
}
export class MultiPolygon extends Geometry {
    public readonly polygons: Array<Polygon | PolygonWithHole>;
    constructor(id: string = "") {
        super(GeometryType.MultiPolygon, id);
        this.polygons = new Array<Polygon | PolygonWithHole>();
    }
}