import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {

    },
    city: {

    },
    pincode: {

    }
}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)
export default Order