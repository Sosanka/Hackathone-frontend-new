import api from "../axios";

const productService = {

  // ==========================================
  // GET PUBLIC PRODUCTS
  // ==========================================

  getProducts: async ({
    skip = 0,
    limit = 100,
    category = null,
  } = {}) => {

    const params = {
      skip,
      limit,
    };

    if (category) {
      params.category = category;
    }

    const response = await api.get(
      "/products",
      { params }
    );

    return response.data;
  },

  // ==========================================
  // GET SINGLE PRODUCT
  // ==========================================

  getProductById: async (
    productId
  ) => {

    const response = await api.get(
      `/products/${productId}`
    );

    return response.data;
  },

};

export default productService;