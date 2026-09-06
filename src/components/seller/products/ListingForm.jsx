import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import sellerProductService from "../../../api/services/sellerProductService";

const EMPTY_FORM = {
  product_name: "",
  description: "",
  category: "",
  quantity: "",
  unit: "kg",
  price_per_unit: "",
  location_name: "",
  address: "",
  latitude: "",
  longitude: "",
  harvest_date: "",
  best_before_date: "",
};

export default function ListingForm({ product = null, onSuccess, onCancel }) {
  const { isAuthenticated } = useSelector((state) => state.sellerAuth);

  const [form, setForm] = useState(EMPTY_FORM);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);

  const isEdit = !!product;

  // ==========================================
  // LOAD PRODUCT INTO FORM
  // ==========================================

  useEffect(() => {
    if (!product) {
      setForm(EMPTY_FORM);
      setImage(null);
      setPreview(null);

      return;
    }

    setForm({
      product_name: product.product_name || "",

      description: product.description || "",

      category: product.category || "",

      quantity: product.quantity ?? "",

      unit: product.unit || "kg",

      price_per_unit: product.price_per_unit ?? "",

      location_name: product.location_name || "",

      address: product.address || "",

      latitude: product.latitude ?? "",

      longitude: product.longitude ?? "",

      harvest_date: product.harvest_date || "",

      best_before_date: product.best_before_date || "",
    });

    setImage(null);

    setPreview(product.image_url || null);
  }, [product]);

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // IMAGE
  // ==========================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");

      event.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");

      event.target.value = "";

      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));

    setError("");
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setError("Your seller session has expired. Please login again.");

      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEdit) {
        // ====================================
        // UPDATE
        // ====================================

        const payload = {
          product_name: form.product_name.trim(),

          description: form.description.trim() || null,

          category: form.category.trim() || null,

          quantity: form.quantity === "" ? undefined : form.quantity,

          unit: form.unit,

          price_per_unit: form.price_per_unit,

          location_name: form.location_name.trim() || null,

          address: form.address.trim() || null,

          latitude: form.latitude === "" ? null : form.latitude,

          longitude: form.longitude === "" ? null : form.longitude,

          harvest_date: form.harvest_date || null,

          best_before_date: form.best_before_date || null,
        };

        // Remove undefined values
        Object.keys(payload).forEach((key) => {
          if (payload[key] === undefined) {
            delete payload[key];
          }
        });

        const updated = await sellerProductService.updateProduct(
          product.id,
          payload,
        );

        setSuccess("Product updated successfully.");

        if (onSuccess) {
          onSuccess(updated);
        }
      } else {
        // ====================================
        // CREATE
        // ====================================

        const formData = new FormData();

        formData.append("product_name", form.product_name.trim());

        formData.append("quantity", form.quantity);

        formData.append("unit", form.unit);

        formData.append("price_per_unit", form.price_per_unit);

        if (form.description.trim()) {
          formData.append("description", form.description.trim());
        }

        if (form.category.trim()) {
          formData.append("category", form.category.trim());
        }

        if (form.location_name.trim()) {
          formData.append("location_name", form.location_name.trim());
        }

        if (form.address.trim()) {
          formData.append("address", form.address.trim());
        }

        if (form.latitude !== "") {
          formData.append("latitude", form.latitude);
        }

        if (form.longitude !== "") {
          formData.append("longitude", form.longitude);
        }

        if (form.harvest_date) {
          formData.append("harvest_date", form.harvest_date);
        }

        if (form.best_before_date) {
          formData.append("best_before_date", form.best_before_date);
        }

        if (image) {
          formData.append("image", image);
        }

        const created = await sellerProductService.createProduct(formData);

        setSuccess("Product created successfully.");

        setForm(EMPTY_FORM);
        setImage(null);
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (onSuccess) {
          onSuccess(created);
        }
      }
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (detail?.message) {
        setError(detail.message);
      } else if (Array.isArray(detail)) {
        setError(detail.map((item) => item.msg).join(", "));
      } else {
        setError("Unable to save product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INPUT CLASS
  // ==========================================

  const inputClass = `
    w-full
    rounded-xl
    border
    border-gray-300
    bg-white
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* =====================================
          ERROR
      ====================================== */}

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

      {/* =====================================
          BASIC INFORMATION
      ====================================== */}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Product information
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Enter the details of your product.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product name *
          </label>

          <input
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={255}
            placeholder="e.g. Fresh Tomato"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Vegetables"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Unit *
          </label>

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="kg">Kilogram (kg)</option>

            <option value="ltr">Litre (ltr)</option>

            <option value="nos">Number (nos)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={5000}
            rows={4}
            placeholder="Describe your product..."
            className={inputClass}
          />
        </div>
      </div>

      {/* =====================================
          QUANTITY / PRICE
      ====================================== */}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Stock & pricing</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Quantity *
          </label>

          <input
            name="quantity"
            type="number"
            min="0.001"
            step="0.001"
            value={form.quantity}
            onChange={handleChange}
            required
            placeholder="0.000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Price per unit *
          </label>

          <input
            name="price_per_unit"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price_per_unit}
            onChange={handleChange}
            required
            placeholder="0.00"
            className={inputClass}
          />
        </div>
      </div>

      {/* =====================================
          LOCATION
      ====================================== */}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location name
          </label>

          <input
            name="location_name"
            value={form.location_name}
            onChange={handleChange}
            placeholder="e.g. Guwahati Market"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full address"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Latitude
          </label>

          <input
            name="latitude"
            type="number"
            step="any"
            min="-90"
            max="90"
            value={form.latitude}
            onChange={handleChange}
            placeholder="26.1445"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Longitude
          </label>

          <input
            name="longitude"
            type="number"
            step="any"
            min="-180"
            max="180"
            value={form.longitude}
            onChange={handleChange}
            placeholder="91.7362"
            className={inputClass}
          />
        </div>
      </div>

      {/* =====================================
          DATES
      ====================================== */}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Product dates</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Harvest date
          </label>

          <input
            name="harvest_date"
            type="date"
            value={form.harvest_date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Best before date
          </label>

          <input
            name="best_before_date"
            type="date"
            value={form.best_before_date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* =====================================
          IMAGE
      ====================================== */}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Product image</h3>

        <p className="mt-1 text-sm text-gray-500">
          JPG, PNG or WEBP. Maximum 5 MB.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 p-5">
        {preview && (
          <div className="mb-5">
            <img
              src={preview}
              alt="Product preview"
              className="h-52 w-full rounded-xl object-cover"
            />
          </div>
        )}

        {!isEdit && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="
              block
              w-full
              text-sm
              text-gray-500
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-green-50
              file:px-4
              file:py-2
              file:font-medium
              file:text-green-700
            "
          />
        )}

        {isEdit && (
          <p className="text-sm text-gray-500">
            Product image cannot be changed through the current backend update
            endpoint.
          </p>
        )}
      </div>

      {/* =====================================
          BUTTONS
      ====================================== */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-xl
              border
              border-gray-300
              px-5
              py-3
              font-medium
              text-gray-700
              hover:bg-gray-50
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-green-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Saving..." : isEdit ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}
