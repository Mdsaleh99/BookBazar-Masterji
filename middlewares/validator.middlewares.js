import { ApiError } from "../utils/api-error.js"

export const validate = (schema) => (
    (req, res, next) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            throw new ApiError(400, "Validation failed", {errors: result.error.format()})
        }

        req.validateBody = result.data
        next()
    } 
)