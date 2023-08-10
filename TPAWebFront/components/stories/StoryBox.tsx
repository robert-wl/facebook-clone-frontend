import styles from "../../src/assets/styles/story/story.module.scss";
import {useEffect, useRef, useState} from "react";
import {MdArrowBackIosNew, MdArrowForwardIos} from "react-icons/md";
import {Story} from "../../gql/graphql";


interface StoryBox {
    stories: Story[]
}

export default function StoryBox({ stories } : StoryBox){
    const loadingBarRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const [children, setChildren] = useState<HTMLCollection>();

    const handlePage = async (children: HTMLCollection) => {
        let i = 0;
        while(children.length > i){
            const element = children[i].children[0] as HTMLDivElement

            for(let j = 0; j <= 100; j++){
                element.style.width = `${j}%`;
                await new Promise(resolve => setTimeout(resolve, 5000/100));
            }
            i++;
            setPage(i);
        }
    }

    const handlePageChange = (num: number) => {
        setPage(page + num);
    }


    useEffect(() => {
        const children = loadingBarRef.current?.children;
        if(children) {
            setChildren(children);
            handlePage(children);
        }
    }, []);


    return (
      <div className={styles.content}>
          <div className={styles.storyBox}>
              <header
                  ref={loadingBarRef}
              >
                  {
                      stories?.map((_, index) => {
                          return (
                              <div key={index} className={styles.progress}>
                                  <div className={styles.bar} />
                              </div>
                          );
                      })
                  }
              </header>
              {
                page != 0 &&
                  <div
                      className={styles.left}
                      onClick={() => handlePageChange(-1)}
                  >
                      <MdArrowBackIosNew
                          size={"2rem"}
                          color={"black"}
                      />
                  </div>
              }
              {
                page != stories?.length &&
                  <div
                      className={styles.right}
                      onClick={() => handlePageChange(1)}
                  >
                      <MdArrowForwardIos
                          size={"2rem"}
                          color={"black"}
                      />
                  </div>
              }
              {

              }
          </div>
      </div>
    );
}
