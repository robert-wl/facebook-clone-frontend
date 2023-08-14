import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase.ts";

const storage = getStorage(app);
export default async function uploadStorage(directory: string, file: File) {
    const random = Math.random().toString(36).substring(2);
    const name = `${Date.now()}-${random}-${file.name}`;

    const storageRef = ref(storage, directory + "/" + name);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
