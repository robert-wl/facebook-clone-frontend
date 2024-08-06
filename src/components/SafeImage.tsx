import { catchImageError, defaultGroupCover, getImageURL, getImageURLFromFile } from "@/utils/image-utils.ts";
import { Nullable, Optional } from "@/types/utils";
import { defaultUserProfile } from "@/controller/userProfileLoader.ts";
import { defaultUserBackground } from "@/controller/userBackgroundLoader.ts";
import { defaultGroupBackground } from "@/controller/groupBackgroundLoader.ts";
import { forwardRef } from "react";
import { FileUpload } from "@/lib/firebase/storage.ts";

interface IProps {
  srcType?: "string" | "file";
  src: Optional<Nullable<string | FileUpload>>;
  alt?: string;
  type: "post" | "group-background" | "group-cover" | "user-profile" | "user-background" | "others";
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SafeImage = forwardRef<HTMLImageElement, IProps>(
  ({ src, onClick, onMouseLeave, onMouseEnter, className, srcType = "string", alt = "", type = "user-profile" }: IProps, ref) => {
    const getDefaultSrc = (): string => {
      switch (type) {
        case "group-background":
          return defaultGroupBackground;
        case "group-cover":
          return defaultGroupCover;
        case "user-background":
          return defaultUserBackground;
        case "user-profile":
          return defaultUserProfile;
        case "others":
          return "";
        default:
          return defaultUserProfile;
      }
    };

    const defaultSrc = getDefaultSrc();

    const processedSrc = srcType === "string" && typeof src === "string" ? getImageURL(src, defaultSrc) : getImageURLFromFile(src, defaultSrc);

    return (
      <img
        className={className}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        src={processedSrc}
        onError={catchImageError(defaultSrc)}
        alt={alt}
      />
    );
  },
);

export default SafeImage;
