
/**
 * Get product categories from server
 * 
 * @returns JSON array of categories
 */

export async function getCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories');
    if (response.ok) {
      const categories = await response.json();
      return categories;
    }
    throw new Error(response.status);
  } catch (error) {
    console.log("Error in fetch getCategories(): ", error);
  }
}

/**
 * Get product data from server
 * 
 * @returns JSON array of products
 */

export async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    if (response.ok) {
      const products = await response.json();
      return products;
    }
    throw new Error(response.status);
  } catch (error) {
    console.log("Error in fetch getProducts(): ", error);
  }
}

export async function signOut() {
  const response = await fetch('http://localhost:3000/signout', {
    method: "GET",
    credentials: "include",
  });
}



// export function getProducts() {

//   const products =
//     fetch('http://localhost:3000/products')
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw response.status;
//       })
//       .catch(err => console.log("Error in fetch getProducts(): ", err));
//   return products;
// }