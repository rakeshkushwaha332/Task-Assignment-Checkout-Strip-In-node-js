import mongoose from "mongoose";
import Product from "./model/productModal.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Dummy products with real working image URLs
const products = [
  {
    name: "Wireless Headphones",
    price: 2999,
    description: "Noise cancelling wireless headphones with deep bass",
    image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Smart Watch",
    price: 4999,
    description: "Fitness tracking smart watch with heart rate monitor",
    image: "https://plus.unsplash.com/premium_photo-1712761997182-45455a50d8c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gaming Mouse",
    price: 1499,
    description: "RGB gaming mouse with adjustable DPI",
    image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mechanical Keyboard",
    price: 3499,
    description: "Backlit mechanical keyboard for gaming and coding",
    image: "https://images.unsplash.com/photo-1558050032-160f36233a07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bluetooth Speaker",
    price: 1999,
    description: "Portable Bluetooth speaker with powerful sound",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Laptop Backpack",
    price: 2199,
    description: "Water-resistant backpack with laptop compartment",
    image: "https://images.unsplash.com/photo-1667411424771-cadd97150827?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "USB-C Fast Charger",
    price: 999,
    description: "65W USB-C fast charger for laptops and mobiles",
    image: "https://images.unsplash.com/photo-1762117314602-59c22d8f6eb0?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "External Hard Drive",
    price: 5999,
    description: "1TB external hard drive for data backup",
    image: "https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const seedDB = async () => {
  try {
    // Delete all existing products
    await Product.deleteMany();
    console.log("All existing products deleted");

    // Insert new products
    await Product.insertMany(products);
    console.log("Dummy products inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
