

const addItem = (req, res, db) => {

  const { product_id, qty } = req.body;
  if (!product_id || !qty) {
    return res.status(400).json('Cannot add to cart - incorrect submission');
  }

  if (!req.session.userId) {
    return res.status(401).json('Cannot add to cart - Not signed in');
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


const deleteItem = (req, res, db) => {

  const { id } = req.body;
  if (!id) {
    return res.status(400).json('Cart item not found');
  }

  if (!req.session.userId) {
    return res.status(401).json('Cannot delete cart item - Not signed in');
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
        return res.status(401).json('Cannot delete cart item (Unauthorised)');
      }
    })
    .catch(err => res.status(400).json('Error deleting item from cart'));
}


const getItems = (req, res, db) => {

  console.log("Session: ", req.session);
  console.log("User ID: ", req.session.userId);
  if (!req.session.userId) {
    return res.status(401).json('Cannot get cart items - Not signed in');
  }

  const user_id = req.session.userId;

  db.select('*')
    .from('cart_items')
    .where('user_id', '=', user_id)
    .then(result => {
      return res.json(result);
    })
    .catch(err => res.status(400).json('Error getting cart items'));
}

module.exports = {
  addItem: addItem,
  deleteItem: deleteItem,
  getItems: getItems
}