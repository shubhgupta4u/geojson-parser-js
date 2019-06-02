import { expect } from 'chai';
import {Geojson} from '../geojson-parser';
import { FeatureCollection } from '../lib/models/feature';
import * as geojsonSample1 from './sample-geojson/sample1.json';

describe('Geojson', function() {
  
  it('parseGeojsonWithNoFeature', function() {
    let validGeojson:string='{ "type": "FeatureCollection",  "features": [] }';
    let result = Geojson.parse(validGeojson);
    expect(result).instanceOf(FeatureCollection);
  });

  it('parseEmptyGeojson', function() {
    let invalidGeojson:string="";
    let result = Geojson.parse(invalidGeojson);
    expect(result).equal(null);
  });

  it('parseGeojsonWithFeatures', function() {
    let geojsonStr:string= JSON.stringify(geojsonSample1);
    let result = Geojson.parse(geojsonStr);
    expect(result).instanceOf(FeatureCollection);
  });
});