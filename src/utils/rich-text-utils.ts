import { sanitize } from "isomorphic-dompurify";
import { Nullable, Optional } from "@/types/utils";

export function cleanRichText(text: string) {
  let cleaned = text;
  while (cleaned.includes('href="#')) {
    const hashtag = cleaned.substring(cleaned.indexOf('href="#') + 6, cleaned.indexOf('"', cleaned.indexOf('href="#') + 6));
    const link = "/search/" + encodeURIComponent(hashtag);
    cleaned = cleaned.replace(hashtag, link);
  }

  return cleaned;
}

export function domPurify(html: Optional<Nullable<string>>) {
  if (!html) return "";

  return sanitize(html);
}
