import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import ApiKey from "../models/api_key.models.js";

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.validateBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const newUser = await User.create({
        name,
        email,
        password,
    });

    if (!newUser) {
        throw new ApiError(403, "user register failed");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newUser, "user registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.validateBody;

    // const user = await User.findOne({ email }).select("-password"); // don't give select here if u comparing password if we do here we get password field as a undefined
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
        throw new ApiError(404, "User not exist, please register or signup");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "email or password incorrect");
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    };

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    return res
        .status(201)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                201,
                {
                    id: user._id,
                    name: user.name,
                    email,
                },
                "user logged in successfully"
            )
        );
});


export const logout = asyncHandler(async (req, res) => {
    res.status(200)
        .clearCookie("token")
        .json(new ApiResponse(200, {}, "User logged out successfully"));
})


export const getMe = asyncHandler((req, res) => {
    // console.log(req.headers);
    
    return res.status(200).json(new ApiResponse(200, {
        user: req.user
    }, "User authenticated successfully"))
})

export const generateApiKey = asyncHandler(async (req, res, next) => {
    const user = req.user.id
    const genApiKey = crypto.randomBytes(32).toString("hex")

    const apiKey = await ApiKey.create({
        userId: user,
        apiKey: genApiKey
    })

    if (!apiKey) {
        return next(new ApiError(403, "Api key genration failed"))
    }

    return res.status(201).json(new ApiResponse(201, apiKey, "Api key generated successfully"))
})