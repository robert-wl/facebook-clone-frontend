import {ApolloError} from "@apollo/client";
import Toastify from "toastify-js";


export default function errorHandler(error: ApolloError){
    if(error.message.includes("duplicate key value violates unique")) {
        return Toastify({
            text: "Error: Email already exists",
            style: {
                background: "red",
            },
        }).showToast();
    }
    else if(error.message.includes("Token is expired")) {
        return Toastify({
            text: "Error: " + "invalid session",
            style: {
                background: "red",
            },
        }).showToast();
    }
    Toastify({
        text: "Error: " + error.message,
        style: {
            background: "red",
        },
    }).showToast();

}
