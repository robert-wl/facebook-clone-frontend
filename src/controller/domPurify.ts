import { sanitize } from "isomorphic-dompurify";
export default function domPurify(html: string | undefined | null) {
  if (!html) return "";

  return sanitize(html);
}
