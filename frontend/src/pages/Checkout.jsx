import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [userdata, setuserdata] = useState({});
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const stripePromise = loadStripe(
    "pk_test_51SFbG9QjoMjLhLaQz4CVk15UJkN70VXJYi1vxSSCruJr8B8BhRpLsrGpeXWqZDoE2tf5M9HeQ4dlRrtp5hTLz4sW00Hqsx5KNR"
  );

  const handlePay = async () => {
    try {
      if (
        !userdata.name ||
        !userdata.address ||
        !userdata.city ||
        !userdata.state ||
        !userdata.pincode ||
        !userdata.email
      ) {
        alert("Please fill all details");
        return;
      }

      localStorage.setItem("userdata", JSON.stringify(userdata));
      const stripe = await stripePromise;
      const api = "http://localhost:8000/stripe-payment";

      const formattedCart = cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const totalAmount = total;

      const response = await axios.post(api, {
        cartItems: formattedCart,
        userdata,
        totalAmount,
      });

      const session = response.data;
      console.log(
        "cart data ",
        localStorage.setItem("formattedCart", JSON.stringify(formattedCart))
      );

      if (!session.url) {
        console.error("Stripe session not returned:", session);
        return;
      }

      window.location.href = session.url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment failed. Please try again.");
    }
  };

  const changeval = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handlecancelPay = () => {
    navigate("/cancel");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
       
        <div className="checkout-cart">
          <h3>Order Summary</h3>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toLocaleString()}</td>
                  <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="4" className="text-end">
                  <strong>Grand Total</strong>
                </td>
                <td>
                  <strong>₹{total.toLocaleString()}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="checkout-form">
          <h3>Shipping Details</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={changeval}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeval}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={changeval}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={changeval}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={changeval}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={changeval}
            />
          </div>

          <div className="button-group">
            <button className="pay-btn" onClick={handlePay}>
              Pay Now ₹{total.toLocaleString()}
            </button>
            <button className="cancel-btn" onClick={handlecancelPay}>
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
