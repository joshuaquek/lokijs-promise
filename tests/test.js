const {
  getCollection,
  initDB,
  getDB
} = require('../index.js')

// Always run this at the start of your app to instantiate the DB
initDB('v1.json', 1000)

async function someAsyncFunctionAnywhereInYourCode () {
  // Get Insect Collections if exists, if not, it will create one in the DB
  let insects = await getCollection('insects')

  // Query for results
  console.log('\n\n\nQuerying for Existing Records...\n\n')
  let results1 = insects.find({})
  console.log(results1)

  // Insert in a new record
  let data = {
    'insect_name': 'Dragonfly',
    'insect_description': 'A very nice looking insect.'
  }
  insects.insert(data)

  // Query for results
  console.log('\n\n\nQuerying after DB Insertion...\n\n')
  let results2 = insects.find({})
  console.log(results2)

  // Do whatever LokiJS stuff etc
  let db = await getDB()
  // ....
  // ....
}

someAsyncFunctionAnywhereInYourCode()
