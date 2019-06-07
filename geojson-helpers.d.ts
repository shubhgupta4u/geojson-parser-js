import { FeatureCollection } from "./models/geojson";
export declare abstract class GeojsonHelpers {
    protected static isValid(geoJson: any): boolean;
    protected static create(features: FeatureCollection): any;
    private static GetGeojsonFeatureType;
    private static GetGeojsonGeometryCoordinates;
    private static getPolygonCoordinate;
    private static getPolygonWithHoleCoordinate;
    protected static parse(geoJson: any): FeatureCollection;
    private static parseFeature;
    private static getProperties;
    private static getPoint;
    private static getMultiPoint;
    private static getLineString;
    private static getMultiLineString;
    private static getPolygon;
    private static getMultiPolygon;
    private static getCoordinates;
    private static getCoordinate;
}
