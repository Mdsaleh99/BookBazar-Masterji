import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    // console.log(token);
    
    if (!token) {
        return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new ApiError(500, "Unauthorized - Invalid token");
    }

    const user = await User.findOne({ _id: decodedToken.id }).select("-password")
    
    if (!user) {
        throw new ApiError(404, "user not found")
    }

    req.user = user
    next()
})

export const authroizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log(req.user.role);
            console.log(roles);
            
            return next(
                new ApiError(
                    403,
                    "You do not have permission to access this resource"
                )
            );
        }

        next()
    }
}