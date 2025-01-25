import { NextResponse } from "next/server";
import { createUser } from "@/db/models/user";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const UserInputSchema = z.object({
  name: z.string().optional(),
  username: z.string({
    message: "Username must be a string",
  }),
  email: z
    .string({
      message: "Email must be a string",
    })
    .email("Invalid email format"),
  password: z
    .string({
      message: "Password must be a string",
    })
    .min(6, "Password must be more than 5 characters"),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = UserInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success create an account",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {

      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errorPath} - ${errorMessage}`,
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json<MyResponse<never>>(
    {
      statusCode: 500,
      message: "Internal Server Error",
    },
    {
      status: 500,
    }
  );
};
