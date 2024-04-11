import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/Menu.module.css";
import profilePicture from "images/profilepicture.jpeg";

const Menu: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuContainer}>
        <div className={styles.menuImage}>
          <Image src={profilePicture} alt="Mick Kalle Mickelborg" />
        </div>
        <Link href="/" passHref>
          <p className={router.pathname === "/" ? styles.selected : ""}>Home</p>
        </Link>
        <Link href="/about" passHref>
          <p className={router.pathname === "/about" ? styles.selected : ""}>
            About
          </p>
        </Link>
        <Link href="/projects" passHref>
          <p className={router.pathname === "/projects" ? styles.selected : ""}>
            Projects
          </p>
        </Link>
        {/*<Link href="/interests" passHref>
          <p className={router.pathname === "/interests" ? styles.selected : ""}>Interests</p>
        </Link>*/}
      </div>
    </div>
  );
};

export default Menu;
