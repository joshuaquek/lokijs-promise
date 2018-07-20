const Loki = require('lokijs')
const Lfsa = require('lokijs/src/loki-fs-structured-adapter')
const Promise = require('bluebird')

let isLoaded = false
let db = null

let initDB = (dbName, autosaveInterval) => {
  try {
    db = new Loki(dbName, {
      adapter: new Lfsa(),
      autoload: true,
      autoloadCallback: () => {
        isLoaded = true
      },
      autosave: true,
      autosaveInterval: autosaveInterval || 1000
    })
  } catch (error) {
    reject(error)
  }
}

let getDB = () => {
  return new Promise((resolve, reject) => {
    try {
      let interval = setInterval(() => {
        if (isLoaded) {
          clearInterval(interval)
          resolve(db)
        }
      }, 100)
    } catch (error) {
      reject(error)
    }
  })
}

let getCollection = (collectionName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let database = await getDB()
      let collection = database.getCollection(collectionName) ? database.getCollection(collectionName) : database.addCollection(collectionName, {clone: true, disableMeta:true}) // Creates a new DB with `clone = true` so that db records cannot be directly modified from the result-set.
      resolve(collection) // This returns a Promise since this entire function is declared with the async keyword
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getDB: getDB,
  getCollection: getCollection,
  initDB: initDB
}
