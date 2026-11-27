const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(limit = 30, skip = 0) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function searchProducts(query) {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search products");
  return response.json();
}

export async function getCategories(limit = 4) {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  const data = await response.json();
  return limit ? data.slice(0, limit) : data;
}

export async function getProductsByCategory(categorySlug) {
  const response = await fetch(`${BASE_URL}/category/${encodeURIComponent(categorySlug)}`);
  if (!response.ok) throw new Error("Failed to fetch category products");
  return response.json();
}

export async function addProduct(product) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
}
