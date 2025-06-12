import express from "express"
import { authMiddleware } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { addReviewToBook, deleteReview, getAllReviewsByBook } from "../controllers/review.controllers.js";
import { addReviewToBookSchema } from "../validators/index.js";

const router = express.Router()

router.post(
    "/:bookId/reviews",
    validate(addReviewToBookSchema),
    authMiddleware,
    addReviewToBook
);

router.get(
    "/:bookId/reviews",
    authMiddleware,
    getAllReviewsByBook
);

router.delete("/:id", authMiddleware, deleteReview)

export default router