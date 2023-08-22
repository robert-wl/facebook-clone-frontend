import { toast } from "react-toastify";

export default async function promiseToast(func: Promise<any> | (() => Promise<any>)) {
    await toast.promise(func, {
        pending: "Loading...",
    });
}
