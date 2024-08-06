import styles from "@/assets/styles/richText/richText.module.scss";
import { ContentBlock } from "react-draft-wysiwyg";
import findWithRegex from "@/utils/regex-utils.ts";
import { Link } from "react-router-dom";

function hashtagStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void) {
  findWithRegex(/#[\w\u0590-\u05ff]+/g, contentBlock, callback);
}

function hashtagComponent(props: any) {
  console.log(props);
  return (
    <Link to={"/search/" + props.decoratedText}>
      <span className={styles.hashtag}>{props.children}</span>
    </Link>
  );
}

export const hashtagDecorator = {
  strategy: hashtagStrategy,
  component: hashtagComponent,
};
