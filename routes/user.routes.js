import express from "express"
import { validate } from "../middlewares/validator.middlewares.js"
import { loginUserSchema, registerUserSchema } from "../validators/index.js"
import { login, logout, register } from "../controllers/user.controllers.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post("/register", validate(registerUserSchema), register)
router.post("/login", validate(loginUserSchema), login)
router.post("/logout", authMiddleware, logout)


export default router