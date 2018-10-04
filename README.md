#  🔨 LokiJS Promise

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/joshuaquek/lokijs-promise/graphs/commit-activity)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

The native LokiJs does not allow synchronous loading of the persistent json/db store before running commands. 

Using Promises, this library overcomes this and now allows you to load the persistent json/db store first before running any other command.

## Installation

  `npm install lokijs-promise`

## Usage

Full Example:

```javascript
const { getCollection, initDB, getDB } = require('lokijs-promise')

// Always run this at the start/top of your app to instantiate the DB
initDB('v1.json', 1000) // A file called v1.json will be created in your project repo and will be used as the DB, and it will have an autosave interval of 1000ms (1 second, essentially)

async function someAsyncFunctionAnywhereInYourCode () {

  // Get Insect Collections if exists, if not, it will create one in the DB
  let insects = await getCollection('insects')

  // Query for results
  console.log("\n\n\nQuerying for Existing Records...\n\n");
  let results_1 = insects.find({})
  console.log(results_1)

  // Insert in a new record
  insects.insert({
    'insect_name': 'Dragonfly',
    'insect_description': 'A very nice looking insect.'
  })

  // Query for results
  console.log("\n\n\nQuerying after DB Insertion...\n\n");
  let results_2 = insects.find({})
  console.log(results_2)

  // Do whatever LokiJS stuff etc
  let db = await getDB()
  //....
  //....
  // Examples on how to use `db` found here in the LokiJs documentation: https://rawgit.com/techfort/LokiJS/master/jsdoc/index.html
}

someAsyncFunctionAnywhereInYourCode()
```

## Using Your Own Promise Library

The default Promise library used here would be Bluebird, as it faster for older versions of Node. 

Note that in later versions of Node, native Promises are the fastest. Another extremely performant Promise library you could try is Aigle ( https://github.com/suguru03/aigle ), which is faster than Bluebird in this benchmark: https://github.com/suguru03/aigle/tree/master/benchmark

Either way, you can override the Bluebird promise library this way, anywhere in your code:

```javascript
const { setPromiseLibrary } = require('lokijs-promise')
setPromiseLibrary(global.Promise) // This sets the Promise library used in lokijs-promise to the native NodeJs Promise library
```


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
