import { GroupFile } from "@/gql/graphql.ts";
import { Nullable, Optional } from "@/types/utils";
import { SyntheticEvent } from "react";

export const defaultGroupCover = "/group/default-group-cover.png";

export function getImageURL(file: Optional<Nullable<GroupFile | string>>, defaultURL?: string) {
  if (!file) {
    return defaultURL;
  }
  if (typeof file === "string") {
    file = JSON.parse(file) as GroupFile;
  }

  return file.url;
}

export function catchImageError(defaultURL?: string) {
  return (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;
    if (typeof defaultURL === "string") {
      image.src = defaultURL;
    }
  };
}
