import React, { useEffect, useState } from "react";
import styles from "styles/ProgressBar.module.css";

interface ProgressBarProps {
  headings: { text: string }[];
  activeHeading: string | null;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ headings = [] }) => {
  const [viewportPosition, setViewportPosition] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [headingPositions, setHeadingPositions] = useState<
    { text: string; position: number }[]
  >([]);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);
  const headingRefs = headings.map((heading) => ({
    id: heading.text,
    ...heading,
    ref: React.createRef<HTMLHeadingElement>(),
  }));

  const offset = typeof window !== "undefined" ? window.innerHeight / 4 : 0;

  useEffect(() => {
    const getHeadingOffsets = () => {
      const headings = Array.from(document.querySelectorAll("h2"));
      const headingOffsets = headings.map((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        return {
          text: heading.textContent || "",
          position: heading.offsetTop,
        };
      });
      setHeadingPositions(headingOffsets);
    };

    const updateMetrics = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const viewportPosition = scrollPosition + viewportHeight - offset;

      setDocumentHeight(documentHeight);
      setViewportPosition(viewportPosition);
    };

    getHeadingOffsets();
    updateMetrics();
    const intervalId = setInterval(() => {
      getHeadingOffsets();
      updateMetrics();
    }, 2000);

    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", updateMetrics);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", updateMetrics);
    };
  }, [headings, offset]);

  useEffect(() => {
    for (let i = 0; i < headingPositions.length; i++) {
      if (viewportPosition >= headingPositions[i].position) {
        setActiveHeadingIndex(i);
      }
    }
  }, [viewportPosition, headingPositions]);

  const scrollToHeading = (ref: React.RefObject<HTMLHeadingElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <nav className={styles.progressNav}>
        <div className={styles.tableOfContents}>
          <h5>Table of Contents</h5>
        </div>
        <ul className={styles.progressList}>
          {headingRefs?.map((heading, index) => {
            const headingPosition =
              headingPositions.find((h) => h.text === heading.text)?.position ||
              0;
            const progress = headingPosition;
            const isActive = index === activeHeadingIndex;
            return (
              <li
                key={heading.text}
                className={isActive ? styles.active : ""}
                style={{ backgroundSize: `${progress}% 100%` }}
                onClick={() => scrollToHeading(heading.ref)}>
                <a
                  href={`#heading-${index}`}
                  className={isActive ? styles.active : ""}>
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
        <hr className={styles.divider} />
        <div className={styles.contactSection}>
          <p>Contact:</p>
          <p>kallemickelborg@gmail.com</p>
        </div>
      </nav>
    </div>
  );
};

export default ProgressBar;
