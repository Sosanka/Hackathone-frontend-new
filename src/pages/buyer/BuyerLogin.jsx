import { Link } from "react-router-dom";

import BuyerLoginForm from "../../components/buyer/auth/BuyerLoginForm";

export default function BuyerLogin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-green-700 p-12 text-white lg:block">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-100">
              AgriChoice
            </p>

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              Welcome back.
            </h1>

            <p className="mt-5 text-green-100">
              Sign in to continue discovering products from sellers.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-green-600 lg:hidden">
                AgriChoice
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Buyer Login
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to your buyer account.
              </p>
            </div>

            <BuyerLoginForm />

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/buyer/register"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
