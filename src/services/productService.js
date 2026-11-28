const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(limit = 30, skip = 0) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function searchProducts(query) {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
  );
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
  const response = await fetch(
    `${BASE_URL}/category/${encodeURIComponent(categorySlug)}`,
  );
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
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}

export async function searchProductsByCategories(query, categorySlugs) {
  const q = query.trim().toLowerCase();
  if (!q || !categorySlugs.length) {
    return { products: [] };
  }

  const results = await Promise.all(
    categorySlugs.map((slug) => getProductsByCategory(slug))
  );

  // Deduplicate by product id in case a product appears in multiple lists
  const uniqueMap = new Map();
  for (const res of results) {
    for (const item of res.products || []) {
      uniqueMap.set(item.id, item);
    }
  }

  const filtered = Array.from(uniqueMap.values()).filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    return title.includes(q) || description.includes(q) || category.includes(q);
  });

  const getMatchPriority = (product) => {
    const title = product.title?.toLowerCase() || "";
    if (title.startsWith(q)) return 0;
    if (title.includes(q)) return 1;
    if (product.category?.toLowerCase().includes(q)) return 2;
    return 3;
  };

  filtered.sort((a, b) => getMatchPriority(a) - getMatchPriority(b));

  return { products: filtered };
}
