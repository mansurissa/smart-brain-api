const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');
const rejester = require('./controllers/rejester');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pass2database',
        database: 'smart_brain',
        port: '5432'

    }
});

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