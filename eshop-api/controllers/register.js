
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
 * /register:
 *    post:
 *      summary: Registers a new user
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
 *          description: Error adding user
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
 */


const handleRegister = (req, res, db, bcrypt) => {

  const { first_name, last_name, email, password } = req.body;
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json({status: 400, message: 'incorrect form submission'});
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then(hash => {

    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return (
            trx.insert({
              email: loginEmail[0].email,
              first_name: first_name,
              last_name: last_name
            })
              .into('users')
              .returning('*')
              .then(user => {
                res.json(user[0]);
              })
          );
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
      .catch(err => res.status(400).json({status: 400, message: 'unable to register'}));
  })
    .catch(err => res.status(400).json({status: 400, message: "An error occurred while registering"}));
}

module.exports = {
  handleRegister: handleRegister
}