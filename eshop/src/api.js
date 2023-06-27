
// ======= DB Placeholders =========
const temp = [...Array(60).keys()];
const products = temp.map((item, index) => {

  let category_id = 0;
  let image = '300.jpg';
  if (index >= 20 && index < 40) {
    category_id = 1;
    image = 'icons8-puffin-bird-96.png';
  } else if (index >= 40) {
    category_id = 2;
    image = 'icons8-bee-swarm-96.png';
  }

  return (
    {
      id: `${item}`,
      title: `Product ${item + 1}`,
      price: 2.99,
      description: `This is product ${item + 1}`,
      prod_code: `SKU001 ${item + 1}`,
      image: image,
      inventory: 100,
      category_id: category_id,
    }
  );
});
console.log(products);


const users = [
  {
    id: 0,
    email: 'ted@gmail.com',
    firstName: 'Ted',
    lastName: 'Danson'
  },
  {
    id: 1,
    email: 'mike@gmail.com',
    firstName: 'Mike',
    lastName: 'Mahoney'
  },
  {
    id: 2,
    email: 'jack@gmail.com',
    firstName: 'Jack',
    lastName: 'Jones'
  },
]

const login = [
  { email: 'ted@gmail.com', hash: '1234' },
  { email: 'mike@gmail.com', hash: 'xxxx' },
  { email: 'jack@gmail.com', hash: 'YYYY' },
]

const categories = [
  { id: 0, title: 'Category 1', description: 'Description text for category 1', image: '300.jpg' },
  { id: 1, title: 'Category 2', description: 'Description text for category 2', image: 'icons8-puffin-bird-96.png' },
  { id: 2, title: 'Category 3', description: 'Description text for category 3', image: 'icons8-bee-swarm-96.png' },
]

export function getCategories() {
  return categories;
}

export function getLogin() {
  return login;
}

export function getUsers() {
  return users;
}

export function getProducts() {
  return products;
}