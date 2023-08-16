import styles from "../assets/styles/imageList.module.scss";
import { Dispatch, SetStateAction } from "react";

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
                            className={styles.image}
                        >
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
                                onClick={() => handleFile(i)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="black"
                                    className="bi bi-x-lg"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
}
