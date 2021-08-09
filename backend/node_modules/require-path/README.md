# require-path
Recursively `require(...)` files from a directory tree in Node.js

Works with Node.js `v4.0.0` and above.

| Branch        | Status        |
| ------------- |:-------------:|
| Master        | [![Build Status](https://travis-ci.org/ecowden/require-path.png?branch=master)](https://travis-ci.org/ecowden/require-path) |
| All           | [![Build Status](https://travis-ci.org/ecowden/require-path.png)](https://travis-ci.org/ecowden/require-path) |


## Usage

```js
var path = require('path');

requirePath({
    path: path.join(__dirname, 'my-directory'),
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js']
  })
  // returns a standard promise
  .then(function (modules) {
    // `modules` is a map of filenames to require()'d components from those files
  })
  // don't forget to handle errors!
  .catch(handleError);
```

### Options

| Property | Description |
| -------- | ----------- |
| path     | _string_ or _array_ of absolute paths to search for files. Default: `.`. |
| include  | _string_ or _array_ of [minimatch](https://github.com/isaacs/minimatch) patterns. A file in the path(s) that match at least one pattern will be `require(...)`'d unless the file also matches an exclusion pattern. Default: `['**/*.js', '**/*.json']`.|
| exclude  | _string_ or _array_ of [minimatch](https://github.com/isaacs/minimatch) patterns. Files in the path(s) that match at least one pattern will be excluded. Default: `['**/*Spec.js']`. |
