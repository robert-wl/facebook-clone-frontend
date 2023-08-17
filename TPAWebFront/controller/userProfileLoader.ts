import def from "../src/assets/default-profile.jpg";

export const defaultUserProfile = def;

export default function userProfileLoader(image: string | undefined | null) {
    if (!image) return defaultUserProfile;
    if (image == "") return defaultUserProfile;
    return image;
}
