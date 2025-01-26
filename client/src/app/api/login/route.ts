"use server";
import { findUserByEmail } from "@/db/models/user";
import { z } from "zod";
import { cookies } from "next/headers";
import { signToken } from "@/utils/jwt";
import { compare } from "@/utils/bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
      const body = await request.json();
      const { email, password } = body;

      const loginInputSchema = z.object({
          email: z.string().email(),
          password: z.string(),
      });

      const parsedData = loginInputSchema.safeParse({
          email,
          password,
      });

      if (!parsedData.success) {
          const errPath = parsedData.error.issues[0].path[0];
          const errMessage = parsedData.error.issues[0].message;
          const errFinalMessage = `${errPath} - ${errMessage}`;

          return NextResponse.json(
              {
                  statusCode: 400,
                  error: errFinalMessage,
              },
              { status: 400 }
          );
      }

      const user = await findUserByEmail(parsedData.data.email);

      if (!user || !compare(parsedData.data.password, user.password)) {
          return NextResponse.json(
              {
                  statusCode: 401,
                  error: "Invalid credentials",
              },
              { status: 401 }
          );
      }

      const payload = {
          id: user._id,
          email: user.email,
      };

      const token = signToken(payload);

      const cookieStore = await cookies();
      cookieStore.set("token", token, {
          httpOnly: true,
          secure: false,
          expires: new Date(Date.now() + 1000 * 60 * 60), 
          sameSite: "strict",
      });

      return NextResponse.json({
          statusCode: 200,
          message: "Login success",
      });
  } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json(
          {
              statusCode: 500,
              error: "Internal server error",
          },
          { status: 500 }
      );
  }
}
