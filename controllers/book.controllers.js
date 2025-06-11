import Book from "../models/book.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const addBook = asyncHandler(async (req, res) => {
    const { name, author, publish, isbnNo, price } = req.validateBody;

    const existingBook = await Book.findOne({ name });
    if (existingBook) {
        return next(new ApiError(401, "This book already exists"));
    }

    const book = await Book.create({
        name,
        publish,
        author,
        isbnNo,
        price,
    });

    if (!book) {
        return next(new ApiError(403, "book adding failed"));
    }

    return res
        .status(201)
        .json(new ApiResponse(201, book, "book added successfully"));
});

export const getAllBooks = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({});
    if (!allBooks || allBooks.length === 0) {
        return next(new ApiError(404, "No books found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allBooks, "All Books fetched successfully"));
});

export const getBookById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new ApiError(401, "id is required"));
    }

    const book = await Book.findById(id);
    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, book, "Book fetched successfully"));
});


export const updateBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name, author, publish, isbnNo, price } = req.validateBody
    // const { name, author, publish, isbnNo, price } = req.body
    if (!id) {
        return next(new ApiError(401, "id is required"));
    }

    const book = await Book.findByIdAndUpdate(id, {
        name,
        author,
        publish,
        isbnNo,
        price,
    }, { new: true });
    
    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }

    // book.name = name || book.name
    // book.publish = publish || book.publish
    // book.isbnNo = isbnNo || book.isbnNo
    // book.author = author || book.author
    // book.price = price || book.price

    // await book.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, book, "Book updated Successfully")
        );
    
})

export const deleteBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return next(new ApiError(401, "id is required"));
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Book deleted Successfully"));
})