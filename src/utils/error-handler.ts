import { ApolloError, FetchResult } from "@apollo/client";
import Toastify from "toastify-js";
import { debounce } from "./debouncer.ts";
import { toast } from "react-toastify";

// @ts-ignore
export const debouncedError = debounce(errorHandler, 1000);

export default function errorHandler(error: ApolloError) {
  if (error.message.includes("duplicate key value violates unique")) {
    Toastify({
      text: "Error: Email already exists",
      style: {
        background: "red",
      },
    }).showToast();
    return { data: null } as FetchResult;
  } else if (error.message.includes("Token is expired") || error.message.includes("invalid number of segments")) {
    window.location.href = `${import.meta.env.VITE_ROOT_URL}/login`;
    toast.error("Token is expired");

    localStorage.removeItem("token");
  }
  toast.error(error.message);
  console.log(error);

  return { data: null } as FetchResult;
}
