const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');
const knex = require('knex');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const config = require('./config.json');
const products = require('./controllers/products');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const register = require('./controllers/register');
const cart = require('./controllers/cart');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// create session store in knex DB
const store = new KnexSessionStore({ knex: db });
const oneDay = 1000 * 60 * 60 * 24;
const secret = crypto.randomBytes(20).toString('hex');
app.use(
  session({
    secret: secret,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.get('/products', (req, res) => { products.handleGetProducts(req, res, db) });
app.get('/categories', (req, res) => { products.handleGetCategories(req, res, db) });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.get('/signout', (req, res) => { signout.handleSignout(req, res) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/getCartItems', (req, res) => { cart.getItems(req, res, db) });
app.post('/addCartItem', (req, res) => { cart.addItem(req, res, db) });
app.delete('/deleteCartItem', (req, res) => { cart.deleteItem(req, res, db) });


app.listen(3000, () => {
  console.log('App running on port 3000');
}); 