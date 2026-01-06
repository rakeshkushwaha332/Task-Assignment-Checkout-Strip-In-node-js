import express from "express";
import {
 getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.js";

const router = express.Router();


router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById); 

export default router;
