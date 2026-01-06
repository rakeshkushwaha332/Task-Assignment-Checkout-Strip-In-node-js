import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading Product...</h3>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "30px",
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        <div style={{ flex: "1 1 45%", textAlign: "center", padding: "10px" }}>
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product?.name}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: "1 1 45%", padding: "10px" }}>
          <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>{product.name}</h2>
          <h4 style={{ color: "#28a745", marginBottom: "15px" }}>₹{product.price}</h4>
          <p style={{ color: "#6c757d", marginBottom: "20px" }}>{product.description}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => dispatch(addToCart(product))}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
