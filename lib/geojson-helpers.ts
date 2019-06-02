import { FeatureCollection } from "./models/feature";
import { Polygon, Geometry, Point, LineString, MultiPoint, MultiLineString, MultiPolygon, PolygonWithHole } from "./models/geometry";
import { FeatureProperty } from "./models/feature-property";
import { Coordinate } from "./models/coordinate";

export abstract class GeojsonHelpers {   
   protected static isValid(geoJson: any): boolean {
      if (geoJson.type && (geoJson.type.toLowerCase() == "featurecollection" || geoJson.type.toLowerCase() == "feature")
         && (
            (geoJson.type.toLowerCase() == "featurecollection" && geoJson.features && geoJson.features instanceof Array)
            || (geoJson.type.toLowerCase() == "feature" && geoJson.geometry && geoJson.geometry.type && geoJson.geometry.coordinates)
         )
      ) {
         return true;
      }
      return false;
   }
   protected static parse(geoJson: any): FeatureCollection {
      {
         try {

            if (!GeojsonHelpers.isValid(geoJson)) {
               throw new SyntaxError("geoJson string is not valid.");
            }
            let features: FeatureCollection = new FeatureCollection();

            let featureArray: Array<any>;
            if (geoJson.features) {
               featureArray = geoJson.features;
            } else {
               featureArray = new Array<any>();
               featureArray.push(geoJson);
            }

            if (featureArray.length > 0) {
               featureArray.forEach((feature: any) => {
                  let geometry: Geometry = GeojsonHelpers.parseFeature(feature);
                  if (geometry) {
                     features.geometries.push(geometry);
                  }
               });
            }

            let featureProperties: Array<FeatureProperty> = GeojsonHelpers.getProperties(geoJson.metadata);
            if (featureProperties && featureProperties.length > 0) {
               featureProperties.forEach((property: FeatureProperty) => {
                  features.metadata.push(property);
               });
            }

            // console.log(features);
            return features;
         } catch (error) {
            throw error;
         }
      }
   }
   private static parseFeature(feature: any): Geometry {
      let geometry: Geometry;
      let inputGeom: any;
      try {
         if (feature.type.toLowerCase() == "feature" && feature.geometry) {
            inputGeom = feature.geometry;
         }
         else {
            throw new SyntaxError("geoJson string is not valid.");
         }

         switch (inputGeom.type.toLowerCase()) {
            case "point":
               geometry = GeojsonHelpers.getPoint(inputGeom);
               break;
            case "linestring":
               geometry = GeojsonHelpers.getLineString(inputGeom);
               break;
            case "polygon":
               geometry = GeojsonHelpers.getPolygon(inputGeom);
               break;
            case "multipoint":
               geometry = GeojsonHelpers.getMultiPoint(inputGeom);
               break;
            case "multilinestring":
               geometry = GeojsonHelpers.getMultiLineString(inputGeom);
               break;
            case "multipolygon":
               geometry = GeojsonHelpers.getMultiPolygon(inputGeom);
               break;
            default:
               throw new SyntaxError("Feature type '" + inputGeom.type + "' is not supported.");
         }

         let featureProperties: Array<FeatureProperty> = GeojsonHelpers.getProperties(feature.properties);
         if (featureProperties && featureProperties.length > 0) {
            featureProperties.forEach((property: FeatureProperty) => {
               geometry.featureProperties.push(property);
            });
         }
      }
      catch (error) {
         throw error;
      }
      return geometry;
   }
   private static getProperties(properties: any): Array<FeatureProperty> {
      try {
         let featureProperties: Array<FeatureProperty> = new Array<FeatureProperty>();
         if (properties) {
            let propertyKeyArray: Array<string> = Object.keys(properties);
            if (propertyKeyArray != null && propertyKeyArray.length > 0) {
               propertyKeyArray.forEach((key: string) => {
                  featureProperties.push(new FeatureProperty(key, properties[key]));
               });
            }
         }
         return featureProperties;
      }
      catch (error) {
         throw error;
      }
   }
   private static getPoint(geometry: any): Geometry {
      let coord: Coordinate = GeojsonHelpers.getCoordinate(geometry.coordinates);
      let point: Point = new Point(coord.lat, coord.lng, geometry.id);
      return point;
   }
   private static getMultiPoint(geometry: any): Geometry {
      let multiPoint: MultiPoint = new MultiPoint(geometry.id);
      let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(geometry.coordinates);
      if (coordinates && coordinates.length > 0) {
         coordinates.forEach((coord: Coordinate) => {
            multiPoint.points.push(new Point(coord.lat, coord.lng));
         })
      }
      return multiPoint;
   }
   private static getLineString(geometry: any): Geometry {
      let lineString: LineString = new LineString(geometry.id);
      let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(geometry.coordinates);
      if (coordinates && coordinates.length > 0) {
         coordinates.forEach((coord: Coordinate) => {
            lineString.coordinates.push(coord);
         })
      }
      return lineString;
   }
   private static getMultiLineString(geometry: any): Geometry {
      let multiLineString:MultiLineString = new MultiLineString(geometry.id);
      let multiLinestringCoords: Array<any> = geometry.coordinates;
      if (multiLinestringCoords && multiLinestringCoords.length > 0) {
         multiLinestringCoords.forEach((linestringCoords:Array<any>)=>{
            let lineString: LineString = new LineString();
            let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(linestringCoords);
            if (coordinates && coordinates.length > 0) {
               coordinates.forEach((coord: Coordinate) => {
                  lineString.coordinates.push(coord);
               })
            }
            multiLineString.LinesString.push(lineString);
         });
         return multiLineString;
      } else {
         throw new SyntaxError("Coordinate value is invalid");
      }
   }
   private static getPolygon(geometry: any): Geometry {
      let polygonCoords: Array<any> = geometry.coordinates;
      if (polygonCoords.length > 1) {
         let polygonWithHole: PolygonWithHole = new PolygonWithHole();
         let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[0]);
         if (coordinates && coordinates.length > 0) {
            coordinates.forEach((coord: Coordinate) => {
               polygonWithHole.coordinates.push(coord);
            })
         }
         for (let index = 1; index < polygonCoords.length; index++) {
            let polygon: Polygon = new Polygon();
            let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[index]);
            if (coordinates && coordinates.length > 0) {
               coordinates.forEach((coord: Coordinate) => {
                  polygon.coordinates.push(coord);
               })
            }
            polygonWithHole.holes.push(polygon);
         }
         return polygonWithHole;
      }
      else if (polygonCoords.length == 1) {
         let polygon: Polygon = new Polygon();
         let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[0]);
         if (coordinates && coordinates.length > 0) {
            coordinates.forEach((coord: Coordinate) => {
               polygon.coordinates.push(coord);
            })
         }
         return polygon;
      } else {
         throw new SyntaxError("Coordinate value is invalid");
      }
   }
   private static getMultiPolygon(geometry: any): Geometry {
      let multiPolygon: MultiPolygon = new MultiPolygon(geometry.id);
      if (geometry.coordinates && geometry.coordinates.length > 0) {
         let multiPolygonCoords: Array<any> = geometry.coordinates;
         multiPolygonCoords.forEach((polygonCoords: Array<any>) => {
            if (polygonCoords.length > 1) {
               let polygonWithHole: PolygonWithHole = new PolygonWithHole();
               let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[0]);
               if (coordinates && coordinates.length > 0) {
                  coordinates.forEach((coord: Coordinate) => {
                     polygonWithHole.coordinates.push(coord);
                  })
               }
               for (let index = 1; index < polygonCoords.length; index++) {
                  let polygon: Polygon = new Polygon();
                  let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[index]);
                  if (coordinates && coordinates.length > 0) {
                     coordinates.forEach((coord: Coordinate) => {
                        polygon.coordinates.push(coord);
                     })
                  }
                  polygonWithHole.holes.push(polygon);
               }
               multiPolygon.polygons.push(polygonWithHole);
            }
            else if (polygonCoords.length == 1) {
               let polygon: Polygon = new Polygon();
               let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords[0]);
               if (coordinates && coordinates.length > 0) {
                  coordinates.forEach((coord: Coordinate) => {
                     polygon.coordinates.push(coord);
                  })
               }
               multiPolygon.polygons.push(polygon);
            }
         });
      }
      return multiPolygon;
   }
   private static getCoordinates(coords: Array<any>): Array<Coordinate> {
      let coordinates: Array<Coordinate> = new Array<Coordinate>();
      if (coords && coords.length > 0) {
         coords.forEach((coord: Array<number>) => {
            coordinates.push(GeojsonHelpers.getCoordinate(coord));
         });
      }
      return coordinates;
   }
   private static getCoordinate(coord: Array<number>): Coordinate {
      if (coord && coord.length == 2) {
         let coordinate: Coordinate = new Coordinate(coord[0], coord[1]);
         return coordinate;
      }
      else {
         throw new SyntaxError("Coordinate value is invalid");
      }
   }
}

