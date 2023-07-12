/** 
 * Methods performing API calls related to cart
 * 
 * @module api/cart 
 * 
 */

/**
 * Submits request to add item to cart
 * 
 * @param {string} id  The id of the product (from products DB table) to add
 * @param {string} qty The number of items to add
 * 
 * @typedef {Object} cartItem 
 * @property {string} id          The cart item id
 * @property {string} product_id  The product id of the cart item
 * @property {string} user_id     The user id of the cart item
 * @property {string} qty         The number of items
 * 
 * @returns {cartItem}  Object describing the item that was added to the cart
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function addCartItem(id, qty) {

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/addCartItem', {
      method: 'post',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: id,
        qty: qty
      })
    });

    if (response.ok) {
      const addedItem = await response.json();
      if (addedItem) {
        return addedItem;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}

/**
 * Get the cart items for the currently logged in user
 * 
 * @typedef {Object} cartItem 
 * @property {string} id          The cart item id
 * @property {string} product_id  The product id of the cart item
 * @property {string} user_id     The user id of the cart item
 * @property {string} qty         The number of items
 * 
 * @returns {cartItem[]}  Array of cart items for this user
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function getCartItems() {

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/getCartItems', {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const cartItems = await response.json();
      if (cartItems) {
        return cartItems;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}

/**
 * Get the cart items for the currently logged in user
 * 
 * @param {string} id The id of the cart item to be deleted
 * 
 * @typedef {Object} cartItem 
 * @property {string} id          The cart item id
 * @property {string} product_id  The product id of the cart item
 * @property {string} user_id     The user id of the cart item
 * @property {string} qty         The number of items
 * 
 * @returns {cartItem}  The cart item that was deleted
 * @throws {Error}  If an error occurred during request. 
 *                  Error.message contains the http response code
 */

export async function deleteCartItem(id) {

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/deleteCartItem', {
      method: 'delete',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
      })
    });

    if (response.ok) {
      const deletedItem = await response.json();
      if (deletedItem) {
        return deletedItem;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}
