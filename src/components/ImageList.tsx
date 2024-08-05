import styles from "@/assets/styles/imageList.module.scss";
import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ImageList({ files, setFiles }: { files: File[]; setFiles: Dispatch<SetStateAction<File[]>> }) {
  const handleFile = (i: number) => {
    const fileZ = files.filter((_, index) => index !== i);
    setFiles(fileZ);
  };

  if (files?.length == 0) {
    return <></>;
  } else
    return (
      <div className={styles["container" + (files.length > 1 ? "" : "1")]}>
        {files.map((file, i) => {
          return (
            <div
              key={i}
              className={styles.image}>
              {file.type == "video/mp4" ? (
                <video
                  src={URL.createObjectURL(file)}
                  autoPlay={true}
                />
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt={""}
                />
              )}
              <div
                className={styles.close}
                onClick={() => handleFile(i)}>
                <RxCross2 size={"1.5rem"} />
              </div>
            </div>
          );
        })}
      </div>
    );
}
