const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
const ev = require('dotenv').config()
//console.log(process.env.MDB_USR)
const url = 'mongodb+srv://' + process.env.MDB_USR + ':' + process.env.MDB_PWD + '@' + process.env.MDB_DBN + '.93pyc5t.mongodb.net/?retryWrites=true&w=majority';
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log(err)
    return;
  }
  console.log("Connected successfully to MongoDB server");

  // connect to myproject database
  db = client.db('db');
});

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = { name, email, password, balance: 100 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  })
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );


  });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  })
}


module.exports = { create, findOne, find, update, all };
