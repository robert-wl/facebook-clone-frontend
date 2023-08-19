import styles from "../assets/styles/imageCarousel.module.scss";
import { useRef, useState } from "react";
import { BiSolidLeftArrowCircle, BiSolidRightArrowCircle } from "react-icons/bi";
import { FileUpload } from "../../controller/firebase/storage.ts";
import { Maybe } from "../../gql/graphql.ts";

interface ImageCarousel {
    files: Maybe<string>[];
}

export default function ImageCarousel({ files: fileOutside }: ImageCarousel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [files, _] = useState<FileUpload[]>(() => {
        return fileOutside!.map((file) => {
            return JSON.parse(file!) as FileUpload;
        });
    });
    const [i, setI] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLeft = () => {
        if (i > 0) setI(i - 1);
        if (i == 0) setI(files.length - 1);
    };

    const handleRight = () => {
        setI((i + 1) % files.length);
    };

    const handleError = (e: any, type: "image" | "video") => {
        e.preventDefault();
        if (type == "image") {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
        } else if (type == "video") {
            console.log("sini");
            const video = e.target as HTMLVideoElement;
            video.style.display = "none";
        }
    };

    const handleLoad = (e: any, type: "image" | "video") => {
        e.preventDefault();
        if (type == "image") {
            const img = e.target as HTMLImageElement;
            img.style.display = "block";
        } else if (type == "video" && videoRef.current!.style.display == "none") {
            console.log("hai");
            const video = e.target as HTMLVideoElement;
            video.style.display = "block";
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    {files[i].type.includes("video") && (
                        <video
                            ref={videoRef}
                            onLoad={(e) => handleLoad(e, "video")}
                            key={i}
                            onError={(e) => handleError(e, "video")}
                            autoPlay={true}
                            controls={true}
                        >
                            <source src={files ? files[i].url : ""} />
                        </video>
                    )}
                    {files && files.length > 1 && (
                        <div
                            onClick={() => handleLeft()}
                            className={styles.leftButton}
                        >
                            <BiSolidLeftArrowCircle
                                size={35}
                                color={"black"}
                            />
                        </div>
                    )}
                    {files && files.length > 1 && (
                        <div
                            onClick={() => handleRight()}
                            className={styles.rightButton}
                        >
                            <BiSolidRightArrowCircle
                                size={35}
                                color={"black"}
                            />
                        </div>
                    )}
                    {files[i].type.includes("image") && (
                        <img
                            src={files ? files[i].url : ""}
                            alt={""}
                            onLoad={(e) => handleLoad(e, "image")}
                            onError={(e) => handleError(e, "image")}
                        />
                    )}
                </div>
                {files &&
                    files.length > 1 &&
                    files.map((src: string | FileUpload, index: number) => {
                        if (index != 0)
                            return (
                                <div
                                    key={index}
                                    className={styles.image}
                                >
                                    <img
                                        src={typeof src === "string" ? src : src.url}
                                        alt={""}
                                    />
                                </div>
                            );
                    })}
            </div>
            <div className={styles.dotBox}>
                {files &&
                    files.length > 1 &&
                    files.map((_: string | FileUpload, index: number) => {
                        return (
                            <div
                                key={index}
                                onClick={() => setI(index)}
                                className={index == i ? styles.dotActive : styles.dot}
                            />
                        );
                    })}
            </div>
        </>
    );
}
