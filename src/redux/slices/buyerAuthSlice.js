import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import buyerAuthService from "../../api/services/buyerAuthService";

// ==========================================
// STORAGE KEYS
// ==========================================

const TOKEN_KEY =
  "buyer_token";

const EXPIRES_KEY =
  "buyer_expires_at";

// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {

  token:
    sessionStorage.getItem(
      TOKEN_KEY
    ),

  expiresAt:
    sessionStorage.getItem(
      EXPIRES_KEY
    ),

  buyer: null,

  isAuthenticated:
    Boolean(
      sessionStorage.getItem(
        TOKEN_KEY
      )
    ),

  isLoading: false,

  error: null,

  otpEmail: null,
};

// ==========================================
// REGISTER
// ==========================================

export const registerBuyer =
  createAsyncThunk(

    "buyerAuth/register",

    async (
      data,
      { rejectWithValue }
    ) => {

      try {

        return await buyerAuthService.register(
          data
        );

      } catch (error) {

        return rejectWithValue(
          error.response?.data
            ?.detail ||
            "Unable to register buyer."
        );
      }
    }
  );

// ==========================================
// VERIFY OTP
// ==========================================

export const verifyBuyerOtp =
  createAsyncThunk(

    "buyerAuth/verifyOtp",

    async (
      data,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await buyerAuthService.verifyOtp(
            data
          );

        sessionStorage.setItem(
          TOKEN_KEY,
          response.access_token
        );

        sessionStorage.setItem(
          EXPIRES_KEY,
          response.expires_at
        );

        return response;

      } catch (error) {

        return rejectWithValue(
          error.response?.data
            ?.detail ||
            "Unable to verify OTP."
        );
      }
    }
  );

// ==========================================
// RESEND OTP
// ==========================================

export const resendBuyerOtp =
  createAsyncThunk(

    "buyerAuth/resendOtp",

    async (
      data,
      { rejectWithValue }
    ) => {

      try {

        return await buyerAuthService.resendOtp(
          data
        );

      } catch (error) {

        return rejectWithValue(
          error.response?.data
            ?.detail ||
            "Unable to resend OTP."
        );
      }
    }
  );

// ==========================================
// LOGIN
// ==========================================

export const loginBuyer =
  createAsyncThunk(

    "buyerAuth/login",

    async (
      data,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await buyerAuthService.login(
            data
          );

        sessionStorage.setItem(
          TOKEN_KEY,
          response.access_token
        );

        sessionStorage.setItem(
          EXPIRES_KEY,
          response.expires_at
        );

        return response;

      } catch (error) {

        return rejectWithValue(
          error.response?.data
            ?.detail ||
            "Unable to login."
        );
      }
    }
  );

// ==========================================
// FETCH CURRENT BUYER
// ==========================================

export const fetchCurrentBuyer =
  createAsyncThunk(

    "buyerAuth/me",

    async (
      _,
      { rejectWithValue }
    ) => {

      try {

        return await buyerAuthService.me();

      } catch (error) {

        sessionStorage.removeItem(
          TOKEN_KEY
        );

        sessionStorage.removeItem(
          EXPIRES_KEY
        );

        return rejectWithValue(
          error.response?.data
            ?.detail ||
            "Buyer session is invalid."
        );
      }
    }
  );

// ==========================================
// LOGOUT
// ==========================================

export const logoutBuyer =
  createAsyncThunk(

    "buyerAuth/logout",

    async () => {

      try {

        await buyerAuthService.logout();

      } catch (error) {

        // Even if the backend request fails,
        // clear local authentication.
      }

      sessionStorage.removeItem(
        TOKEN_KEY
      );

      sessionStorage.removeItem(
        EXPIRES_KEY
      );

      return true;
    }
  );

// ==========================================
// SLICE
// ==========================================

