const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');
const knex = require('knex');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const products = require('./controllers/products');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const register = require('./controllers/register');
const cart = require('./controllers/cart');

const dotenv = require('dotenv');
dotenv.config();

const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN
}));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// create session store in knex DB
const store = new KnexSessionStore({ knex: db });
const oneDay = 1000 * 60 * 60 * 24;
const secret = crypto.randomBytes(20).toString('hex');
app.use(
  session({
    // secret: 'keyboard cat',
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


app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
}); 