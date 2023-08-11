import {ApolloError} from "@apollo/client";
import Toastify from "toastify-js";


export default function errorHandler(error: ApolloError){
    console.log(error.message)
    if(error.message.includes("duplicate key value violates unique")) {
        return Toastify({
            text: "Error: Email already exists",
            style: {
                background: "red",
            },
        }).showToast();
    }
    else if(error.message.includes("Token is expired")) {
        window.location.href = "/login";
        Toastify({
            text: "Error: " + "invalid session",
            style: {
                background: "red",
            },
        }).showToast();
        localStorage.removeItem("token");
    }
    console.log(error)
    Toastify({
        text: "Error: " + error.message,
        style: {
            background: "red",
        },
    }).showToast();

}
