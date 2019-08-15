import { expect, should } from 'chai';
import {Geojson} from '../lib/geojson-parser';
import { FeatureCollection} from '../lib/models/geojson';
import * as geojsonSample1 from './sample-geojson/sample1.json';
import * as geojsonSample2 from './sample-geojson/sample2.json';
import * as geojsonSample4 from './sample-geojson/sample4.json';
import * as geojsonUSSouth from './sample-geojson/US_South.json';
import * as geojsonUSNorthEast from './sample-geojson/US_NorthEast.json';
import * as geojsonMultiPolygon from './sample-geojson/MultiPolygon.json';
import * as geojsonMultiPolygonWithHole from './sample-geojson/MultiPolygonWithHole.json';
import * as geojsonMultiPoint from './sample-geojson/MultiPoint.json';
import * as geojsonMultiLineString from './sample-geojson/MultiLineString.json';

describe('Geojson Creator', function() {
  it('createGeojsonMultiPolygon', function() {
    let validGeojson:string= JSON.stringify(geojsonMultiPolygon);
    let result = Geojson.parse(validGeojson);
    let geojsonStr = Geojson.create(result);
    should().exist(geojsonStr);
  });
  it('createGeojsonMultiPolygonWithHole', function() {
    let validGeojson:string= JSON.stringify(geojsonMultiPolygonWithHole);
    let result = Geojson.parse(validGeojson);
    let geojsonStr = Geojson.create(result);
    should().exist(geojsonStr);
  });
  it('createGeojsonMultiLineString', function() {
    let validGeojson:string= JSON.stringify(geojsonMultiLineString);
    let result = Geojson.parse(validGeojson);
    let geojsonStr = Geojson.create(result);
    console.log(geojsonStr);
    should().exist(geojsonStr);
  });
  it('createGeojsonWithNoFeature', function() {
    let validGeojson:string='{ "type": "FeatureCollection",  "features": [] }';
    let result = Geojson.parse(validGeojson);
    let geojsonStr = Geojson.create(result);
    should().exist(geojsonStr);
  });
  it('createGeojsonWithEmptyFeatureCollection', function() {
    let validGeojson:string= JSON.stringify(geojsonSample1);
    let result = Geojson.parse(validGeojson);
    let geojsonStr = Geojson.create(result);
    should().exist(geojsonStr);
  });
  it('createGeojsonWithSimpleFeatureCollection', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample4);
    let result = Geojson.parse(geojsonStr);
    let geojson = Geojson.create(result);
    should().exist(geojson);
  });
  it('createGeojsonWithComplexFeatureCollection', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample2);
    let result = Geojson.parse(geojsonStr);
    let geojson = Geojson.create(result);
    should().exist(geojson);
  });
 
});