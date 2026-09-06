import api from "../axios";

const buyerAuthService = {
  // ==========================================
  // REGISTER
  // ==========================================

  register: async (data) => {
    const response = await api.post(
      "/buyer/auth/register",
      data
    );

    return response.data;
  },

  // ==========================================
  // VERIFY OTP
  // ==========================================

  verifyOtp: async (data) => {
    const response = await api.post(
      "/buyer/auth/verify-otp",
      data
    );

    return response.data;
  },

  // ==========================================
  // RESEND OTP
  // ==========================================

  resendOtp: async (data) => {
    const response = await api.post(
      "/buyer/auth/resend-otp",
      data
    );

    return response.data;
  },

  // ==========================================
  // LOGIN
  // ==========================================

  login: async (data) => {
    const response = await api.post(
      "/buyer/auth/login",
      data
    );

    return response.data;
  },

  // ==========================================
  // CURRENT BUYER
  // ==========================================

  me: async () => {
    const response = await api.get(
      "/buyer/auth/me"
    );

    return response.data;
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logout: async () => {
    const response = await api.post(
      "/buyer/auth/logout"
    );

    return response.data;
  },
};

export default buyerAuthService;