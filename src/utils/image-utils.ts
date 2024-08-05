import { Nullable, Optional } from "@/types/utils";
import { SyntheticEvent } from "react";
import { BackendFile } from "@/types/files";

export const defaultGroupCover = "/group/default-group-cover.png";

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
