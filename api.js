const API_URL = "http://localhost:8080";
const addToCartPath = "add-to-cart";

export async function auth(email, password, method) {
  const formData = {
      username: email,
      password: password
  };

  try {
      const response = await fetch(`${API_URL}/${method}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

export async function addToCart(user_id, title, imageUrl, price) {
  try {
    const response = await fetch(`${API_URL}/${addToCartPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, title, imageUrl, price }),
    });
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error adding book to cart:', error);
  }
}
