# geojson-parser-js
A Node.js module that validate geojson string and let easily parse geometries from it
## Installation 
```sh
npm install geojson-parser-js --save
yarn add geojson-parser-js
bower install geojson-parser-js --save
```
## Usage
### Javascript
```javascript
var parser = require('geojson-parser-js');
var validator = new parser.GeojsonValidator();
var isValid = validator.isValid('{ "type": "FeatureCollection",  "features": [] }');
```
```sh
Output should be 'true'
```
### TypeScript
```typescript
import { GeojsonValidator } from 'geojson-parser-js';
let validator:GeojsonValidator=new GeojsonValidator();
console.log(validator.isValid({ "type": "FeatureCollection",  "features": [] }));
```
```sh
Output should be 'true'
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