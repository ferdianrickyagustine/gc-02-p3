import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const RegisterPage = () => {
  const formActionHandler = async (formData: FormData) => {
    "use server";

    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return redirect(`/register?error=${errorData.error}`);
      }

      return redirect("/login");
    } catch (error) {
      console.error("Error:", error);
      return redirect("/register?error=Something went wrong");
    }
  };

  return (
    <section className="bg-gray-300">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="flex justify-center pt-6">
            <Image
              src="https://img.lazcdn.com/g/tps/images/ims-web/TB1Hs8GaMFY.1VjSZFnXXcFHXXa.png"
              className="w-1/2 h-auto"
              alt="logo"
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action={formActionHandler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
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
                  placeholder="name@company.com"
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    I accept the Terms and Conditions
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 p-2 rounded-lg"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-black">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
