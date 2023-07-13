
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user id
 *           example: 1
 *         email:
 *           type: string
 *           description: The users email
 *           example: mike@gmail.com
 *         first_name: 
 *           type: string
 *           description: The users first name
 *           example: Mike
 *         last_name:
 *           type: string
 *           description: The users last name
 *           example: Mahoney
 *           
 */

/**
 * @swagger
 * /signin:
 *    post:
 *      summary: Sign in an existing user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The users email
 *                  example: mike@gmail.com
 *                password:
 *                  type: string
 *                  description: The users password
 *                  example: 1234
 *                first_name: 
 *                  type: string
 *                  description: The users first name
 *                  example: Mike
 *                last_name:
 *                  type: string
 *                  description: The users last name
 *                  example: Mahoney
 * 
 * 
 *      responses: 
 *        200:
 *          description: Returns the user that was added
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/User'
 *              example:
 *                id: 1
 *                email: mike@gmail.com
 *                first_name: Mike
 *                last_name: Mahoney
 * 
 *        400:
 *          description: Error signing in
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
 *                    example: 'Incorrect form submission'
 * 
 *        401:
 *          description: Error signing in
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
 *                    example: 'Incorrect credentials'
 */

const handleSignin = (req, res, db, bcrypt) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 400, message: 'incorrect form submission' });
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      bcrypt.compare(password, data[0].hash).then(isValid => {
        if (isValid) {
          return (
            db.select('*').from('users')
              .where('email', '=', email)
              .then(user => {
                req.session.userId = user[0].id;
                // console.log(req.session);
                res.json(user[0]);
              })
              .catch(err => res.status(400).json({ status: 400, message: "Error retrieving user" }))
          );
        } else {
          return res.status(401).json({ status: 401, message: "Incorrect credentials" });
        }
      })
        .catch(err => res.status(401).json({ status: 401, message: "Incorrect credentials" }))
    })
    .catch(err => res.status(401).json({ status: 401, message: "Incorrect credentials" }));
}

module.exports = {
  handleSignin: handleSignin
}