import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({

    question: {
        type: String,   
        required: true
    },
    response: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const Questions = mongoose.models.questions || mongoose.model("questions", QuestionsSchema)

export default Questions