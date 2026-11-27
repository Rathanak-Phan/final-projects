
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loading from "../components/layout/Loading";

export default function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProductById(id)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    function addToCart() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart!");
    }

    if (loading) {
        return <Loading />;
    }

    if (error || !product) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold">Product not found</h2>
                <Link to="/products" className="text-blue-600 underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            <Link
                to="/products"
                className="text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow">

                <div>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-96 object-contain rounded-lg"
                    />
                </div>

                <div className="space-y-4">

                    <p className="text-gray-500 capitalize">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {product.title}
                    </h1>

                    <p className="text-yellow-600">
                        ⭐ {product.rating || "No rating"}
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600">
                        ${product.price}
                    </h2>

                    <p className="text-gray-600 leading-7">
                        {product.description}
                    </p>

                    <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </p>

                    <button
                        onClick={addToCart}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
}
