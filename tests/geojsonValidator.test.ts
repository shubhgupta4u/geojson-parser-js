import { expect } from 'chai';
import {GeojsonValidator} from '../GeojsonValidator';

describe('validateGeojson', function() {
  let validator:GeojsonValidator=  new GeojsonValidator();
  it('validGeojsonWithNoFeature', function() {
    let validGeojson:string='{ "type": "FeatureCollection",  "features": [] }';
    let result = validator.isValid(validGeojson);
    expect(result).equal(true);
  });

  it('emptyGeojson', function() {
    let invalidGeojson:string="";
    let result = validator.isValid(invalidGeojson);
    expect(result).equal(false);
  });
});