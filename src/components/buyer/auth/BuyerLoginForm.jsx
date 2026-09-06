import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import {
  loginBuyer,
  setBuyerOtpEmail,
} from "../../../redux/slices/buyerAuthSlice";

export default function BuyerLoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { isLoading, error } = useSelector((state) => state.buyerAuth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setLocalError("");
  };

  const getErrorMessage = (value) => {
    if (typeof value === "string") {
      return value;
    }

    if (value?.message) {
      return value.message;
    }

    if (Array.isArray(value)) {
      return value.map((item) => item.msg).join(", ");
    }

    return "Unable to login.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLocalError("");

    const result = await dispatch(
      loginBuyer({
        email: form.email.trim(),

        password: form.password,
      }),
    );

    if (loginBuyer.fulfilled.match(result)) {
      const from = location.state?.from?.pathname || "/buyer/dashboard";

      navigate(from, {
        replace: true,
      });

      return;
    }

    // ========================================
    // EMAIL NOT VERIFIED
    // ========================================

    const detail = result.payload;

    if (detail?.code === "EMAIL_NOT_VERIFIED") {
      dispatch(setBuyerOtpEmail(form.email.trim()));

      navigate("/buyer/verify-otp");
    }
  };

  const displayedError = localError || getErrorMessage(error);

  const inputClass = `
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    outline-none
    focus:border-green-600
    focus:ring-2
    focus:ring-green-100
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {displayedError && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {displayedError}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Your password"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
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
        {isLoading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
