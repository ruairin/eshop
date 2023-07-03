

const handleGetProducts = (req, res, db) => {

  db.select('*')
    .from('products')
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json('Error getting product data.'));
}

const handleGetCategories = (req, res, db) => {

  db.select('*')
    .from('categories')
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json('Error getting categories data.'));
}

module.exports = {
  handleGetProducts: handleGetProducts,
  handleGetCategories: handleGetCategories
}