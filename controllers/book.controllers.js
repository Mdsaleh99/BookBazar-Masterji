import Book from "../models/book.models.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

export const addBook = asyncHandler(async (req, res) => {
    const { name, author, publish, isbnNo, price } = req.validateBody
    
    const existingBook = await Book.findOne({ name })
    if (existingBook) {
        return next(new ApiError(401, "This book already exists"))
    }

    const book = await Book.create({
        name,
        publish,
        author,
        isbnNo,
        price
    })

    if (!book) {
        return next(new ApiError(403, "book adding failed"));
    }

    return res.status(201).json(new ApiResponse(201, book, "book added successfully"))

})