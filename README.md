# geojson-parser-js
A Node.js module to generate a geojson or validate it. This module also let you easily parse geometries from geojson.
## Installation 
```sh
npm install geojson-parser-js --save
yarn add geojson-parser-js
bower install geojson-parser-js --save
```
## Demo 
```sh
You can use the demo at https://www.geojson.in/
```
## Usage
### TypeScript  
```typescript
import {Geojson} from 'geojson-parser-js';
var isValid = Geojson.isValid({ "type": "FeatureCollection",  "features": [] });
```
```sh
Output should be 'true'
```
```typescript
import {Geojson} from 'geojson-parser-js';
import { FeatureCollection, GeometryType, FeatureProperty, Coordinate, Geometry, Point, LineString, Polygon, PolygonWithHole, MultiPoint, MultiLineString, MultiPolygon } from 'geojson-parser-js/models/geojson';
let features:FeatureCollection = Geojson.parse('{ "type": "FeatureCollection",  "features": [] }');
```
```sh
Output should be an instance of FeatureCollection class
```
```typescript
import {Geojson} from 'geojson-parser-js';
import { FeatureCollection } from 'geojson-parser-js/models/geojson';
let geoJsonStr:string = Geojson.create(features);
```
```sh
Input should be an instance of FeatureCollection
Output should be an Geojson string
```
### Javascript
```javascript
var geojson = require('geojson-parser-js');
var isValid = geojson.isValid('{ "type": "FeatureCollection",  "features": [] }');
```
```sh
Output should be 'true'
```
```javascript
var geojson = require('geojson-parser-js');
var features = geojson.parse('{ "type": "FeatureCollection",  "features": [] }');
```
```sh
Output should be an instance of FeatureCollection class
```
```javascript
var geojson = require('geojson-parser-js');
var geojsonStr = geojson.create(features);
```
```sh
Input should be an instance of FeatureCollection
Output should be an Geojson string
```
### AMD
```javascript
define(function(require,exports,module){
  var parser = require('geojson-parser-js');
});
```
## Test 
```sh
npm run test
```
### Support
```Bug or Suggestion Reporting
You can directly send any bug/issue or suggestion to my personal email id: shubhgupta4u@gmail.com.
```