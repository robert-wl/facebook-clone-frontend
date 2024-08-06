import def from "../../public/group/default-group-cover.png";
import { FileUpload } from "@/lib/firebase/storage.ts";

export const defaultGroupBackground = def as string;
export default function groupBackgroundLoader(image: string | undefined | null) {
  if (!image) return defaultGroupBackground;
  if (image == "") return defaultGroupBackground;
  try {
    const imgObj = JSON.parse(image) as FileUpload;
    return imgObj.url;
  } catch (e) {
    return defaultGroupBackground;
  }
}
