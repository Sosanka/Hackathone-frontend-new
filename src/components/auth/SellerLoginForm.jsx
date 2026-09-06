import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import AuthInput from "./AuthInput";

import {
  loginSeller,
  fetchCurrentSeller,
} from "../../redux/slices/sellerAuthSlice";

export default function SellerLoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.sellerAuth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(loginSeller(form));

    if (loginSeller.fulfilled.match(result)) {
      await dispatch(fetchCurrentSeller());

      navigate("/seller/dashboard", {
        replace: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="seller@example.com"
      />

      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

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
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have a seller account?{" "}
        <Link
          to="/seller/register"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
