import Link from "next/link";
import Image from "next/image";

import ErrorComponent from "@/components/ErrorComponent";
import { loginHandler } from "./action";
export default function LoginPage () {
  

  return (
    <section className="bg-gray-300">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="flex justify-center pt-6">
            <Link
              href="/"
              className="flex items-center justify-center min-h-full">
            <Image
              src="https://img.lazcdn.com/g/tps/images/ims-web/TB1Hs8GaMFY.1VjSZFnXXcFHXXa.png"
              width={150}
              height={50}
              className="w-1/2 h-auto"
              alt="logo"
            />
            </Link>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center">
              Login
            </h1>
            <label className="text-xl w-full justify-center font-bold">

            <ErrorComponent />
            </label>
            <form className="space-y-4 md:space-y-6" action={loginHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 p-2 rounded-lg"
              >
                Login
              </button>
              <p className="text-sm font-light text-black">
                Already have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:underline "
                >
                  Register Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


