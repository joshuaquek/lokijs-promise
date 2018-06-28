const { getCollection, initDB, getDB } = require('../index.js')

// Always run this at the start of your app to instantiate the DB
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