import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import sellerAuthService from "../../api/services/sellerAuthService";

// ==========================================
// INITIAL SESSION
// ==========================================

const storedToken =
  sessionStorage.getItem("seller_token");

const storedSession =
  sessionStorage.getItem("seller_session");

const initialState = {
  token: storedToken || null,

  seller: storedSession
    ? JSON.parse(storedSession)
    : null,

  isAuthenticated: !!storedToken,

  isLoading: false,

  error: null,

  otpEmail: null,
};

// ==========================================
// REGISTER
// ==========================================

export const registerSeller = createAsyncThunk(
  "sellerAuth/register",
  async (data, thunkAPI) => {
    try {
      const response =
        await sellerAuthService.register(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );
    }
  }
);

// ==========================================
// VERIFY OTP
// ==========================================

export const verifySellerOTP = createAsyncThunk(
  "sellerAuth/verifyOTP",
  async (data, thunkAPI) => {
    try {
      const response =
        await sellerAuthService.verifyOTP(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );
    }
  }
);

// ==========================================
// RESEND OTP
// ==========================================

export const resendSellerOTP = createAsyncThunk(
  "sellerAuth/resendOTP",
  async (data, thunkAPI) => {
    try {
      const response =
        await sellerAuthService.resendOTP(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );
    }
  }
);

// ==========================================
// LOGIN
// ==========================================

export const loginSeller = createAsyncThunk(
  "sellerAuth/login",
  async (data, thunkAPI) => {
    try {
      const response =
        await sellerAuthService.login(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );
    }
  }
);

// ==========================================
// GET ME
// ==========================================

export const fetchCurrentSeller =
  createAsyncThunk(
    "sellerAuth/me",
    async (_, thunkAPI) => {
      try {
        const response =
          await sellerAuthService.getMe();

        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error)
        );
      }
    }
  );

// ==========================================
// LOGOUT
// ==========================================

export const logoutSeller = createAsyncThunk(
  "sellerAuth/logout",
  async (_, thunkAPI) => {
    try {
      await sellerAuthService.logout();

      return true;
    } catch (error) {
      // Even if backend logout fails,
      // remove the local session.
      return true;
    }
  }
);

// ==========================================
// ERROR HELPER
// ==========================================

function getErrorMessage(error) {
  const detail =
    error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (detail?.message) {
    return detail.message;
  }

  return (
    error.response?.data?.message ||
    "Something went wrong. Please try again."
  );
}

// ==========================================
// SLICE
// ==========================================

const sellerAuthSlice = createSlice({
  name: "sellerAuth",

  initialState,

  reducers: {

    clearAuthError: (state) => {
      state.error = null;
    },

    setOtpEmail: (state, action) => {
      state.otpEmail = action.payload;
    },

    clearOtpEmail: (state) => {
      state.otpEmail = null;
    },

    restoreSession: (state) => {
      const token =
        sessionStorage.getItem("seller_token");

      const session =
        sessionStorage.getItem("seller_session");

      state.token = token || null;

      state.seller = session
        ? JSON.parse(session)
        : null;

      state.isAuthenticated = !!token;
    },
  },

  extraReducers: (builder) => {

    // ========================================
    // REGISTER
    // ========================================

    builder
      .addCase(
        registerSeller.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        registerSeller.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.error = null;

          state.otpEmail =
            action.payload.email;
        }
      )

      .addCase(
        registerSeller.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload;
        }
      );

    // ========================================
    // VERIFY OTP
    // ========================================

    builder
      .addCase(
        verifySellerOTP.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        verifySellerOTP.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.error = null;

          const {
            access_token,
            expires_at,
          } = action.payload;

          state.token =
            access_token;

          state.isAuthenticated =
            true;

          sessionStorage.setItem(
            "seller_token",
            access_token
          );

          sessionStorage.setItem(
            "seller_expires_at",
            expires_at
          );
        }
      )

      .addCase(
        verifySellerOTP.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload;
        }
      );

    // ========================================
    // RESEND OTP
    // ========================================

    builder
      .addCase(
        resendSellerOTP.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        resendSellerOTP.fulfilled,
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )

      .addCase(
        resendSellerOTP.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload;
        }
      );

    // ========================================
    // LOGIN
    // ========================================

    builder
      .addCase(
        loginSeller.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        loginSeller.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.error = null;

          const {
            access_token,
            expires_at,
          } = action.payload;

          state.token =
            access_token;

          state.isAuthenticated =
            true;

          sessionStorage.setItem(
            "seller_token",
            access_token
          );

          sessionStorage.setItem(
            "seller_expires_at",
            expires_at
          );
        }
      )

      .addCase(
        loginSeller.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload;
        }
      );

    // ========================================
    // ME
    // ========================================

    builder
      .addCase(
        fetchCurrentSeller.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        fetchCurrentSeller.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.seller =
            action.payload;

          state.isAuthenticated =
            true;

          sessionStorage.setItem(
            "seller_session",
            JSON.stringify(
              action.payload
            )
          );
        }
      )

      .addCase(
        fetchCurrentSeller.rejected,
        (state) => {
          state.isLoading = false;

          state.token = null;
          state.seller = null;
          state.isAuthenticated = false;

          sessionStorage.removeItem(
            "seller_token"
          );

          sessionStorage.removeItem(
            "seller_session"
          );

          sessionStorage.removeItem(
            "seller_expires_at"
          );
        }
      );

    // ========================================
    // LOGOUT
    // ========================================

    builder.addCase(
      logoutSeller.fulfilled,
      (state) => {

        state.token = null;

        state.seller = null;

        state.isAuthenticated =
          false;

        state.isLoading = false;

        state.error = null;

        sessionStorage.removeItem(
          "seller_token"
        );

        sessionStorage.removeItem(
          "seller_session"
        );

        sessionStorage.removeItem(
          "seller_expires_at"
        );
      }
    );
  },
});

export const {
  clearAuthError,
  setOtpEmail,
  clearOtpEmail,
  restoreSession,
} = sellerAuthSlice.actions;

export default sellerAuthSlice.reducer;