import def from "../assets/default-profile.jpg";
import { FileUpload } from "@/lib/firebase/storage.ts";

export const defaultUserProfile = def as string;

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
