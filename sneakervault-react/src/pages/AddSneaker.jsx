import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/AddSneaker.module.css";

export default function AddSneaker() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    condition: "",
    img_name: ""
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://sneakervault-api.onrender.com/api/sneakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.message || "Validation error");
        return;
      }

      setStatus("success");

      // reset form
      setForm({
        name: "",
        price: "",
        condition: "",
        img_name: ""
      });

      // redirect to market
      setTimeout(() => {
        navigate("/market");
      }, 800);

    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error — check server.");
    }
  };

  return (
    <>
      <main className={styles.addPage}>
        <h1>Add New Sneaker</h1>

        <form onSubmit={handleSubmit} className={styles.formBox}>
          <label>
            Name
            <input 
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price
            <input 
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Condition
            <input 
              name="condition"
              type="text"
              value={form.condition}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image File Name
            <input 
              name="img_name"
              type="text"
              placeholder="images/jordan1.png"
              value={form.img_name}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">
            {status === "sending"
              ? "Submitting..."
              : status === "success"
              ? "Added Successfully ✔"
              : "Add Sneaker"}
          </button>

          {status === "error" && (
            <p className={styles.errorBox}>{errorMsg}</p>
          )}
        </form>

        <Footer />
      </main>
    </>
  );
}