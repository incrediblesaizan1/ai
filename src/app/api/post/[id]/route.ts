import { NextRequest,NextResponse } from 'next/server'
import QuestionsModel from "@/models/questions.model";
import { connectDB } from "@/helpers/connectDB";
import { auth } from "@clerk/nextjs/server";

connectDB();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    await QuestionsModel.findOneAndDelete({ _id: id });

    return NextResponse.json(
      { message: "Message Deleted SuccessFully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while deleting the message",
      },
      { status: 500 }
    );
  }

}
