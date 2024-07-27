import { Reel } from "../../gql/graphql.ts";
import { FileUpload } from "./firebase/storage.ts";

export default function reelLoader(reel: Reel) {
  const video = reel.video;
  try {
    const imgObj = JSON.parse(video) as FileUpload;
    return imgObj.url;
  } catch (e) {
    return video;
  }
}
