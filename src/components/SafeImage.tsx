import { catchImageError, getImageURL, getImageURLFromFile } from "@/utils/image-utils.ts";
import { Nullable, Optional } from "@/types/utils";

interface IProps {
  type?: "string" | "file";
  src: Optional<Nullable<string>>;
  defaultSrc: string;
  alt?: string;
}

export default function SafeImage({ type = "string", src, defaultSrc, alt = "" }: IProps) {
  const processedSrc = type === "string" ? getImageURL(src, defaultSrc) : getImageURLFromFile(src, defaultSrc);
  return (
    <img
      src={processedSrc}
      onError={catchImageError(defaultSrc)}
      alt={alt}
    />
  );
}
