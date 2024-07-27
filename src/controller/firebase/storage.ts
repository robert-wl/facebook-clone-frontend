import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { app } from "./firebase.ts";

export interface FileUpload {
  url: string;
  directory: string;
  type: string;
}

const storage = getStorage(app);
export default async function uploadStorage(directory: string, file: File) {
  const random = Math.random().toString(36).substring(2);
  const name = `${Date.now()}-${random}-${file.name}`;

  const storageRef = ref(storage, directory + "/" + name);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const File: FileUpload = {
    url: url,
    directory: storageRef.fullPath,
    type: file.type,
  };

  return JSON.stringify(File);
}

export async function deleteStorage(reference: string) {
  const storageRef = ref(storage, reference);

  try {
    await deleteObject(storageRef);
  } catch (e) {
    console.log("not found");
  }
}
