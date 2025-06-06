import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

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
