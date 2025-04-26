import { NextRequest, NextResponse } from "next/server";
import QuestionsModel from "@/models/questions.model";
import { connectDB } from "@/helpers/connectDB";
import { auth } from "@clerk/nextjs/server";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) return redirectToSignIn();

    const find = await QuestionsModel.findOne({ _id: id });

    return NextResponse.json({ find }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while fetching questions",
        error,
      },
      { status: 500 }
    );
  }
}
