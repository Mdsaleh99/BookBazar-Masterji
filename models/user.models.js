import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
        uppercase: true,
    },
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    
    try {
        this.password = bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})


const User = mongoose.model("User", userSchema)
export default User