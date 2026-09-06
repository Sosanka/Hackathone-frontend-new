import { Navigate, useSearchParams } from "react-router-dom";

import SellerOtpVerification from "../../components/auth/SellerOtpVerification";

export default function SellerVerifyOTP() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  if (!email) {
    return <Navigate to="/seller/register" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <SellerOtpVerification email={email} />
          </div>
        </div>
      </div>
    </div>
  );
}
