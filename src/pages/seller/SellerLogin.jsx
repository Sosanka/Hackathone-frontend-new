import { Link } from "react-router-dom";

import SellerLoginForm from "../../components/auth/SellerLoginForm";

export default function SellerLogin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-2xl font-bold text-white">
              S
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Seller Login</h1>

            <p className="mt-2 text-gray-500">Sign in to your seller account</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <SellerLoginForm />

            <div className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/seller/register"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
