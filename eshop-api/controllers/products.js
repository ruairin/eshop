

const handleGetProducts = (req, res, db) => {

  db.select('*')
    .from('products')
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json('Error getting product data.'));
}

module.exports = {
  handleGetProducts: handleGetProducts
}