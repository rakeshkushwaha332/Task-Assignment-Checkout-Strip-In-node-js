// import express from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";
// import PaymentModal from '../model/payment.js';

// dotenv.config();

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/stripe-payment", async (req, res) => {
//   try {
//     const { cartItems, userdata, totalAmount } = req.body;

//     if (!cartItems || !Array.isArray(cartItems)) {
//       return res.status(400).json({ error: "cartItems must be an array" });
//     }

//     const line_items = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));



//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: "http://localhost:5173/cancel",
//       metadata: {
//         customer_name: userdata.name,
//         customer_email: userdata.email,
//         totalAmount: totalAmount.toString(),
//       }
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/save-order", async (req, res) => {
//   try {
//     const { session_id, userdata, cartItems, totalAmount } = req.body;

  
//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ error: "Payment not completed yet." });
//     }
//     const newPayment = new PaymentModal({
//       name: userdata.name,
//       email: userdata.email,
//       address: userdata.address,
//       city: userdata.city,
//       state: userdata.state,
//       pincode: userdata.pincode,
//       Product: cartItems,
//       totalamount: totalAmount.toString(),
//       OrderId: session.payment_intent,
//     });

//     await newPayment.save();

//     res.json({ message: "Order saved successfully" });
//   } catch (error) {
//     console.error("Save order error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });



// router.get("/orders", async (req, res) => {
//   try {
//     const orders = await PaymentModal.find().sort({ _id: -1 });
//     res.json(orders);
//   } catch (error) {
//     console.error("Get orders error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });


// export default router;


// v2


import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import PaymentModal from "../model/payment.js";
import Order from "../model/orderModel.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =====================================================
   STRIPE CHECKOUT (YOUR EXISTING WORKING CODE)
===================================================== */

router.post("/stripe-payment", async (req, res) => {
  try {
    const { cartItems, userdata, totalAmount } = req.body;

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: "cartItems must be an array" });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        customer_name: userdata.name,
        customer_email: userdata.email,
        totalAmount: totalAmount.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   PAYMENT INTENT (NEW FLOW)
===================================================== */

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { cartItems, customerEmail, totalAmount } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || !customerEmail || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = `ORD-${uuidv4().split("-")[0].toUpperCase()}`;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
      receipt_email: customerEmail,
      metadata: {
        orderId,
        email: customerEmail,
        items: JSON.stringify(cartItems),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error("PaymentIntent error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   STRIPE WEBHOOK (FOR PAYMENT INTENT)
===================================================== */

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const intent = event.data.object;

    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.payment_failed"
    ) {
      await Order.create({
        orderId: intent.metadata.orderId,
        purchaseId: intent.id,
        transactionId: intent.charges?.data[0]?.id || intent.id,
        customerEmail: intent.receipt_email || intent.metadata.email,
        paymentStatus:
          event.type === "payment_intent.succeeded" ? "succeeded" : "failed",
        items: JSON.parse(intent.metadata.items || "[]"),
        totalAmount: intent.amount,
        currency: intent.currency.toUpperCase(),
      });

      console.log(
        `${event.type === "payment_intent.succeeded" ? "✅" : "❌"} Order ${
          intent.metadata.orderId
        } saved`
      );
    }

    res.json({ received: true });
  }
);

export default router;
