const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
const datas = require('./product.json');
const { query } = require('express');

const port = process.env.POST || 5000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.9yhpi6m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const userCollection = client.db('mobileBuySell').collection('users')
const mobilesCollection = client.db('mobileBuySell').collection('mobiles')
const bookingCollection = client.db('mobileBuySell').collection('booking')


app.get('/', (req, res) => {


    res.send('this server runnitn')
})

app.listen(port, () => {
    console.log(`this is run servet ${port}`)
})