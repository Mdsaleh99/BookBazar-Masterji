import express from "express"
import { validate } from "../middlewares/validator.middlewares.js"
import { registerUserSchema } from "../validators/index.js"
import { register } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/register", validate(registerUserSchema), register)

export default router