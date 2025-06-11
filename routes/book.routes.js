import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controllers.js"
import { addBookSchema } from "../validators/index.js"
import { validateApiKey } from "../middlewares/apiKey.middlewares.js"

const router = express.Router()

router.post("/add", validate(addBookSchema), authMiddleware, authroizedRoles("ADMIN"), addBook)

router.get(
    "/get-all-books",
    authMiddleware,
    validateApiKey,
    getAllBooks
);

router.get(
    "/:id",
    authMiddleware,
    // validateApiKey,
    getBookById
);

router.put("/:id", validate(addBookSchema), authMiddleware, authroizedRoles("ADMIN"), updateBook)

router.delete("/:id", authMiddleware, authroizedRoles("ADMIN"), deleteBook)

export default router