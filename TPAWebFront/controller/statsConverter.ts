export default function statsConverter(num: number | undefined) {
    if (num == undefined) return 0;
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toString() + " K";
    } else {
        return (num / 1000000).toString() + " M";
    }
}
