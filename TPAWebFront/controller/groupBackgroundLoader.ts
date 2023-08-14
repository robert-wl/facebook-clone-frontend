import def from "../src/assets/default-group-cover.png";

export const defaultGroupBackground = def;
export default function groupBackgroundLoader(image: string | undefined | null) {
    if (!image) return defaultGroupBackground;
    if (image == "") return defaultGroupBackground;
    return image;
}
