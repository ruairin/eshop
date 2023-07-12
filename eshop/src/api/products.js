/** 
 * Methods performing API calls related to products and categories
 * 
 * @module api/products
 * 
 */

/**
 * Get the product categories the server/database
 * 
 * @typedef {Object} category 
 * @property {string} id            Category id
 * @property {string} title         Category title
 * @property {string} description   Long description of the Category
 * @property {string} image_name    Image filename for the Category
 * 
 * @returns {category[]} Array of all categories on server database
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function getCategories() {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/categories');
    if (response.ok) {
      const categories = await response.json();
      return categories;
    }
    throw new Error(response.status);
  } catch (error) {
    console.log("Error in fetch getCategories(): ", error);
  }
}

/**
 * Get the products from the server/database
 * 
 * @typedef {Object} product 
 * @property {string} id            Product id
 * @property {string} title         Product title
 * @property {string} price         Product price
 * @property {string} description   Long description of the product
 * @property {string} product_code  Product code
 * @property {string} image_name    Image filename for the product
 * 
 * @returns {product[]} Array of all products on server database
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function getProducts() {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/products');
    if (response.ok) {
      const products = await response.json();
      return products;
    }
    throw new Error(response.status);
  } catch (error) {
    console.log("Error in fetch getProducts(): ", error);
  }
}



