const apiUrl = "https://63f620fa59c944921f6d9e17.mockapi.io/shoes";

// GET all products
export async function getAllProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// GET product by ID
export async function getProductById(id) {
  try {
    const response = await fetch(apiUrl + `/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST a new product
export async function createProduct(product) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// PUT update a product by ID
export async function updateProductById(id, product) {
  try {
    const response = await fetch(apiUrl + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// DELETE a product by ID
export async function deleteProductById(id) {
  try {
    const response = await fetch(apiUrl + `/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
