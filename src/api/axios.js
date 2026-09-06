import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
  },
});

// ==========================================
// REQUEST
// ==========================================

api.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const method = config.method?.toLowerCase();

    // 1. PUBLIC ENDPOINTS (No authentication required)
    if (method === "get" && url.includes("/products")) {
      if (config.headers) {
        delete config.headers.Authorization;
        delete config.headers.authorization;
        if (typeof config.headers.delete === "function") {
          config.headers.delete("Authorization");
          config.headers.delete("authorization");
        }
      }
      return config;
    }

    let token = null;

    // 2. BUYER ENDPOINTS
    if (url.includes("/buyer")) {
      token = sessionStorage.getItem("buyer_token");
    }
    // 3. SELLER ENDPOINTS (Mutations on /products or /seller routes)
    else if (url.includes("/seller") || url.includes("/products")) {
      token = sessionStorage.getItem("seller_token");
    }
    // 4. DEFAULT FALLBACK
    else {
      token = sessionStorage.getItem("seller_token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// RESPONSE
// ==========================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";

      if (url.includes("/buyer")) {
        sessionStorage.removeItem("buyer_token");
        sessionStorage.removeItem("buyer_expires_at");
      }

      if (url.includes("/seller") || url.includes("/products")) {
        sessionStorage.removeItem("seller_token");
        sessionStorage.removeItem("seller_expires_at");
      }
    }

    return Promise.reject(error);
  }
);

export default api;