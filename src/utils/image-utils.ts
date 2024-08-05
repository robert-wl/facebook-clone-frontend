import { GroupFile } from "@/gql/graphql.ts";
import { Nullable, Optional } from "@/types/utils";
import { SyntheticEvent } from "react";

export const defaultGroupCover = "/group/default-group-cover.png";

export function getImageURLFromFile(file: Optional<Nullable<GroupFile | string>>, defaultURL?: string) {
  if (!file) {
    return defaultURL;
  }
  if (typeof file === "string") {
    file = JSON.parse(file) as GroupFile;
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
