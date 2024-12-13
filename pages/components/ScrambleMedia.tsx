import React, { useState } from "react";
import { useScramble } from "use-scramble";
import styles from "styles/Home.module.css";

interface ScrambleMediaProps {
	text: string;
	url?: string;
}

const ScrambleMedia: React.FC<ScrambleMediaProps> = ({ text, url }) => {
	const [copy, setCopy] = useState(text);

	const { ref } = useScramble({
		text: copy,
		speed: 0.5,
		step: 5,
	});

	if (!url) {
		return <span ref={ref}>{text}</span>;
	}

	const displayUrl = url.replace(/^https?:\/\//, "");

	const handleMouseOver = () => setCopy(displayUrl);
	const handleMouseLeave = () => setCopy(text);
	const handleFocus = () => setCopy(displayUrl);
	const handleBlur = () => setCopy(text);

	return (
		<a
			className={styles.linkScramble}
			href={url}
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			rel="noreferrer noopener"
			ref={ref}>
			{copy}
		</a>
	);
};

export default ScrambleMedia;
