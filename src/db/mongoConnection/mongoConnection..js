
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SaimonPranta:KTpSQCdhpnd0Bc1h@cluster0.v0uwh.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const porject_collection = db.db("Projects").collection("project_lists")


module.exports = porject_collection;