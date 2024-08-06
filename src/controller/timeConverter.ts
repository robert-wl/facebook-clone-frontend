export default function getTimeDiff(time: string) {
  const date = new Date(time);
  const now = new Date();

  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) {
    return Math.round(diff) + " seconds ago";
  } else if (diff < 3600) {
    return Math.round(diff / 60) + " minutes ago";
  } else if (diff < 60 * 60 * 24) {
    return Math.round(diff / 3600) + " hours ago";
  } else if (diff < 60 * 60 * 24 * 28) {
    return Math.round(diff / (3600 * 24)) + " days ago";
  } else if (diff < 60 * 60 * 24 * 28 * 12) {
    return Math.round(diff / (3600 * 24 * 28)) + " months ago";
  } else {
    return Math.round(diff / (3600 * 24 * 28 * 12)) + " years ago";
  }
}
