import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await API.post(
        "/cart",
        { productId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Product added to cart");
      await loadProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">
          Loading Products...
        </div>
      </>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="home">
        <h1>E-Commerce Store</h1>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="products">
          {filteredProducts.length === 0 ? (
            <div className="empty-products">
              No Products Available
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div className="card" key={product._id}>
                <img
                  src={`http://localhost:5005/uploads/${product.image}`}
                  alt={product.name}
                />

                <div className="card-body">
                  <h2>{product.name}</h2>

                  <p>{product.description}</p>

                  <div className="price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </div>

                  <div className="category">
                    {product.category}
                  </div>

                  <p className="stock">
                    Stock: {product.stock}
                  </p>

                  <button
  onClick={() => addToCart(product._id)}
  disabled={product.stock === 0}
>
  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;