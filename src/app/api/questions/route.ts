import { connectDB } from "@/helpers/connectDB";
import QuestionsModel from "@/models/questions.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

connectDB();

export async function GET() {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    const questions = await QuestionsModel.find({ userId });

    return NextResponse.json({ user: userId, questions });
  } catch (error) {
    console.log(error)
  }
}


export async function POST(request: NextRequest) {
    
    try {
        const { userId, redirectToSignIn } = await auth();
        const reqBody = await request.json()
        const {question, answer} = reqBody

        if (!userId) return redirectToSignIn();

         await QuestionsModel.create({
            question: question,
            response: answer,
            userId: userId,
        })

      return  NextResponse.json({message: "Response added Successfully"}, {status: 200})

    } catch (error) {
      console.log(error)
    }

}