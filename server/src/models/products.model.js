import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productImage:{
        type: [String],
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productStock:{
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

const productModel = mongoose.model("products", productSchema);

export default productModel;