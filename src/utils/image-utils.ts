import { Nullable, Optional } from "@/types/utils";
import { SyntheticEvent } from "react";
import { BackendFile } from "@/types/files";
import groupBackground from "@/public/group/default-group-cover.png";
import groupCover from "@/public/group/default-group-cover.png";
import userProfile from "@/public/user/default-profile.jpg";

export const defaultGroupCover = groupCover as string;
export const defaultGroupBackground = groupBackground as string;
export const defaultUserBackground = "https://picsum.photos/200/300";
export const defaultUserProfile = userProfile as string;
export function getImageURLFromFile(file: Optional<Nullable<BackendFile | string>>, defaultURL?: string) {
  if (!file) {
    return defaultURL;
  }
  if (typeof file === "string") {
    file = JSON.parse(file) as BackendFile;
  }

  return file.url;
}

export function getImageURL(url: Nullable<Optional<string>>, defaultURL?: string) {
  if (!url) {
    return defaultURL;
  }

  return url;
}

export function catchImageError(defaultURL?: string) {
  return (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;
    if (typeof defaultURL === "string") {
      image.src = defaultURL;
    }
  };
}
