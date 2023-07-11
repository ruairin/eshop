
export async function addCartItem(id, qty) {

  try {
    const response = await fetch('http://localhost:3000/addCartItem', {
      method: 'post',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: id,
        qty: qty
      })
    });

    if (response.ok) {
      const addedItem = await response.json();
      if (addedItem) {
        return addedItem;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}


export async function getCartItems() {

  try {
    const response = await fetch('http://localhost:3000/getCartItems', {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const cartItems = await response.json();
      if (cartItems) {
        return cartItems;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}


export async function deleteCartItem(id) {

  try {
    const response = await fetch('http://localhost:3000/deleteCartItem', {
      method: 'delete',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
      })
    });

    if (response.ok) {
      const deletedItem = await response.json();
      if (deletedItem) {
        return deletedItem;
      }
    }
    throw new Error(response.status);
  } catch (error) {
    return error;
  }
}
