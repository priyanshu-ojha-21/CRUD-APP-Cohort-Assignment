import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/auth.utils.js";

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exist with this email address",
      errors: [
        {
          path: "email",
          msg: "User already exists with this email address",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    }
  })
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(401).json({
          message: "Invalid email or password"
        });
    };

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    };

    const accessToken = generateAccessToken({userId: user._id});
    const refreshToken = generateRefreshToken({userId: user._id});

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });

    return res.status(200).json({
        message: "User loggedIn Successfully",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        }
    });
}

export const refreshController = async (req, res) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh Token is required"
        });
    };

    try {
        const decoded  = verifyRefreshToken(refreshToken);
        const user = await userModel.findById(decoded.id);

        if(refreshToken !== user.refreshToken){
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            });

            return res.status(401).json({
                message: "Refresh token mismatch"
            });
        }

        const accessToken = generateAccessToken({userId: user._id});
        const newRefreshToken = generateRefreshToken({userId: user._id});

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000           
        });

        return res.status(200).json({
            message: "Tokens rotated successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                accessToken
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        });
    }
}

export const getMe = async (req, res) => {
    const id = req.user;

    const user = await userModel.findById(id);

    return res.status(200).json({
        message: "User fetched Successfully",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
    })
};

export const logoutUser = async (req, res) => {
    const userId = req.user; 

    await userModel.findByIdAndUpdate(userId, {
        refreshToken: null
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};
