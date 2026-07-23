import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Cart.css";
import Footer from "../components/Footer";

function Cart() {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="total-card">
            <h2>Your Cart is Empty</h2>
            <p>Add some products from the Home page.</p>
          </div>
        ) : (
          <>
            {cart
              .filter((item) => item.product)
              .map((item) => (
                <div className="cart-card" key={item._id}>
                  <img
                    src={`http://localhost:5005/uploads/${item.product.image}`}
                    alt={item.product.name}
                  />

                  <div className="cart-details">
                    <h2>{item.product.name}</h2>

                    <p className="cart-price">
                      ₹{Number(item.product.price).toLocaleString("en-IN")}
                    </p>

                    <p className="cart-qty">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

            <div className="total-card">
              <h2>
                Total: ₹{Number(total).toLocaleString("en-IN")}
              </h2>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;