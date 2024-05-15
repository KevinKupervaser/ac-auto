import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { SignInCredentials } from "@/app/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = (await req.json()) as SignInCredentials;
  if (!email || !password)
    return NextResponse.json({
      error: "Invalid request, email password missing!",
    });

  await startDb();
  const user = await UserModel.findOne({ email });
  if (!user) return NextResponse.json({ error: "Error el Email/Contraseña no coinciden!" });

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch)
    return NextResponse.json({ error: "Error el Email/Contraseña no coinciden!" });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
