
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SaimonPranta:KTpSQCdhpnd0Bc1h@cluster0.v0uwh.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const admin_collecion = db.db("adminn").collection("adminInfo")


module.exports = admin_collecion;