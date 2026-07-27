const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

client.connect()

app.get('/', async(req, res) => {
      const db = client.db(dbName)
       const collection = db.collection('password');
       const findResult = await collection.find({}).toArray()
       res.json(findResult)
});

app.post("/", async (req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection("password");

    const result = await collection.insertOne(password);

    res.send({
        success: true,
        result: result
    });
});

app.delete("/", async (req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection("password");

    const result = await collection.deleteOne(password);

    res.send({
        success: true,
        result: result
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});