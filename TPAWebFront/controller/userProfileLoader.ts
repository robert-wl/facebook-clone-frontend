import def from "../src/assets/default-profile.jpg";
import { FileUpload } from "./firebase/storage.ts";

export const defaultUserProfile = def;

export default function userProfileLoader(image: string | undefined | null) {
    if (!image) return defaultUserProfile;
    if (image == "") return defaultUserProfile;
    try {
        const imgObj = JSON.parse(image) as FileUpload;
        return imgObj.url;
    } catch (e) {
        return image;
    }
    return defaultUserProfile;
}
