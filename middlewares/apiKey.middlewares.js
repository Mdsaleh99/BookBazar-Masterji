import ApiKey from "../models/api_key.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const validateApiKey = asyncHandler(async (req, res, next) => {
    const apiKey = req.headers["x-api-key"]
    // console.log(apiKey);
    
    if (!apiKey) {
        return next(new ApiError(403, "Missing Api key"))
    }

    const validApiKey = await ApiKey.findOne({ apiKey })
    
    if (!validApiKey) {
        return next(new ApiError(403, "Invalid API key"))
    }
    
    req.apiUser = validApiKey.userId
    next()
});