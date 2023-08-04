import styles from "../src/assets/styles/imageCarousel.module.scss"
import {useState} from "react";
import {BiSolidLeftArrowCircle, BiSolidRightArrowCircle} from "react-icons/bi";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageCarousel({ files } : { files: any }){
    const [i, setI] = useState(0);


    const handleLeft = () => {
        if(i > 0) setI(i - 1);
        if(i == 0) setI(files.length - 1)
    }

    const handleRight = () => {
        setI((i + 1) % files.length);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    {
                        files && files.length > 1 &&
                        <div
                            onClick={() => handleLeft()}
                            className={styles.leftButton}
                        >
                            <BiSolidLeftArrowCircle
                                size={35}
                                color={"black"}
                            />
                        </div>
                    }
                    {
                        files && files.length > 1 &&
                        <div
                            onClick={() => handleRight()}
                            className={styles.rightButton}
                        >
                            <BiSolidRightArrowCircle
                                size={35}
                                color={"black"}
                            />
                        </div>
                    }
                    <img
                        src={files ? files[i] : ""}
                    />
                </div>
                {
                    files && files.length > 1 && files.map((src: string, index: number) => {
                        if(index != 0) return (
                            <div className={styles.image}>
                                <img
                                    src={src}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.dotBox}>
                {
                    files && files.length > 1 && files.map((_: string, index: number) => {
                        return (
                            <div
                                onClick={() => setI(index)}
                                className={index == i ? styles.dotActive : styles.dot}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}
