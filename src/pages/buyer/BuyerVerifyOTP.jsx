import { Link } from "react-router-dom";

import BuyerOtpVerification from "../../components/buyer/auth/BuyerOtpVerification";

export default function BuyerVerifyOTP() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full rounded-3xl bg-white p-6 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✉️
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Verify your email
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter the verification code sent to your email.
            </p>
          </div>

          <BuyerOtpVerification />

          <div className="mt-6 text-center">
            <Link
              to="/buyer/login"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
