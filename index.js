import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


import userRoutes from "./routes/user.routes.js"     
import bookRoutes from "./routes/book.routes.js";     
import reviewRoutes from "./routes/review.routes.js";     
import orderRoutes from "./routes/order.routes.js";     
import { connectToDB } from "./db/db.js"
import { globalErrorHandler } from "./middlewares/global_error_handler.middlewares.js"

const app = express()
dotenv.config();

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))


app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/book", bookRoutes)
app.use("/api/v1/review", reviewRoutes)
app.use("/api/v1/order", orderRoutes)


app.get("/", (req, res) => {
    return res.send({message: "Backend is running"})
})

connectToDB()
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

app.use(globalErrorHandler);