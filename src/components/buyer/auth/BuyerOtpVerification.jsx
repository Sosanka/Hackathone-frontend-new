import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  resendBuyerOtp,
  verifyBuyerOtp,
} from "../../../redux/slices/buyerAuthSlice";

export default function BuyerOtpVerification() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { otpEmail, isLoading, error } = useSelector(
    (state) => state.buyerAuth,
  );

  const [otp, setOtp] = useState("");

  const [seconds, setSeconds] = useState(60);

  const [localError, setLocalError] = useState("");

  // ==========================================
  // RESEND TIMER
  // ==========================================

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // ==========================================
  // VERIFY
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLocalError("");

    if (!otpEmail) {
      setLocalError("Email is missing. Please register again.");

      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setLocalError("Please enter a valid 6-digit OTP.");

      return;
    }

    const result = await dispatch(
      verifyBuyerOtp({
        email: otpEmail,
        otp,
      }),
    );

    if (verifyBuyerOtp.fulfilled.match(result)) {
      navigate("/buyer/dashboard", {
        replace: true,
      });
    }
  };

  // ==========================================
  // RESEND
  // ==========================================

  const handleResend = async () => {
    if (seconds > 0) {
      return;
    }

    setLocalError("");

    const result = await dispatch(
      resendBuyerOtp({
        email: otpEmail,
      }),
    );

    if (resendBuyerOtp.fulfilled.match(result)) {
      setSeconds(60);

      setOtp("");
    }
  };

  const getErrorMessage = (value) => {
    if (typeof value === "string") {
      return value;
    }

    if (value?.message) {
      return value.message;
    }

    return "Something went wrong.";
  };

  const displayedError = localError || getErrorMessage(error);

  if (!otpEmail) {
    return (
      <div className="rounded-xl bg-yellow-50 p-5 text-sm text-yellow-800">
        <p>No verification email is available.</p>

        <button
          onClick={() => navigate("/buyer/register")}
          className="mt-3 font-semibold underline"
        >
          Return to registration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {displayedError && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {displayedError}
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-500">
          We sent a 6-digit verification code to
        </p>

        <p className="mt-1 font-semibold text-gray-900">{otpEmail}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Verification code
        </label>

        <input
          value={otp}
          onChange={(event) =>
            setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
          }
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
            text-2xl
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
          px-5
          py-3
          font-semibold
          text-white
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? "Verifying..." : "Verify email"}
      </button>

      <div className="text-center">
        {seconds > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in{" "}
            <span className="font-semibold text-gray-900">{seconds}s</span>
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
    </form>
  );
}
