import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    apiKey: {
        type: String
    }
}, {timestamps: true})

const ApiKey = mongoose.model("ApiKey", apiKeySchema)
export default ApiKey