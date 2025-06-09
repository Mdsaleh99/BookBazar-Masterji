import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 50,
        },
        isbnNo: {
            type: String,
            required: true,
        },
        publish: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { timestamps: true }
);


const Book = mongoose.model("Book", bookSchema)
export default Book