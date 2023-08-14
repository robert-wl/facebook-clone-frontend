import styles from "../../assets/styles/story/story.module.scss";
import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Story } from "../../../gql/graphql.ts";
import ProgressBar from "./ProgressBar.tsx";

interface StoryBox {
    stories: Story[];
}

export default function StoryBox({ stories }: StoryBox) {
    const [page, setPage] = useState(0);

    const handlePageChange = (num: number) => {
        if (num == -1 && page > 0) {
            setPage(page - 1);
        } else if (num == 1 && page < stories.length - 1) {
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.storyBox}>
                <header>
                    {/*{*/}
                    {/*    stories?.map((_, index) => {*/}
                    {/*        return (*/}
                    {/*            <div key={index} className={styles.progress}>*/}
                    {/*                <div className={styles.bar} />*/}
                    {/*            </div>*/}
                    {/*        );*/}
                    {/*    })*/}
                    {/*}*/}
                    {stories?.map((_, index) => {
                        if (index == page)
                            return (
                                <div
                                    key={index + Date.now()}
                                    className={styles.progress}
                                >
                                    <ProgressBar
                                        handlePageChange={handlePageChange}
                                        active={null}
                                    />
                                </div>
                            );
                        if (index < page)
                            return (
                                <div
                                    key={index + Date.now()}
                                    className={styles.progress}
                                >
                                    <ProgressBar
                                        handlePageChange={handlePageChange}
                                        active={true}
                                    />
                                </div>
                            );
                        if (index > page)
                            return (
                                <div
                                    key={index + Date.now()}
                                    className={styles.progress}
                                >
                                    <ProgressBar
                                        handlePageChange={handlePageChange}
                                        active={false}
                                    />
                                </div>
                            );
                    })}
                </header>
                {page != 0 && (
                    <div
                        className={styles.left}
                        onClick={() => handlePageChange(-1)}
                    >
                        <MdArrowBackIosNew
                            size={"2rem"}
                            color={"black"}
                        />
                    </div>
                )}
                {page != stories?.length - 1 && (
                    <div
                        className={styles.right}
                        onClick={() => handlePageChange(1)}
                    >
                        <MdArrowForwardIos
                            size={"2rem"}
                            color={"black"}
                        />
                    </div>
                )}
                {stories[page]?.image ? (
                    <img
                        src={stories[page]?.image ? stories[page]!.image! : ""}
                        alt={""}
                    />
                ) : (
                    <div
                        style={{
                            backgroundColor: stories[page]?.color ? stories![page]!.color! : "",
                            fontFamily: stories[page]?.font == "roman" ? "Times New Roman" : "Arial, serif",
                        }}
                        className={styles.background}
                    >
                        <p>{stories[page]?.text}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
