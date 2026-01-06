import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Data fetching error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
    
    <div className="homePage">
      <div className="container mt-4" style={{ minHeight: "100vh" }}>
        <Row className="justify-content-center">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="shadow-sm border-0 hover:shadow-lg transition-all"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
  variant="top"
  src={product.image} // <- use directly
  height={220}
  style={{ objectFit: "cover", borderBottom: "1px solid #eee" }}
/>

                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-dark">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="text-muted mb-3">
                      ₹{product.price}
                    </Card.Text>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h2>No Products Found</h2>
          )}
        </Row>
      </div>
    </div>
    </>
  );
};

export default Home;

