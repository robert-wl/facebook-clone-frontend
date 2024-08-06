import uploadStorage, { FileUpload } from "@/lib/firebase/storage.ts";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Temp() {
  const [directories, setDirectories] = useState<string[]>([]);
  const handleProfileFile = async (url: string, number: number) => {
    const t = toast.loading("Uploading Background");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "image/jpeg",
      },
      mode: "no-cors",
    });

    const blob = await response.blob();
    const file = new File([blob], `profile-${number}.jpg`, { type: blob.type });

    const profileURL = await uploadStorage("profile", file);

    const data = JSON.parse(profileURL) as FileUpload;
    toast.dismiss(t);
    toast.success("Background updated");
    setDirectories((prev) => {
      prev.push(data.directory);
      return prev;
    });
  };

  const extractImageData = async (imageUrl: string) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous"; // Handle CORS issues
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);

        // Get data URL
        const dataURL = canvas.toDataURL("image/png");
        // Get Blob
        canvas.toBlob((blob) => {
          resolve({ dataURL, blob });
        }, "image/png");
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadAll = async () => {
    const t = toast.loading("Uploading All");
    const resolution = ["720", "480"];
    for (let i = 0; i < 70; i++) {
      console.log(i);
      let blob = null;
      try {
        const data = (await extractImageData(`https://i.pravatar.cc/300?img=${i}`)) as any;
        blob = data!.blob;
      } catch (e) {
        continue;
      }
      const file = new File([blob], `profile-${i}.jpg`, { type: blob.type });

      const profileURL = await uploadStorage("profile", file);

      const data = JSON.parse(profileURL) as FileUpload;
      setDirectories((prev) => {
        prev.push(JSON.stringify(data));
        return prev;
      });
    }
    toast.dismiss(t);
    toast.success("All uploaded");
  };

  return (
    <>
      <button onClick={uploadAll}>Upload All</button>
      {directories.map((url) => {
        return <p>{url},</p>;
      })}
      {/*{Array.from({ length: 70 }).map((_, i) => {*/}
      {/*  return (*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        display: "flex",*/}
      {/*      }}>*/}
      {/*      <img src={`https://i.pravatar.cc/300?img=${i}`} />*/}
      {/*      <button onClick={() => handleProfileFile(`https://i.pravatar.cc/300?img=${i}`, i)}>Add To Firebase</button>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </>
  );
}
