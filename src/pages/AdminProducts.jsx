
import { useState, useEffect } from "react";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  //   Get products
  useEffect(() => {
    getProducts(100, 0)
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //   Clear form
  function clearForm() {
    setTitle("");
    setPrice("");
    setCategory("");
    setEditId(null);
  }

  //   Add or Update product
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !category) {
      alert("Please fill in all fields");
      return;
    }

    const product = {
      title: title,
      price: Number(price),
      category: category
    };

    try {
      if (editId === null) {

        const newProduct = await addProduct(product);

        setProducts([newProduct, ...products]);

        alert("Product added successfully!");

      } else {

        const updatedProduct = await updateProduct(editId, product);

        setProducts(products.map(item =>
          item.id === editId
            ? { ...item, ...updatedProduct, ...product }
            : item
        ));

        alert("Product updated successfully!");
      }

      clearForm();

    } catch (error) {
      alert(error.message);
    }
  }

  //   Edit product
  function handleEdit(product) {
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category);
    setEditId(product.id);
  }

  //   Delete product
  async function handleDelete(id) {

    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts(products.filter(item => item.id !== id));

      alert("Product deleted successfully!");

    } catch (error) {
      alert(error.message);
    }
  }

  //    Search products
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Product Management
      </h1>

      {/* Product Form  */}
      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-lg font-semibold mb-4">
          {editId === null ? "Add New Product" : "Edit Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            placeholder="Product Name"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Product Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {editId === null ? "Add Product" : "Update Product"}
          </button>

          {editId !== null && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 text-white px-5 py-2 rounded ml-2"
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border p-3 rounded"
      />

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="4" className="p-5 text-center">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-5 text-center">
                  No products found.
                </td>
              </tr>
            ) : (

              currentProducts.map(product => (

                <tr key={product.id} className="border-t">

                  <td className="p-3">
                    {product.title}
                  </td>

                  <td className="p-3">
                    {product.category}
                  </td>

                  <td className="p-3">
                    ${product.price}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">

          <p className="text-gray-600">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

      <p className="text-gray-500">
        Total Products: {filteredProducts.length}
      </p>

    </div>
  );
}

export default AdminProducts;
