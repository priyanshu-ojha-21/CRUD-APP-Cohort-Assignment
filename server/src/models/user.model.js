import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   email : {
        type: String,
        unique: true,
        required: true
    },

    name : {
        type: String,
        required: true
    },
    passwordHash : {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;