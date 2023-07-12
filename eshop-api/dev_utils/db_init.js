

const knex = require('knex');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

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

const imagePath = path.join(__dirname, '..', '..', 'eshop', 'public', 'images');
const imageList = fs.readdirSync(imagePath);

genProductsTable();
genCategories();


const genCategories = (tableName='categories', numCategories=3) => {

  const temp = [...Array(numCategories).keys()];

  const categories = temp.map((item, index) => {
    let imageIndex = getRndInteger(0, imageList.length);
    return (
      {
        title: `Category ${index}`,
        description: `Description text for Category ${index}`,
        image_name: imageList[imageIndex],
      }
    );
  });

  db.insert(categories)
  .into(tableName)
  .returning('id')
  .then(result => console.log(result))
  .catch(err => console.log(err));
}

const genProductsTable = (tableName='products', numProducts=60) => {

  const temp = [...Array(numProducts).keys()];
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
    .into(tableName)
    .returning('id')
    .then(result => console.log(result))
    .catch(err => console.log(err));
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}