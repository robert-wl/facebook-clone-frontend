import { ContentBlock } from "react-draft-wysiwyg";
import findWithRegex from "@/utils/regex-utils.ts";
import styles from "@/assets/styles/richText/richText.module.scss";

function mentionStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void) {
  findWithRegex(/@[\w\u0590-\u05ff]+/g, contentBlock, callback);
}

function mentionComponent(props: any) {
  return (
    <>
      <span className={styles.mention}>
        {props.children}
        <div>aaa</div>
      </span>
    </>
  );
}

export const mentionDecorator = (props: any) => {
  return {
    strategy: mentionStrategy,
    component: mentionComponent,
    props,
  };
};
