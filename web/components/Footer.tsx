import { footerStyles as styles } from "../styles/footer.styles";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.text}>
            Crafted by{" "}
            <a href="/home" className={styles.link}>
              Divvy
            </a>{" "}
            <span className={styles.heart}>♥</span>
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Custom Auth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
