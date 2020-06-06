require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');
const rejester = require('./controllers/rejester');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const dotenv = require('dotenv')


dotenv.config();
const db = knex(

    {
        connection: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        client: "postgres"
    }
);

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    db.select('*').from('login')
        .then(users => {
            res.json(users)
        })
});

app.post("/signin", (req, res) => { signin.signinHandler(req, res, db, bcrypt) });
app.post('/register', (req, res) => { rejester.rejesterHandler(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.profileHandler(req, res, db) });
app.put('/image', (req, res) => { image.imageHandler(req, res, db) });

app.listen(process.env.PORT || 3005, () => {
    console.log(`listening on port${process.env.PORT}`)
})