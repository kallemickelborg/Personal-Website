import { useEffect, useState } from "react";
import styles from "styles/ScrollNavigation.module.css"; // Ensure the correct path

interface ScrollNavigationProps {
  headings: { id: string; text: string }[];
}

const ScrollNavigation: React.FC<ScrollNavigationProps> = ({ headings }) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState<number[]>(new Array(headings.length).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2");
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      let current = "";

      const newProgress = Array.from(sections).map((section, index) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const nextSectionTop = sections[index + 1] 
          ? sections[index + 1].getBoundingClientRect().top + window.scrollY
          : document.documentElement.scrollHeight;

        const sectionHeight = nextSectionTop - sectionTop;

        if (scrollPosition >= sectionTop - 10) {
          current = section.getAttribute("id") || "";
        }

        if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
          return ((scrollPosition - sectionTop) / sectionHeight) * 100;
        }

        if (index === sections.length - 1 && (window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          return 100;
        }

        return scrollPosition > sectionTop ? 100 : 0;
      });

      setSectionProgress(newProgress);
      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {headings.map(({ id, text }, index) => (
          <li
            key={id}
            className={`${styles.listItem} ${currentSection === id ? styles.active : ""}`}
            onClick={() => handleClick(id)}
          >
            {text}
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ height: `${sectionProgress[index]}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ScrollNavigation;
