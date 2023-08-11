import styles from "../../src/assets/styles/story/colorButton.module.scss";
import { Dispatch, SetStateAction } from "react";
import { Content } from "../../src/pages/CreateStory.tsx";

interface ColorButton {
	color: string;
	content: Content;
	setContent: Dispatch<SetStateAction<Content>>;
}

export default function ColorButton({
	color,
	content,
	setContent,
}: ColorButton) {
	return (
		<div
			style={{ backgroundColor: color }}
			className={
				color == content.color ? styles.activeCircle : styles.circle
			}
			onClick={() => setContent({ ...content, color: color })}
		/>
	);
}
