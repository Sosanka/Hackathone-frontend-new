import api from "../axios";

const sellerAuthService = {

  // ==========================================
  // REGISTER
  // ==========================================

  register: async (data) => {
    const response = await api.post(
      "/seller/auth/register",
      data
    );

    return response.data;
  },

  // ==========================================
  // VERIFY OTP
  // ==========================================

  verifyOTP: async (data) => {
    const response = await api.post(
      "/seller/auth/verify-otp",
      data
    );

    return response.data;
  },

  // ==========================================
  // RESEND OTP
  // ==========================================

  resendOTP: async (data) => {
    const response = await api.post(
      "/seller/auth/resend-otp",
      data
    );

    return response.data;
  },

  // ==========================================
  // LOGIN
  // ==========================================

  login: async (data) => {
    const response = await api.post(
      "/seller/auth/login",
      data
    );

    return response.data;
  },

  // ==========================================
  // CURRENT SELLER
  // ==========================================

  getMe: async () => {
    const response = await api.get(
      "/seller/auth/me"
    );

    return response.data;
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logout: async () => {
    const response = await api.post(
      "/seller/auth/logout"
    );

    return response.data;
  },
};

export default sellerAuthService;