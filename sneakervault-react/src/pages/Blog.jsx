import styles from "../styles/Blog.module.css";

export default function Blog() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} reveal`}>
        <h1>Sneaker Stories & Guides</h1>
        <p>Articles, guides, and tips from the sneaker community.</p>
      </section>

      <section className={styles.blogLayout}>
        {/* Sidebar Categories */}
        <aside className={styles.sidebar}>
          <h2>Categories</h2>
          <ul>
            <li>New Releases</li>
            <li className={styles.active}>Resell Market</li>
            <li>Sneaker Care</li>
            <li>Style Tips</li>
          </ul>
        </aside>

        {/* Blog Grid */}
        <div className={styles.blogGrid}>
          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/jordan1red.png`}
              alt="Jordan 1 sneaker"
            />
            <h3>5 Trends Shaping Sneaker Drops This Season</h3>
            <p>
              From muted tones to bold soles — how brands are blending lifestyle
              and performance.
            </p>
            <a href="#" className={styles.readMore}>
              Read more →
            </a>
          </div>

          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/jordan1.png`}
              alt="Jordan 1 Shattered Backboard"
            />
            <h3>Resell Basics: Photos, Pricing, and Trust</h3>
            <p>
              How to take better photos, set realistic prices, and build a
              verified seller profile.
            </p>
            <a href="#" className={styles.readMore}>
              Read more →
            </a>
          </div>

          <div className={styles.card}>
            <img
              src={`${import.meta.env.BASE_URL}images/Jordan4.png`}
              alt="Jordan 4 sneaker"
            />
            <h3>Sneaker Care: Materials & Methods</h3>
            <p>
              Suede vs. mesh vs. leather — what to use, what to avoid, and how
              often to clean.
            </p>
            <a href="#" className={styles.readMore}>
              Read more →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
