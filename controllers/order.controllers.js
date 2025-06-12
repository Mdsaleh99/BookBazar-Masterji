import Book from "../models/book.models.js";
import Order from "../models/order.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createOrder = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { address, city, state, pincode } = req.validateBody;

    const book = await Book.findById(bookId);
    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }

    const order = await Order.create({
        bookId,
        userId,
        address,
        pincode,
        city,
        state,
    });

    if (!order) {
        return next(new ApiError(401, "Order creation failed"));
    }

    res.status(201).json(
        new ApiResponse(201, order, "Order placed successfully")
    );
});

export const getUserOrders = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const orders = await Order.find({ userId });
    // console.log(order);

    if (!orders || orders.length === 0) {
        return next(new ApiError(404, "No orders found for this user"));
    }

    // do not need to manually check if the user owns these orders. The DB query already ensures only the current user’s orders are fetched.
    // if (orders.userId !== userId) {
    //     return next(new ApiError(401, "You Can not see others orders"));
    // }

    res.status(200).json(
        new ApiResponse(200, orders, "User orders fetched successfully")
    );
})

export const getOrderById = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const { id } = req.params
    
    const order = await Order.findById(id)
    if (!order) {
        return next(new ApiError(404, "Order not found"))
    }

    if (order.userId.toString() !== userId) {
        return next(new ApiError(401, "You can not access others order details"));
    }

    res.status(200).json(new ApiResponse(200, order, "order fetched successfully"))
})