import { Link } from "react-router-dom";

import BuyerRegisterForm from "../../components/buyer/auth/BuyerRegisterForm";

export default function BuyerRegister() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-green-700 p-12 text-white lg:block">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-100">
              AgriChoice
            </p>

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              Buy fresh products directly from sellers.
            </h1>

            <p className="mt-5 text-green-100">
              Create your buyer account and discover products available from
              local sellers.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-green-600 lg:hidden">
                AgriChoice
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Create account
              </h2>

              <p className="mt-2 text-sm text-gray-500">Register as a buyer.</p>
            </div>

            <BuyerRegisterForm />

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/buyer/login"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
