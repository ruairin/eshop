
const dbInit = require('../dbInit');

exports.seed = async (knex) => {
  await knex('cart_items').del();
  await knex('users').del();
  await knex('login').del();
  await knex('products').del();
  await knex('categories').del();

  const categories = dbInit.genCategoriesRecords();
  const products = dbInit.genProductsRecords();
  try {
    const categoryId = await knex.insert(categories).into('categories').returning('id');
    console.log(categoryId);
    const productId = await knex.insert(products).into('products').returning('id');
    console.log(productId);
  } catch (err) {
    console.log(err);
  }
}