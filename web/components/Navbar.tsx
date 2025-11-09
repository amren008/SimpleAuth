import { useLocation } from "react-router-dom";
import { navbarStyles as styles } from "../styles/navbar.styles";

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo/Brand */}
          <div className={styles.logoContainer}>
            <h2 className={styles.logoText}>Custom Auth</h2>
          </div>

          {/* Navigation Links */}
          <div className={styles.desktopNav}>
            <a href="/home" className={styles.navLink}>
              Overview
            </a>
            <a href="/about" className={styles.navLink}>
              Tech Stack
            </a>
          </div>

          {/* Auth Buttons - Hide on Dashboard */}
          {!isDashboard && (
            <div className={styles.authButtons}>
              <a href="/login" className={styles.loginButton}>
                Login
              </a>
              <a href="/signup" className={styles.signupButton}>
                Sign Up
              </a>
            </div>
          )}

          {/* Mobile menu button */}
          <div className={styles.mobileMenuButton}>
            <button type="button" className={styles.hamburgerButton}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - you can add state management to toggle this */}
      <div className={styles.mobileMenu}>
        <div className={styles.mobileMenuContent}>
          <a href="/home" className={styles.mobileLink}>
            Overview
          </a>
          <a href="/about" className={styles.mobileLink}>
            Tech Stack
          </a>
          {!isDashboard && (
            <>
              <a href="/login" className={styles.mobileLink}>
                Login
              </a>
              <a href="/signup" className={styles.mobileLink}>
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
