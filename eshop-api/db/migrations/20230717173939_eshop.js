/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.increments('id').primary().unsigned();
      table.text('title').notNullable();
      table.text('description');
      table.text('image_name');
    }),
    knex.schema.createTable('products', (table) => {
      table.increments('id').primary().unsigned();
      table.text('title').notNullable();
      table.float('price').notNullable();
      table.text('description');
      table.text('product_code');
      table.text('image_name');
      table.integer('inventory');
      table.integer('category_id').unsigned().references('id').inTable('categories');
    }),
    knex.schema.createTable('login', (table) => {
      table.increments('id').unsigned();
      table.text('hash').notNullable();
      table.text('email').primary().unique().notNullable();
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.text('email').unique().notNullable().references('email').inTable('login');
      table.text('first_name');
      table.text('last_name');
    }),
    knex.schema.createTable('cart_items', (table) => {
      table.increments('id').primary().unsigned();
      table.integer('product_id').notNullable().references('id').inTable('products');
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('inventory').notNullable().unsigned();
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists('cart_items'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('login'),
    knex.schema.dropTableIfExists('products'),
    knex.schema.dropTableIfExists('categories')
  ]);
};
