import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import productModal from "./model/productModal.js";
import stripeRoute from "./routes/stripeRoute.js";
import productRoute from "./routes/productRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
   .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error in connecting MongoDB", err);
  });



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));

app.post("/api/product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const product = new productModal({ name, price, description, image });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
    console.log(product);
  } catch (error) {
    console.log("Error in product upload", error);
  }
});
app.get("/api/products", async (req, res) => {
  const products = await productModal.find();
  res.json(products);
});


// stripe payment
app.use("/", stripeRoute);
app.use("/api/products", productRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