const buyerAuthSlice =
  createSlice({

    name: "buyerAuth",

    initialState,

    reducers: {

      clearBuyerAuthError: (
        state
      ) => {

        state.error = null;
      },

      setBuyerOtpEmail: (
        state,
        action
      ) => {

        state.otpEmail =
          action.payload;
      },

      clearBuyerOtpEmail: (
        state
      ) => {

        state.otpEmail = null;
      },

      restoreBuyerSession: (
        state
      ) => {

        const token =
          sessionStorage.getItem(
            TOKEN_KEY
          );

        const expiresAt =
          sessionStorage.getItem(
            EXPIRES_KEY
          );

        state.token = token;

        state.expiresAt =
          expiresAt;

        state.isAuthenticated =
          Boolean(token);
      },

    },

    extraReducers: (
      builder
    ) => {

      // ======================================
      // REGISTER
      // ======================================

      builder

        .addCase(
          registerBuyer.pending,
          (state) => {

            state.isLoading = true;
            state.error = null;
          }
        )

        .addCase(
          registerBuyer.fulfilled,
          (state, action) => {

            state.isLoading = false;

            state.error = null;

            state.otpEmail =
              action.payload.email;
          }
        )

        .addCase(
          registerBuyer.rejected,
          (state, action) => {

            state.isLoading = false;

            state.error =
              action.payload;
          }
        );

      // ======================================
      // VERIFY OTP
      // ======================================

      builder

        .addCase(
          verifyBuyerOtp.pending,
          (state) => {

            state.isLoading = true;
            state.error = null;
          }
        )

        .addCase(
          verifyBuyerOtp.fulfilled,
          (state, action) => {

            state.isLoading = false;

            state.token =
              action.payload
                .access_token;

            state.expiresAt =
              action.payload
                .expires_at;

            state.isAuthenticated =
              true;

            state.error = null;
          }
        )

        .addCase(
          verifyBuyerOtp.rejected,
          (state, action) => {

            state.isLoading = false;

            state.error =
              action.payload;
          }
        );

      // ======================================
      // RESEND OTP
      // ======================================

      builder

        .addCase(
          resendBuyerOtp.pending,
          (state) => {

            state.isLoading = true;
            state.error = null;
          }
        )

        .addCase(
          resendBuyerOtp.fulfilled,
          (state, action) => {

            state.isLoading = false;

            state.otpEmail =
              action.payload.email;

            state.error = null;
          }
        )

        .addCase(
          resendBuyerOtp.rejected,
          (state, action) => {

            state.isLoading = false;

            state.error =
              action.payload;
          }
        );

      // ======================================
      // LOGIN
      // ======================================

      builder

        .addCase(
          loginBuyer.pending,
          (state) => {

            state.isLoading = true;
            state.error = null;
          }
        )

        .addCase(
          loginBuyer.fulfilled,
          (state, action) => {

            state.isLoading = false;

            state.token =
              action.payload
                .access_token;

            state.expiresAt =
              action.payload
                .expires_at;

            state.isAuthenticated =
              true;

            state.error = null;
          }
        )

        .addCase(
          loginBuyer.rejected,
          (state, action) => {

            state.isLoading = false;

            state.error =
              action.payload;

            state.isAuthenticated =
              false;
          }
        );

      // ======================================
      // ME
      // ======================================

      builder

        .addCase(
          fetchCurrentBuyer.pending,
          (state) => {

            state.isLoading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchCurrentBuyer.fulfilled,
          (state, action) => {

            state.isLoading = false;

            state.buyer =
              action.payload;

            state.isAuthenticated =
              true;

            state.error = null;
          }
        )

        .addCase(
          fetchCurrentBuyer.rejected,
          (state, action) => {

            state.isLoading = false;

            state.buyer = null;

            state.token = null;

            state.expiresAt = null;

            state.isAuthenticated =
              false;

            state.error =
              action.payload;
          }
        );

      // ======================================
      // LOGOUT
      // ======================================

      builder.addCase(
        logoutBuyer.fulfilled,
        (state) => {

          state.buyer = null;

          state.token = null;

          state.expiresAt = null;

          state.isAuthenticated =
            false;

          state.isLoading = false;

          state.error = null;

          state.otpEmail = null;
        }
      );

    },
  });

export const {
  clearBuyerAuthError,
  setBuyerOtpEmail,
  clearBuyerOtpEmail,
  restoreBuyerSession,
} =
  buyerAuthSlice.actions;

export default buyerAuthSlice.reducer;