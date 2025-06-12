import express from "express"
import { validate } from "../middlewares/validator.middlewares.js"
import { createOrderSchema } from "../validators/index.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"
import { createOrder, getOrderById, getUserOrders } from "../controllers/order.controllers.js"

const router = express.Router()

router.post("/:bookId", validate(createOrderSchema), authMiddleware, createOrder)
router.get("/user-order", authMiddleware, getUserOrders)
router.get("/:id", authMiddleware, getOrderById)

export default router