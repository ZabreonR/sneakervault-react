import React, { useState, useEffect } from "react";
import styles from "../styles/AboutContact.module.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function AboutContact() {
  const [status, setStatus] = useState("idle");
  const [team, setTeam] = useState([]);

  // ✅ Fetch API Data
  useEffect(() => {
    fetch("https://sneakervault-api.onrender.com/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error loading team:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      e.target.reset();
      setTimeout(() => setStatus("idle"), 6000);
    }, 1200);
  };

  return (
    <>
      <main className={styles.contactPage}>
        {/* === HEADER === */}
        <section className={styles.header}>
          <h1>About & Contact</h1>
          <p>Connecting sneakerheads, resellers, and collectors worldwide.</p>
        </section>

        {/* === ABOUT SECTION === */}
        <section className={styles.aboutSection}>
          <h2>About SneakerVault</h2>
          <p>
            SneakerVault is your digital hub for sneaker culture — where rare drops,
            market insights, and collector stories come together. We aim to give
            every sneakerhead the tools and knowledge to expand their collection
            and stay ahead of every release.
          </p>

          {/* ✅ Dynamic Team Section */}
          <h2>Meet the Team</h2>
          {team.length > 0 ? (
            <div className={styles.teamGrid}>
              {team.map((member) => (
                <div key={member.id} className={styles.teamCard}>
                  <h3>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading team info...</p>
          )}
        </section>

        {/* === CONTACT SECTION === */}
        <section className={styles.contactSection}>
          <h2>Contact Us</h2>
          <p>Have a question, suggestion, or collab idea? Reach out below!</p>

          <div className={styles.contactGrid}>
            {/* === FORM === */}
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Type your message..."
                  required
                ></textarea>
              </label>

              <button type="submit" className={styles.submitBtn}>
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message Sent ✅"
                  : "Send Message"}
              </button>
            </form>

            {/* === MAP === */}
            <div className={styles.mapContainer}>
              <iframe
                title="SneakerVault Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508682!2d144.9537353153185!3d-37.81627997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5770bba6c5b2b6!2sSneaker%20Store!5e0!3m2!1sen!2sus!4v1685395823754!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}