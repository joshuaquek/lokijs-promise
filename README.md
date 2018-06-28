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
initDB('v1.json', 1000)

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
}

someAsyncFunctionAnywhereInYourCode()
```


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.