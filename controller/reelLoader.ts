import { Reel } from "../gql/graphql";
import { FileUpload } from "./firebase/storage";

export default function reelLoader(reel: Reel) {
    const video = reel.video;
    try {
        const imgObj = JSON.parse(video) as FileUpload;
        return imgObj.url;
    } catch (e) {
        return video;
    }
}
