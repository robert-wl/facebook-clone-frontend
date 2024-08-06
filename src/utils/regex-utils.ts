import { ContentBlock } from "react-draft-wysiwyg";

type RegexCallback = (start: number, end: number) => void;

export default function findWithRegex(regex: RegExp, contentBlock: ContentBlock, callback: RegexCallback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
