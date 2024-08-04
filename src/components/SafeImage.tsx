import { catchImageError, getImageURL } from "@/utils/image-utils.ts";
import { Nullable, Optional } from "@/types/utils";

interface IProps {
  src: Optional<Nullable<string>>;
  defaultSrc: string;
  alt?: string;
}

export default function SafeImage({ src, defaultSrc, alt = "" }: IProps) {
  return (
    <img
      src={getImageURL(src, defaultSrc)}
      onError={catchImageError(defaultSrc)}
      alt={alt}
    />
  );
}
