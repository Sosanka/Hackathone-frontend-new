import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  registerBuyer,
  setBuyerOtpEmail,
} from "../../../redux/slices/buyerAuthSlice";

export default function BuyerRegisterForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.buyerAuth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    return "Something went wrong.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLocalError("");

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match.");

      return;
    }

    const result = await dispatch(
      registerBuyer({
        name: form.name.trim(),

        email: form.email.trim(),

        phone: form.phone.trim(),

        password: form.password,
      }),
    );

    if (registerBuyer.fulfilled.match(result)) {
      dispatch(setBuyerOtpEmail(result.payload.email));

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
    text-gray-900
    outline-none
    transition
    placeholder:text-gray-400
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
          Full name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          minLength={2}
          maxLength={150}
          required
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

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
          Phone
        </label>

        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          minLength={10}
          maxLength={20}
          required
          placeholder="Phone number"
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
          minLength={8}
          maxLength={128}
          required
          placeholder="Create a password"
          className={inputClass}
        />

        <p className="mt-2 text-xs text-gray-500">
          Minimum 8 characters with uppercase, lowercase and a number.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm password
        </label>

        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
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
          transition
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? "Creating account..." : "Create buyer account"}
      </button>
    </form>
  );
}
