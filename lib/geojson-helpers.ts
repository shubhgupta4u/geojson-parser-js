import { FeatureCollection } from "./models/geojson";
import { Polygon, GeometryType, Geometry, Point, LineString, MultiPoint, MultiLineString, MultiPolygon, PolygonWithHole } from "./models/geojson";
import { FeatureProperty } from "./models/geojson";
import { Coordinate } from "./models/geojson";


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
   //Start of methods for creating geojson object from FeatureCollection instance
   protected static create(features: FeatureCollection): any {
      {
         try {
            let geojsonObj: any = {};
            geojsonObj.type = "FeatureCollection"
            geojsonObj.features = new Array<any>();
            if (features) {
               if (features.metadata && features.metadata.length > 0) {
                  geojsonObj.metadata = {};
                  features.metadata.forEach((metadata: FeatureProperty) => {
                     geojsonObj.metadata[metadata.key] = metadata.value;
                  });
               }
               if (features.geometries && features.geometries.length > 0) {
                  features.geometries.forEach((geometry: Geometry) => {
                     let feature: any = {};
                     feature.type = "Feature";
                     if (geometry.id && geometry.id != "") {
                        feature.id = geometry.id;
                     }
                     feature.properties = {};
                     if (geometry.featureProperties && geometry.featureProperties.length > 0) {
                        geometry.featureProperties.forEach((property: FeatureProperty) => {
                           feature.properties[property.key] = property.value;
                        });
                     }
                     feature.geometry = {};
                     feature.geometry.type = GeojsonHelpers.GetGeojsonFeatureType(geometry.type);
                     feature.geometry.coordinates = GeojsonHelpers.GetGeojsonGeometryCoordinates(geometry);
                     geojsonObj.features.push(feature);
                  });
               }
            }
            return geojsonObj;
         } catch (error) {
            throw error;
         }
      }
   }
   private static GetGeojsonFeatureType(type: GeometryType): string {
      switch (type) {
         case GeometryType.Point: return "Point";
         case GeometryType.LineString: return "LineString";
         case GeometryType.Polygon: return "Polygon";
         case GeometryType.PolygonWithHole: return "Polygon";
         case GeometryType.MultiPoint: return "MultiPoint";
         case GeometryType.MultiLineString: return "MultiLineString";
         case GeometryType.MultiPolygon: return "MultiPolygon";
      }
   }
   private static GetGeojsonGeometryCoordinates(geometry: Geometry): Array<any> {
      let coordinates: Array<any> = new Array<any>();
      try {
         switch (geometry.type) {
            case GeometryType.Point:
               let point: Point = geometry as Point;
               if (point.coordinate) {
                  coordinates.push(point.coordinate.lat);
                  coordinates.push(point.coordinate.lng);
               }
               break;
            case GeometryType.LineString:
               let lineString: LineString = geometry as LineString;
               if (lineString.coordinates) {
                  lineString.coordinates.forEach((coord: Coordinate) => {
                     let innerCoordinates = new Array<number>();
                     innerCoordinates.push(coord.lat);
                     innerCoordinates.push(coord.lng);
                     coordinates.push(innerCoordinates);
                  });
               }
               break;
            case GeometryType.Polygon:
               let polygon: Polygon = geometry as Polygon;
               if (polygon.coordinates) {
                  coordinates = GeojsonHelpers.getPolygonCoordinate(polygon);
               }
               break;
            case GeometryType.PolygonWithHole:
               let polygonWithHole: PolygonWithHole = geometry as PolygonWithHole;
               if (polygonWithHole.coordinates) {
                  coordinates = GeojsonHelpers.getPolygonWithHoleCoordinate(polygonWithHole);
               }
               break;
            case GeometryType.MultiPoint:
               let multiPoint: MultiPoint = geometry as MultiPoint;
               if (multiPoint.points) {
                  multiPoint.points.forEach((point: Point) => {
                     let innerCoordinates = new Array<number>();
                     if (point.coordinate) {
                        innerCoordinates.push(point.coordinate.lat);
                        innerCoordinates.push(point.coordinate.lng);
                     }
                     coordinates.push(innerCoordinates);
                  });
               }
               break;
            case GeometryType.MultiLineString:
               let multiLineString: MultiLineString = geometry as MultiLineString;
               if (multiLineString.LinesString && multiLineString.LinesString.length > 0) {
                  multiLineString.LinesString.forEach((lineString: LineString) => {
                     let child1Coordinates = new Array<any>();
                     lineString.coordinates.forEach((coord: Coordinate) => {
                        let innerCoordinates = new Array<number>();
                        innerCoordinates.push(coord.lat);
                        innerCoordinates.push(coord.lng);
                        child1Coordinates.push(innerCoordinates);
                     });
                     coordinates.push(child1Coordinates);
                  });
               }
               break;
            case GeometryType.MultiPolygon:
               let multiPolygon: MultiPolygon = geometry as MultiPolygon;
               if (multiPolygon.polygons && multiPolygon.polygons.length > 0) {
                  multiPolygon.polygons.forEach((polygon: Polygon) => {
                     if (polygon instanceof PolygonWithHole) {
                        coordinates.push(GeojsonHelpers.getPolygonWithHoleCoordinate(polygon as PolygonWithHole));
                     }
                     else {
                        coordinates.push(GeojsonHelpers.getPolygonCoordinate(polygon));
                     }
                  });
               }
               break;
         }
      } catch (error) {
         throw error;
      }
      return coordinates;
   }
   private static getPolygonCoordinate(polygon: Polygon): Array<any> {
      try {
         let coordinates: Array<any> = new Array<any>();
         if (polygon.coordinates) {
            let child1Coordinates = new Array<any>();
            polygon.coordinates.forEach((coord: Coordinate) => {
               let innerCoordinates = new Array<number>();
               innerCoordinates.push(coord.lat);
               innerCoordinates.push(coord.lng);
               child1Coordinates.push(innerCoordinates);
            });
            coordinates.push(child1Coordinates);
            return coordinates;
         }
         else {
            throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
         }
      } catch (error) {
         throw error;
      }
   }
   private static getPolygonWithHoleCoordinate(polygonWithHole: PolygonWithHole): Array<any> {
      try {
         let coordinates: Array<any> = new Array<any>();
         if (polygonWithHole.coordinates) {
            let child1Coordinates = new Array<any>();
            polygonWithHole.coordinates.forEach((coord: Coordinate) => {
               let innerCoordinates = new Array<number>();
               innerCoordinates.push(coord.lat);
               innerCoordinates.push(coord.lng);
               child1Coordinates.push(innerCoordinates);
            });
            coordinates.push(child1Coordinates);
            if (polygonWithHole.holes && polygonWithHole.holes.length > 0) {
               polygonWithHole.holes.forEach((polygon: Polygon) => {
                  child1Coordinates = new Array<any>();
                  polygon.coordinates.forEach((coord: Coordinate) => {
                     let innerCoordinates = new Array<number>();
                     innerCoordinates.push(coord.lat);
                     innerCoordinates.push(coord.lng);
                     child1Coordinates.push(innerCoordinates);
                  });
                  coordinates.push(child1Coordinates);
               });
            }
            return coordinates;
         }
         else {
            throw new SyntaxError("Coordinates can't be null for the polygon geometry.");
         }
      } catch (error) {
         throw error;
      }
   }
   //End of methods for creating geojson geojson object from FeatureCollection instance

   //Start of methods for reading geometries from geojson object
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
            feature.geometry.id = feature.id;
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
      let point: Point = new Point(coord, geometry.id);
      return point;
   }
   private static getMultiPoint(geometry: any): Geometry {
      let multiPoint: MultiPoint = new MultiPoint(geometry.id);
      let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(geometry.coordinates);
      if (coordinates && coordinates.length > 0) {
         coordinates.forEach((coord: Coordinate) => {
            multiPoint.points.push(new Point(coord));
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
      let multiLineString: MultiLineString = new MultiLineString(geometry.id);
      let multiLinestringCoords: Array<any> = geometry.coordinates;
      if (multiLinestringCoords && multiLinestringCoords.length > 0) {
         multiLinestringCoords.forEach((linestringCoords: Array<any>) => {
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
         let coordinates: Array<any> = geometry.coordinates;
    
         coordinates.forEach((multipolygonCoords: Array<any>) => {
          
            if(multipolygonCoords.length == 1){
               multipolygonCoords.forEach((polygonCoords: Array<any>) => {
                  if (polygonCoords.length > 1) {
                     let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(polygonCoords);
                     if (coordinates && coordinates.length > 0) {
                        let polygon: Polygon = new Polygon();
                        coordinates.forEach((coord: Coordinate) => {
                           polygon.coordinates.push(coord);
                        });
                        multiPolygon.polygons.push(polygon);
                     }
                  }
               });
            }
            else  if(multipolygonCoords.length > 1){
               let polygonWithHole: PolygonWithHole = new PolygonWithHole();
               let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(multipolygonCoords[0]);
               if (coordinates && coordinates.length > 0) {
                  coordinates.forEach((coord: Coordinate) => {
                     polygonWithHole.coordinates.push(coord);
                  });
               }
               for (let index = 1; index < multipolygonCoords.length; index++) {
                  let coordinates: Array<Coordinate> = GeojsonHelpers.getCoordinates(multipolygonCoords[index]);
                  if (coordinates && coordinates.length > 0) {
                     let polygon: Polygon = new Polygon();
                     coordinates.forEach((coord: Coordinate) => {
                        polygon.coordinates.push(coord);
                     });
                     polygonWithHole.holes.push(polygon);
                  }
               }
               multiPolygon.polygons.push(polygonWithHole);
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
      if (coord && coord.length >= 2) {
         let coordinate: Coordinate = new Coordinate(coord[0], coord[1]);
         return coordinate;
      }
      else {
         throw new SyntaxError("Coordinate value is invalid");
      }
   }
   //End of methods for reading geometries from geojson object
}

