import React, { useEffect, useState } from "react";
import styles from "../styles/Market.module.css";

export default function Market() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  // For edit form
  const [editingSneaker, setEditingSneaker] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    condition: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" }); // success / error

  const API_BASE = "https://sneakervault-api.onrender.com/api/sneakers";

  const loadSneakers = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      console.log("Sneaker data from API:", data);
      setSneakers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading sneaker data:", err);
      setStatus({ type: "error", message: "Error loading sneakers." });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSneakers();
  }, []);

  // Helper: build the correct URL for images in public/images
  const getSneakerImageUrl = (imgPath) => {
    if (!imgPath) return "";

    const trimmed = String(imgPath).trim();
    const base = import.meta.env.BASE_URL || "/";

    // Full URL from API? just use it
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    // API returns values like "/images/jordan14.png"
    if (trimmed.startsWith("/images/")) {
      return `${base}${trimmed.slice(1)}`; // -> "/images/jordan14.png"
    }

    // Or "images/jordan14.png"
    if (trimmed.startsWith("images/")) {
      return `${base}${trimmed}`;
    }

    // Otherwise assume it's just a filename like "jordan14.png"
    const file = trimmed.replace(/^\//, "");
    return `${base}images/${file}`;
  };

  // --- Client-side validation to match Joi rules on server ---
  const validateSneaker = (data) => {
    const errors = {};

    // name: required, 2–100 chars
    if (!data.name.trim()) {
      errors.name = "Name is required.";
    } else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
      errors.name = "Name must be 2–100 characters.";
    }

    // brand: required, 2–50 chars
    if (!data.brand.trim()) {
      errors.brand = "Brand is required.";
    } else if (data.brand.trim().length < 2 || data.brand.trim().length > 50) {
      errors.brand = "Brand must be 2–50 characters.";
    }

    // price: required, number, 1–5000
    const priceNumber = Number(data.price);
    if (!data.price) {
      errors.price = "Price is required.";
    } else if (Number.isNaN(priceNumber)) {
      errors.price = "Price must be a number.";
    } else if (priceNumber < 1 || priceNumber > 5000) {
      errors.price = "Price must be between 1 and 5000.";
    }

    // condition: required, must match allowed values
    const allowedConditions = ["New", "Like New", "Used"];
    if (!data.condition.trim()) {
      errors.condition = "Condition is required.";
    } else if (!allowedConditions.includes(data.condition.trim())) {
      errors.condition = `Condition must be one of: ${allowedConditions.join(
        ", "
      )}.`;
    }

    // image: required, basic check
    if (!data.image.trim()) {
      errors.image = "Image path is required.";
    } else if (
      !data.image.startsWith("/images/") &&
      !data.image.startsWith("images/") &&
      !data.image.startsWith("http")
    ) {
      errors.image = 'Image should start with "/images/" or be a full URL.';
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  // --- Edit flow ---
  const handleEditClick = (shoe) => {
    setEditingSneaker(shoe);
    setFormErrors({});
    setStatus({ type: "", message: "" });

    setFormData({
      name: shoe.name || "",
      brand: shoe.brand || "",
      price: shoe.price || "",
      condition: shoe.condition || "",
      image: shoe.image || "",
    });

    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? value.replace(/[^\d.]/g, "") : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingSneaker) return;

    const { errors, isValid } = validateSneaker(formData);
    setFormErrors(errors);

    if (!isValid) {
      setStatus({
        type: "error",
        message: "Please fix the errors in the form.",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${editingSneaker.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingSneaker,
          name: formData.name.trim(),
          brand: formData.brand.trim(),
          price: Number(formData.price),
          condition: formData.condition.trim(),
          image: formData.image.trim(),
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        console.error("Edit failed:", errorBody);
        setStatus({
          type: "error",
          message: "Server rejected the update. Check your data.",
        });
        return;
      }

      const updatedSneaker = await res.json();

      // Update list in state without refresh
      setSneakers((prev) =>
        prev.map((s) => (s.id === updatedSneaker.id ? updatedSneaker : s))
      );

      setStatus({ type: "success", message: "Sneaker updated successfully!" });
      setEditingSneaker(null);
    } catch (err) {
      console.error("Error editing sneaker:", err);
      setStatus({
        type: "error",
        message: "An error occurred while editing this sneaker.",
      });
    }
  };

  // --- Delete flow ---
  const handleDelete = async (shoe) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${shoe.name}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/${shoe.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        console.error("Delete failed:", errorBody);
        setStatus({
          type: "error",
          message: "Server could not delete this sneaker.",
        });
        return;
      }

      setSneakers((prev) => prev.filter((s) => s.id !== shoe.id));
      setStatus({ type: "success", message: "Sneaker deleted successfully!" });
    } catch (err) {
      console.error("Error deleting sneaker:", err);
      setStatus({
        type: "error",
        message: "An error occurred while deleting this sneaker.",
      });
    }
  };

  return (
    <>
      <main className={styles.page}>
        {/* Featured Section */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Featured Drop</h1>
            <p>
              Curated picks, verified sellers, and fair prices. Build your rotation with
              confidence.
            </p>
            <div className={styles.heroBtns}>
              <a href="#" className={styles.primaryBtn}>Shop Market</a>
              <a href="#" className={styles.secondaryBtn}>Sell</a>
              <a href="#" className={styles.secondaryBtn}>Trade</a>
            </div>
          </div>

          {/* hero image, constrained */}
          <img
            src={`${import.meta.env.BASE_URL}images/jordan4cem.png`}
            alt="Featured Sneaker"
            className={styles.heroImage}
            style={{
              maxWidth: "500px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </section>

        {/* Edit Form (only when editing) */}
        {editingSneaker && (
          <section className={styles.filters}>
            <div style={{ width: "100%" }}>
              <h2>Edit Sneaker</h2>
              <form onSubmit={handleEditSubmit}>
                <div>
                  <label>
                    Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </label>
                  {formErrors.name && (
                    <p style={{ color: "salmon" }}>{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label>
                    Brand
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleFormChange}
                    />
                  </label>
                  {formErrors.brand && (
                    <p style={{ color: "salmon" }}>{formErrors.brand}</p>
                  )}
                </div>

                <div>
                  <label>
                    Price
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                    />
                  </label>
                  {formErrors.price && (
                    <p style={{ color: "salmon" }}>{formErrors.price}</p>
                  )}
                </div>

                <div>
                  <label>
                    Condition
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleFormChange}
                    >
                      <option value="">Select condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Used">Used</option>
                    </select>
                  </label>
                  {formErrors.condition && (
                    <p style={{ color: "salmon" }}>{formErrors.condition}</p>
                  )}
                </div>

                <div>
                  <label>
                    Image Path
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleFormChange}
                    />
                  </label>
                  {formErrors.image && (
                    <p style={{ color: "salmon" }}>{formErrors.image}</p>
                  )}
                </div>

                <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
                  <button type="submit" className={styles.primaryBtn}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => {
                      setEditingSneaker(null);
                      setFormErrors({});
                      setStatus({ type: "", message: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Status message (success / error for edit/delete) */}
        {status.message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: status.type === "success" ? "#4ade80" : "#f87171",
            }}
          >
            {status.message}
          </p>
        )}

        {/* Filters (original section, kept) */}
        <section className={styles.filters}>
          <div className={styles.filterGroup}>
            <select><option>All brands</option></select>
            <select><option>All sizes</option></select>
            <select><option>Any condition</option></select>
          </div>
          <div className={styles.sortGroup}>
            <label htmlFor="sort">Sort:</label>
            <select id="sort">
              <option>Newest</option>
            </select>
          </div>
        </section>

        {/* Product Grid */}
        {loading ? (
          <p className={styles.loading}>Loading sneakers...</p>
        ) : (
          <section className={styles.grid}>
            {sneakers.map((shoe) => {
              const img = getSneakerImageUrl(shoe.image);

              return (
                <article key={shoe.id} className={styles.card}>
                  <div className={styles.thumb}>
                    <img
                      src={img}
                      alt={shoe.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: "0.75rem 0.75rem 0 0",
                      }}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{shoe.name}</h3>
                    <p className={styles.condition}>{shoe.condition}</p>
                    <p className={styles.price}>${shoe.price}</p>

                    {/* Edit + Delete buttons */}
                    <div
                      style={{
                        marginTop: "0.75rem",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={() => handleEditClick(shoe)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={() => handleDelete(shoe)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <footer className={styles.footer}>© 2025 SneakerVault</footer>
      </main>
    </>
  );
}