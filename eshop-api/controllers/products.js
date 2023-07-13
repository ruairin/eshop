/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product id
 *           example: 1
 *         title:
 *           type: string
 *           description: The product title
 *           example: Fish
 *         price: 
 *           type: Number
 *           description: The product price
 *           example: 64.99
 *         product_code:
 *           type: string
 *           description: The product code
 *           example: SKU 208
 *         image_name:
 *           type: string
 *           description: The image name corresponding to the product
 *           example: 3151561_rupee.svg
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The category id
 *           example: 1
 *         title:
 *           type: string
 *           description: The category title
 *           example: Category 1
 *         description:
 *           type: string
 *           description: The category description
 *           example: Description text for category 1
 *         image_name:
 *           type: string
 *           description: The image name corresponding to the category
 *           example: 3151561_rupee.svg
 *           
 */

/**
 * @swagger
 * /products:
 *    get:
 *      summary: Retrieve a list of products
 *      description: Retrieve an array of product objects from the products table
 *      responses: 
 *        200:
 *          description: Returns an array of prodcut objects
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: An error occurred during database query
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
 *                    example: "Error getting product data."
 */
const handleGetProducts = (req, res, db) => {

  db.select('*')
    .from('products')
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json({ status: 400, message: 'Error getting product data.' }));
}

/**
 * @swagger
 * /categories:
 *    get:
 *      summary: Retrieve a list of categories
 *      description: Retrieve an array of product categories from the categories table
 *      responses: 
 *        200:
 *          description: Returns an array of prodcut categories
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/Category'
 *        400:
 *          description: An error occurred during database query
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
 *                    example: "Error getting data."
 */

const handleGetCategories = (req, res, db) => {

  db.select('*')
    .from('categories')
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json({ status: 400, message: 'Error getting product data.' }));
}

module.exports = {
  handleGetProducts: handleGetProducts,
  handleGetCategories: handleGetCategories
}