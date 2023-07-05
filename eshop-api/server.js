const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const config = require('./config.json');
const products = require('./controllers/products');
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const db = knex({
  client: config.db_connection.client,
  connection: {
    host: config.db_connection.host,
    user: config.db_connection.user,
    password: config.db_connection.password,
    database: config.db_connection.database
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/products', (req, res) => { products.handleGetProducts(req, res, db) });
app.get('/categories', (req, res) => { products.handleGetCategories(req, res, db) });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt )});

// /signIn
// /register
// /getCartItems
// /addToCart
// /deleteFromCart


app.listen(3000, () => {
  console.log('App running on port 3000');
});