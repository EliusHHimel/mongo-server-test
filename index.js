const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

/*
Database User: elius
Password: O3atecchJqGGIROB

*/
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.snmo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('foodMaster');
        const userCollection = database.collection('users');

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);

            console.log('Hiting the post', req.body);

            res.json(result)
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Running my crud server')
})



app.listen(port, () => {
    console.log('Running server on port', port)
})