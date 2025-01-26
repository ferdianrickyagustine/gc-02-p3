"use server";

import { findUserByEmail } from "@/db/models/user";
import { redirect } from "next/navigation";
import { compare } from "@/utils/bcrypt";
import { signToken } from "@/utils/jwt";

import { z } from "zod";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const loginHandler = async (formData: FormData) => {
	const loginInputSchema = z.object({
		email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
		password: z.string().min(1, "Password tidak boleh kosong"),
	});
    

	const email = formData.get("email");
	const password = formData.get("password");
    if (!email || !password) {
        return redirect(`${BASE_URL}/login?error=Email%20atau%20Password%20tidak%20boleh%20kosong`);
      }
	const parsedData = loginInputSchema.safeParse({
		email,
		password,
	});

	if (!parsedData.success) {
		const errPath = parsedData.error.issues[0].path[0];
		const errMessage = parsedData.error.issues[0].message;
		const errFinalMessage = `${errPath} - ${errMessage}`;

		return redirect(`${BASE_URL}/login?error=${errFinalMessage}`);
	}

	const user = await findUserByEmail(parsedData.data.email);

	if (!user || !compare(parsedData.data.password, user.password)) {
		return redirect(`${BASE_URL}/login?error=Invalid%20credentials`);
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

	return redirect(`${BASE_URL}`);
};