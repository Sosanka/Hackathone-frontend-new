import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  verifySellerOTP,
  resendSellerOTP,
} from "../../redux/slices/sellerAuthSlice";

export default function SellerOtpVerification({ email }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.sellerAuth);

  const [otp, setOtp] = useState("");

  const [resendSeconds, setResendSeconds] = useState(60);

  const [message, setMessage] = useState("");

  // ==========================================
  // RESEND TIMER
  // ==========================================

  useEffect(() => {
    if (resendSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  // ==========================================
  // OTP CHANGE
  // ==========================================

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
  };

  // ==========================================
  // VERIFY
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      return;
    }

    const result = await dispatch(
      verifySellerOTP({
        email,
        otp,
      }),
    );

    if (verifySellerOTP.fulfilled.match(result)) {
      // Token is already saved by Redux.

      navigate("/seller/dashboard", {
        replace: true,
      });
    }
  };

  // ==========================================
  // RESEND
  // ==========================================

  const handleResend = async () => {
    if (resendSeconds > 0) {
      return;
    }

    const result = await dispatch(
      resendSellerOTP({
        email,
      }),
    );

    if (resendSellerOTP.fulfilled.match(result)) {
      setMessage(result.payload.message);

      setResendSeconds(60);
      setOtp("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl">✉️</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

        <p className="mt-2 text-sm text-gray-500">We sent a 6-digit OTP to</p>

        <p className="font-medium text-gray-900">{email}</p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Verification code
          </label>

          <input
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-4
              text-center
              text-3xl
              font-bold
              tracking-[0.5em]
              outline-none
              focus:border-green-600
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="
            w-full
            rounded-xl
            bg-green-600
            px-4
            py-3
            font-semibold
            text-white
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isLoading ? "Verifying..." : "Verify email"}
        </button>
      </form>

      <div className="text-center">
        {resendSeconds > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in{" "}
            <span className="font-semibold text-gray-900">
              {resendSeconds}s
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
