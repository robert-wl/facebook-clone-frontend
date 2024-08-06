// import def from "../src/assets/default-profile.jpg";
import { FileUpload } from "@/lib/firebase/storage.ts";

export const defaultUserBackground = "https://picsum.photos/200/300";

export default function userBackgroundLoader(image: string | undefined | null) {
  if (!image) return defaultUserBackground;
  if (image == "") return defaultUserBackground;
  try {
    const imgObj = JSON.parse(image) as FileUpload;
    return imgObj.url;
  } catch (e) {
    return image;
  }
}
