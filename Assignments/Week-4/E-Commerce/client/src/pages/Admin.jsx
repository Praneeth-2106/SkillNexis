import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Admin.css";
import Footer from "../components/Footer";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("stock", form.stock);

      if (image) {
        data.append("image", image);
      }

      if (editingId) {
        await API.put(`/products/${editingId}`, data);
        alert("Product Updated Successfully!");
      } else {
        await API.post("/products", data);
        alert("Product Added Successfully!");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImage(null);
      setEditingId(null);

      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <div className="admin-page">

        <h1>⚙️ Admin Dashboard</h1>

        <form className="admin-form" onSubmit={addProduct}>

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button>
            {editingId ? "Update Product" : "Add Product"}
          </button>

        </form>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1f2937",
          }}
        >
          All Products
        </h2>

        <div className="admin-products">

          {products.map((product) => (

            <div
              className="admin-card"
              key={product._id}
            >

              <img
                src={`http://localhost:5005/uploads/${product.image}`}
                alt={product.name}
              />

              <div className="admin-body">

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="admin-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </div>

                <p>
                  <strong>Category:</strong> {product.category}
                </p>

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <div className="admin-actions">

                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
      <Footer />
    </>
  );
}

export default Admin;