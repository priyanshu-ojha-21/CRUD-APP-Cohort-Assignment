import express from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { idValidator, productValidator, updateProductValidator } from "../validators/product.validator.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// create Product
router.post("/", authenticate, productValidator, createProduct);

// get All Product
router.get("/", getAllProducts);

// get Product by id
router.get("/:id",idValidator, getProductById);

// update product
router.put("/:id", authenticate, idValidator, updateProductValidator, updateProduct);

// Delete Product
router.delete("/:id", authenticate, idValidator, deleteProduct);




export default router;