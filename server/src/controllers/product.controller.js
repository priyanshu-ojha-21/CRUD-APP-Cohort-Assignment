import productModel from "../models/products.model.js";

export const createProduct = async (req, res) => {
    try {
        const { productName, productImage, productPrice, productStock } = req.body;
        const createdBy = req.user;

        const product = await productModel.create({
            productName, productImage, productPrice, productStock, createdBy
        });

        return res.status(201).json({
            message: "Product created successfully",
            data: { product }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({
            message: "Products fetched successfully",
            data: { products }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: {product}
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {productName, productImage, productPrice, productStock} = req.body;

        const product = await productModel.findById(productId);

        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        };

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            {productName, productImage, productPrice, productStock},
            {
                new: true
            }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            data: {updatedProduct}
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    };
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        };

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        return res.status(200).json({
            message: "Product deleted successfully",
            data: {deletedProduct}
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    };
}