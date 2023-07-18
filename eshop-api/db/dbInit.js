

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const imagePath = path.join(__dirname, '..', 'public', 'images');
const imageList = fs.readdirSync(imagePath);

const genCategoriesRecords = (numCategories = 3) => {

  const temp = [...Array(numCategories).keys()];

  const categories = temp.map((item, index) => {
    let imageIndex = getRndInteger(0, imageList.length);
    return (
      {
        title: `Category ${index + 1}`,
        description: `Description text for Category ${index + 1}`,
        image_name: imageList[imageIndex],
      }
    );
  });

  return categories;
}

const genProductsRecords = (numProducts = 60) => {

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
  return products;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  genCategoriesRecords: genCategoriesRecords,
  genProductsRecords: genProductsRecords
}
