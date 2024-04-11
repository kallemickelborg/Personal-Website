import styles from "styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>&copy; {new Date().getFullYear()}</p>
          <p>Kalle Mickelborg</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
