import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const DisplayProduct = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      if (editingProduct) {
        await axios.put(
          `http://localhost:8000/api/products/${editingProduct._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShow(false);
      setEditingProduct(null);
      setFormData({ name: "", price: "", description: "", image: null });
      setPreview(null);
      getProducts();
    } catch (error) {
      console.log("Error saving product:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null, 
    });
    setPreview(product.image ? product.image : null);
    setShow(true);
  };


  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", image: null });
    setPreview(null);
    setShow(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Product List</h2>
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        + Add Product
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id} className="text-center align-middle">
                <td>{index + 1}</td>
                <td>
                  {product.image ? (
                    <img
                     src={`http://localhost:8000${product.image}`}
                 
                      style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

     
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DisplayProduct;
