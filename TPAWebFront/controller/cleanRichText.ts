export default function cleanRichText(text: string) {
    const aReplaced = text.replaceAll("<a ", "<Link ").replaceAll("</a>", "</Link>");
    const hrefReplaced = aReplaced.replaceAll("href=", "to=");

    return hrefReplaced;
}
