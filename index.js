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

const run = async () => {
    try {
        await client.connect()
        console.log('this client connect')


    } catch (error) {
        console.log(error.message);
    }

}
run().catch(err => console.log(err.message))

// mobile get all 

app.get('/users', async (req, res) => {
    let filter = {}
    console.log(filter)

    try {
        if (req.query) {
            filter = {
                email: req.query.email
            }
        }
        console.log(filter);
        const result = await userCollection.find(filter).toArray()
        if (result.length > 0) {
            res.send({
                success: true,
                data: result
            })
        } else {
            res.send({
                success: false,
                message: 'No data found'
            })
        }

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


app.post('/users', async (req, res) => {
    const body = req.body

    try {

        // const result = await userCollection.insertOne(body)
        const result = await userCollection.insertOne(body)
        res.send({
            success: true,
            data: result
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//all mobile phone gate
app.get('/mobiles', async (req, res) => {
    let filter = {}
    // console.log(req)

    try {
        if (req.query.catagori) {
            filter = {
                name: req.query.catagori
            }
        }
        if (req.query.email) {
            filter = {
                'sellerInfo.salarEmail': req.query.email
            }
        }

        const result = await mobilesCollection.find(filter).toArray()

        res.send({
            success: true,
            data: result
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


app.get('/', (req, res) => {


    res.send('this server runnitn')
})

app.listen(port, () => {
    console.log(`this is run servet ${port}`)
})