import NavBar from "../components/NavBar";
import styles from "../styles/Timeline.module.css";

export default function Timeline() {
  return (
    <>
      {/* Navbar added globally */}

      <main className={styles.page}>
        <section className={`${styles.hero} reveal`}>
          <h1>Release Timeline</h1>
          <p>Key drops and highlights. Scroll for more.</p>

          <div className={styles.yearTabs}>
            <span className={styles.active}>2025</span>
            <span>2024</span>
            <span>2023</span>
          </div>
        </section>

        <section className={styles.timelineGrid}>
          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/jordan3.png`}
              alt="Jordan 3 White Cement"
            />
            <div className={styles.cardInfo}>
              <h3>Jordan 3 'White Cement' — $210</h3>
              <a href="#" className={styles.viewBtn}>
                View
              </a>
              <p>Aug 22, 2025</p>
            </div>
          </div>

          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/nikedunk.png`}
              alt="Nike Dunk Low"
            />
            <div className={styles.cardInfo}>
              <h3>Nike Dunk Low 'Off-White Pine Green' — $600</h3>
              <a href="#" className={styles.viewBtn}>
                View
              </a>
              <p>Jul 10, 2025</p>
            </div>
          </div>

          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/Jordan4.png`}
              alt="Jordan 4 Retro"
            />
            <div className={styles.cardInfo}>
              <h3>Jordan 4 Retro 'Bred' — $220</h3>
              <a href="#" className={styles.viewBtn}>
                View
              </a>
              <p>Jun 12, 2025</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}