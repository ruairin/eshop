

const handleRegister = (req, res, db, bcrypt) => {

  const { first_name, last_name, email, password } = req.body;
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json('incorrect form submission');
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
      .catch(err => res.status(400).json('unable to register'));
  })
    .catch(err => res.status(400).json("An error occurred while registering"));
}

module.exports = {
  handleRegister: handleRegister
}