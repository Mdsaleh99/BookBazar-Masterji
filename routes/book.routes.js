import express from "express"
import { authMiddleware, authroizedRoles } from "../middlewares/auth.middlewares.js"
import { validate } from "../middlewares/validator.middlewares.js"
import { addBook } from "../controllers/book.controllers.js"
import { addBookSchema } from "../validators/index.js"

const router = express.Router()

router.post("/add", validate(addBookSchema), authMiddleware, authroizedRoles("ADMIN"), addBook)

export default router