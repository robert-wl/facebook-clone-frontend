import { FileUpload } from "./firebase/storage";

export default function storyImageLoader(image: string | undefined | null) {
    if (!image) return "";
    if (image == "") return "";
    try {
        const imgObj = JSON.parse(image) as FileUpload;
        return imgObj.url;
    } catch (e) {
        return image;
    }
}
