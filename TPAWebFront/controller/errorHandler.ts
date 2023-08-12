import { ApolloError } from "@apollo/client";
import Toastify from "toastify-js";
import { debounce } from "./debouncer.ts";

// @ts-ignore
export const debouncedError = debounce(errorHandler, 1000);

export default function errorHandler(error: ApolloError) {
    if (error.message.includes("duplicate key value violates unique")) {
        return Toastify({
            text: "Error: Email already exists",
            style: {
                background: "red",
            },
        }).showToast();
    } else if (error.message.includes("Token is expired")) {
        window.location.href = "/login";
        Toastify({
            text: "Error: " + "invalid session",
            style: {
                background: "red",
            },
        }).showToast();
        localStorage.removeItem("token");
    }

    Toastify({
        text: "Error: " + error.message,
        style: {
            background: "red",
        },
    }).showToast();
}
