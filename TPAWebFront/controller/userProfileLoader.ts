import def from "../src/assets/default-profile.jpg";
import { defaultGroupBackground } from "./groupBackgroundLoader";

export const defaultUserProfile = def;

export default function userProfileLoader(image: string | undefined | null) {
    if (!image) return defaultGroupBackground;
    if (image == "") return defaultGroupBackground;
    return image;
}
