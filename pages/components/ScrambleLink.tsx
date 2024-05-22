import React from "react";
import { useScramble } from "use-scramble";
import styles from "styles/Home.module.css";

const ScrambleLink = ({ text, url }) => {
  const { ref, replay } = useScramble({
    text,
    speed: 1,
    step: 5,
    tick: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <a
      href={url}
      ref={ref}
      onMouseOver={replay}
      onFocus={replay}
      className={styles.linkScramble}
      target="_blank"
      rel="noreferrer noopener"
    >
      {text}
    </a>
  );
};

export default ScrambleLink;
