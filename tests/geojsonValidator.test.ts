import { expect } from 'chai';
import {Geojson} from '../geojson-parser';

describe('validateGeojson Validator', function() {
 
  it('validGeojsonWithNoFeature', function() {
    let validGeojson:string='{ "type": "FeatureCollection",  "features": [] }';
    let result = Geojson.isValid(validGeojson);
    expect(result).equal(true);
  });

  it('emptyGeojson', function() {
    let invalidGeojson:string="";
    let result = Geojson.isValid(invalidGeojson);
    expect(result).equal(false);
  });

});