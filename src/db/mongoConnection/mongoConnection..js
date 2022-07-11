
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SaimonPranta:KTpSQCdhpnd0Bc1h@cluster0.v0uwh.mongodb.net/?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


module.exports = db;