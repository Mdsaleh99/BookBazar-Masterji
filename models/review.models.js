import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: {
        type: String,
        requried: true
    },
    rating: {
        type: Number,
        requried: true
    }
}, { timestamps: true });


const Review = mongoose.model("Review", reviewSchema)
export default Review