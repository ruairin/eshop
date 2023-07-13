
/**
 * @swagger
 * /signout:
 *    get:
 *      summary: Retrieve a list of products
 *      description: Retrieve an array of product objects from the products table
 *      responses: 
 *        200:
 *          description: Returns an array of prodcut objects
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

const handleSignout = (req, res) => {
  req.session.destroy(err => {
    res.status(200).json({ status: 200, message: "logged out" });
  })
}

module.exports = {
  handleSignout: handleSignout
}