import { ApolloError } from "@apollo/client";
import Toastify from "toastify-js";
import { debounce } from "./debouncer.ts";
import { toast } from "react-toastify";

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
    } else if (error.message.includes("Token is expired") || error.message.includes("invalid number of segments")) {
        window.location.href = "/login";
        toast.error("Token is expired");
        // Toastify({
        //     text: "Error: " + "invalid session",
        //     style: {
        //         background: "red",
        //     },
        // }).showToast();
        localStorage.removeItem("token");
    }
    toast.error(error.message);
    // Toastify({
    //     text: "Error: " + error.message,
    //     style: {
    //         background: "red",
    //     },
    // }).showToast();
}
