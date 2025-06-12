import Review from "../models/review.models.js";
import Book from "../models/book.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";

export const addReviewToBook = asyncHandler(async (req, res, next) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    const { review, rating } = req.validateBody;

    if (!bookId || !userId) {
        return next(new ApiError(403, "Book id and User id is required"));
    }

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }

    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    const newReview = await Review.create({
        userId,
        bookId,
        review,
        rating,
    });

    if (!newReview) {
        return next(new ApiError(401, "Review creation failed"));
    }

    res.status(201).json(
        new ApiResponse(201, newReview, "Review created successfully")
    );
});

export const getAllReviewsByBook = asyncHandler(async (req, res, next) => {
    const { bookId } = req.params;

    if (!bookId) {
        return next(new ApiError(403, "Book id is required"));
    }

    const review = await Review.find({ bookId });
    if (!review || review.length === 0) {
        return next(new ApiError(404, "Review not found for this book"));
    }

    res.status(200).json(
        new ApiResponse(200, review, "Review fetched for a book successfully")
    );
});

// export const deleteReview = asyncHandler(async (req, res, next) => {
//     const userId = req.user.id;
//     const { id } = req.params;

//     // What’s wrong?

//     // This gives you all reviews by the user, as an array, not a single review.
//     // Then you’re comparing:
//     const reviewByUser = await Review.find({ userId: userId });
//     const review = await Review.findByIdAndDelete(id);
//     // console.log(userId);
//     // console.log(reviewByUser);
//     // console.log(review);

//     // You're comparing a string (userId) to an array, which will always return true — leading to incorrect authorization errors.
//     if (userId !== reviewByUser) {
//         return next(new ApiError(401, "You can not delete others review"));
//     }

//     if (!review) {
//         return next(new ApiError(404, "Review Not found"));
//     }

//     res.status(200).json(
//         new ApiResponse(200, {}, "Review deleted successfully")
//     );
// })

export const deleteReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
        return next(new ApiError(404, "Review Not found"));
    }

    if (review.userId.toString() !== userId) {
        return next(new ApiError(401, "You can not delete others review"));
    }

    await review.deleteOne();

    res.status(200).json(
        new ApiResponse(200, {}, "Review deleted successfully")
    );
});
