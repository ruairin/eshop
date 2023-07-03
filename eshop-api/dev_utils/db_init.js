

const knex = require('knex');
const { faker } = require('@faker-js/faker');
const config = require('../config.json');
const fs = require('fs');
const path = require('path');

const db = knex({
  client: config.db_connection.client,
  connection: {
    host: config.db_connection.host,
    user: config.db_connection.user,
    password: config.db_connection.password,
    database: config.db_connection.database
  }
});

const imagePath = path.join(__dirname, '..', '..', 'eshop', 'public', 'images');
const imageList = fs.readdirSync(imagePath);

const temp = [...Array(60).keys()];
const products = temp.map((item, index) => {

  let imageIndex = getRndInteger(0, imageList.length);

  return (
    {
      title: faker.commerce.product(),
      price: faker.finance.amount({ dec: 2 }),
      description: faker.commerce.productDescription(),
      product_code: `SKU ${faker.string.numeric(3)}`,
      image_name: imageList[imageIndex],
      inventory: 100,
      category_id: getRndInteger(1, 4),
    }
  );
});

db.insert(products)
  .into('products')
  .returning('id')
  .then(result => console.log(result))
  .catch(err => console.log(err));

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}