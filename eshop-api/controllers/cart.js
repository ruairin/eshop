/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The cart entry id
 *           example: 12
 *         product_id:
 *           type: integer
 *           description: The product id for this cart entry
 *           example: 15
 *         user_id: 
 *           type: integer
 *           description: The id of the user owner of the cart entry
 *           example: 7
 *         qty:
 *           type: integer
 *           description: The quantity of items for this cart entry
 *           example: 5
 * 
 */

/**
 * @swagger
 * /addCartItem:
 *    post:
 *      summary: Add a new item to the cart
 *      description: Adds a new item to the cart
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_id:
 *                  type: integer
 *                  description: The product id for this cart item
 *                  example: 12
 *                qty:
 *                  type: integer
 *                  description: The quantity of items for this cart entry
 *                  example: 5
 * 
 *      responses: 
 *        200:
 *          description: Returns the cart item that was added
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/CartItem'
 *              example:
 *                id: 10
 *                product_id: 15
 *                user_id: 7
 *                qty: 5
 * 
 *        400:
 *          description: Error adding item to cart
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 400
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: "Cannot add to cart - incorrect submission"
 * 
 *        401:
 *          description: Not signed in
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 401
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: "Cannot add to cart - Not signed in"
 */

const addItem = (req, res, db) => {

  const { product_id, qty } = req.body;
  if (!product_id || !qty) {
    return res.status(400).json({ status: 400, message: 'Cannot add to cart - incorrect submission' });
  }

  if (!req.session.userId) {
    return res.status(401).json({ status: 401, message: 'Cannot add to cart - Not signed in' });
  }

  const user_id = req.session.userId;

  // TODO check that product id exists in products database
  // before inserting

  db.insert({
    user_id: user_id,
    product_id: product_id,
    qty: qty
  })
    .into('cart_items')
    .returning('*')
    .then(item => {
      return (res.json(item[0]))
    })
    .catch(err => res.status(400).json('Error adding item to cart'));
}

/**
 * @swagger
 * /deleteCartItem:
 *    delete:
 *      summary: Delete an item from the cart
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: The cart entry id to delete
 *                  example: 12
 * 
 *      responses: 
 *        200:
 *          description: Returns the cart item that was deleted
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/CartItem'
 *              example:
 *                id: 10
 *                product_id: 15
 *                user_id: 7
 *                qty: 5
 * 
 * 
 *        400:
 *          description: Error deleting cart item
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 400
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: 'Cart item not found'
 *        401:
 *          description: Not signed in
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 401
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: 'Cannot delete cart item - Not signed in'
 */

const deleteItem = (req, res, db) => {

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ status: 400, message: 'Cart item not found' });
  }

  if (!req.session.userId) {
    return res.status(401).json({ status: 401, message: 'Cannot delete cart item - Not signed in'});
  }

  const user_id = req.session.userId;

  db('cart_items')
    .where('id', '=', id)
    .returning('*')
    .del()
    .then(item => {
      if (item.length === 0) {
        throw new Error;
      }
      if (item[0].user_id === user_id) {
        return res.json(item);
      } else {
        return res.status(401).json({ status: 401, message: 'Cannot delete cart item (Unauthorised)'});
      }
    })
    .catch(err => res.status(400).json({ status: 400, message: 'Error deleting item from cart'}));
}

/**
 * @swagger
 * /getCartItems:
 *    get:
 *      summary: Get items from the cart for the signed in user
 * 
 *      responses: 
 *        200:
 *          description: Returns array of cart items for this user
 *          content: 
 *            application/json:
 *              type: array
 *              items:
 *                - $ref: '#/components/schemas/CartItem'
 *              example:
 *                - id: 10
 *                  product_id: 15
 *                  user_id: 7
 *                  qty: 5
 *                - id: 12
 *                  product_id: 5
 *                  user_id: 7
 *                  qty: 8
 * 
 *        400:
 *          description: Error deleting cart item
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 400
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: 'Cart item not found'
 *        401:
 *          description: Not signed in
 *          content: 
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  status: 
 *                    type: integer
 *                    description: the http status code
 *                    example: 401
 *                  message:
 *                    type: string
 *                    description: the error message
 *                    example: 'Cannot get cart items - Not signed in'
 */

const getItems = (req, res, db) => {

  if (!req.session.userId) {
    return res.status(401).json({ status: 401, message: 'Cannot get cart items - Not signed in'});
  }

  const user_id = req.session.userId;

  db.select('*')
    .from('cart_items')
    .where('user_id', '=', user_id)
    .then(result => {
      return res.json(result);
    })
    .catch(err => res.status(400).json({ status: 400, message: 'Error getting cart items'}));
}

module.exports = {
  addItem: addItem,
  deleteItem: deleteItem,
  getItems: getItems
}