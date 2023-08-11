import styles from "../../src/assets/styles/story/story.module.scss";
import { useEffect, useRef } from "react";

interface ProgressBar {
	handlePageChange: (page: number) => void;
	active: boolean | null;
}

export default function ProgressBar({ handlePageChange, active }: ProgressBar) {
	const progressRef = useRef<HTMLDivElement>(null);

	const handleAnimate = async () => {
		if (!progressRef.current) return;
		const width = progressRef.current.style.width;

		if (width == "0" || width == "0%" || width == "") {
			progressRef.current.style.width = `${0.1}%`;
		} else if (width != "100%") {
			progressRef.current.style.width = `${
				parseFloat(width.split("%")[0]) + 0.1
			}%`;
		} else if (width == "100%") {
			handlePageChange(1);
		}

		await new Promise((resolve) => setTimeout(resolve, 10));
		handleAnimate();
	};

	useEffect(() => {
		if (progressRef.current) {
			if (active == true) progressRef.current.style.width = "100%";
			if (active == false) progressRef.current.style.width = "0";
			if (active == null) handleAnimate();
		}
	}, []);

	return (
		<div
			className={styles.bar}
			ref={progressRef}
		/>
	);
}
