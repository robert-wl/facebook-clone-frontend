import Toastify from "toastify-js";

export default function createToast(message: string, color: string) {
    Toastify({
        text: message,
        style: {
            background: color,
        },
    }).showToast();
}
