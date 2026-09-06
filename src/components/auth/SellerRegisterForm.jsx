import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthInput from "./AuthInput";

import { registerSeller } from "../../redux/slices/sellerAuthSlice";

export default function SellerRegisterForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.sellerAuth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");

    const result = await dispatch(registerSeller(form));

    if (registerSeller.fulfilled.match(result)) {
      setSuccess(result.payload.message);

      navigate(
        `/seller/verify-otp?email=${encodeURIComponent(result.payload.email)}`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <AuthInput
        label="Seller name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="seller@example.com"
      />

      <AuthInput
        label="Phone number"
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
      />

      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Create a password"
      />

      <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
        <p className="font-medium text-gray-800">Password requirements</p>

        <ul className="mt-2 space-y-1">
          <li>• At least 8 characters</li>
          <li>• One uppercase letter</li>
          <li>• One lowercase letter</li>
          <li>• One number</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full
          rounded-xl
          bg-green-600
          px-4
          py-3
          font-semibold
          text-white
          transition
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? "Creating account..." : "Create seller account"}
      </button>
    </form>
  );
}
