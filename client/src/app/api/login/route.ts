"use server";

import { findUserByEmail } from "@/db/models/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";
import { signToken } from "@/utils/jwt";
import { compare } from "@/utils/bcrypt";

export const doLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return redirect(`http://localhost:3001/login?error=${errFinalMessage}`);
  }

  const user = await findUserByEmail(parsedData.data.email);

  if (!user || !compare(parsedData.data.password, user.password)) {
    return redirect("http://localhost:3001/login?error=Invalid%20credentials");
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = signToken(payload);

  const cookieStorage = await cookies();
  cookieStorage.set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60), 
    sameSite: "strict",
  });

  return redirect("http://localhost:3001/");
};
