import { expect, should } from 'chai';
import {Geojson} from '../geojson-parser';
import { FeatureCollection, GeometryType,  Point, MultiPolygon, Polygon, LineString} from '../models/geojson';
import * as geojsonSample1 from './sample-geojson/sample1.json';
import * as geojsonSample2 from './sample-geojson/sample2.json';
import * as geojsonSample3 from './sample-geojson/sample3.json';
import * as geojsonSample4 from './sample-geojson/sample4.json';

describe('Geojson Parser', function() {
  
  it('parseGeojsonWithNoFeature', function() {
    let validGeojson:string='{ "type": "FeatureCollection",  "features": [] }';
    let result = Geojson.parse(validGeojson);
    expect(result).instanceOf(FeatureCollection);
    expect(result.geometries).to.have.lengthOf(0);
  });

  it('parseEmptyGeojson', function() {
    let invalidGeojson:string="";
    expect(function() {
      Geojson.parse(invalidGeojson);
      }).to.throw(SyntaxError);
  });
  it('parseGeojsonWithEmptyFeatureCollection', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample1);
    let result = Geojson.parse(geojsonStr);
    should().exist(result);
    expect(result.geometries).to.have.lengthOf(0);
  });
  it('parseGeojsonWithSimpleFeature', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample3);    
    let result:FeatureCollection = Geojson.parse(geojsonStr);
    should().exist(result);
    expect(result.geometries).to.have.lengthOf(1);
    expect(result.geometries[0].featureProperties).to.have.lengthOf(1);
    expect(result.geometries[0]).instanceOf(Point);
    should().exist((result.geometries[0] as Point).coordinate);
    expect(result.geometries[0].type).equals(GeometryType.Point);
  });
  it('parseGeojsonWithSimpleFeatureCollection', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample4);
    let result = Geojson.parse(geojsonStr);
   
    should().exist(result);
    expect(result.geometries).to.have.lengthOf(2);

    expect(result.geometries[0].featureProperties).to.have.lengthOf(26);
    expect(result.geometries[0]).instanceOf(Point);
    should().exist((result.geometries[0] as Point).coordinate);
    expect(result.geometries[0].type).equals(GeometryType.Point);

    expect(result.geometries[1].featureProperties).to.have.lengthOf(22);
    expect(result.geometries[1]).instanceOf(MultiPolygon);
    expect((result.geometries[1] as MultiPolygon).polygons).to.have.lengthOf(1);
    expect((result.geometries[1] as MultiPolygon).polygons[0].coordinates).to.have.lengthOf(40);
    expect(result.geometries[1].type).equals(GeometryType.MultiPolygon);
  });
  it('parseGeojsonWithComplexFeatureCollection', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample2);
    let result = Geojson.parse(geojsonStr);
    expect(result).instanceOf(FeatureCollection);
    should().exist(result);
    expect(result.geometries).to.have.lengthOf(23);

    expect(result.geometries[0].featureProperties).to.have.lengthOf(31);
    expect(result.geometries[0]).instanceOf(Point);
    should().exist((result.geometries[0] as Point).coordinate);
    expect(result.geometries[0].type).equals(GeometryType.Point);

    expect(result.geometries[1].featureProperties).to.have.lengthOf(12);
    expect(result.geometries[1]).instanceOf(Polygon);
    expect((result.geometries[1] as Polygon).coordinates).to.have.lengthOf(204);
    expect(result.geometries[1].type).equals(GeometryType.Polygon);

    expect(result.geometries[12].featureProperties).to.have.lengthOf(12);
    expect(result.geometries[12]).instanceOf(LineString);
    expect((result.geometries[12] as LineString).coordinates).to.have.lengthOf(2);
    expect(result.geometries[12].type).equals(GeometryType.LineString);
  });
 
});