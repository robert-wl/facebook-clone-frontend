import styles from "@/assets/styles/reels/createReels.module.scss";
import Navbar from "@/components/navbar/Navbar.tsx";
import ReelsSidebar from "@/components/reels/ReelsSidebar.tsx";
import { useState } from "react";
import uploadStorage from "@/lib/firebase/storage.ts";
import { useMutation } from "@apollo/client";
import { CREATE_REEL } from "@/lib/query/reels/createReel.graphql.ts";
import { debouncedError } from "@/controller/errorHandler.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateReels() {
  const [video, setVideo] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [createReel] = useMutation(CREATE_REEL);
  const navigation = useNavigate();
  const handleSubmit = async () => {
    if (video && content) {
      const url = await uploadStorage("reels", video);
      await createReel({
        variables: {
          reel: {
            content: content,
            video: url,
          },
        },
      })
        .then(() => {
          toast.success("Reel created successfully");
          navigation("/reels");
        })
        .catch(debouncedError);
    } else {
      toast.error("Error: please fill all the fields");
    }
  };
  return (
    <>
      <div className={styles.page}>
        <Navbar />
        <div className={styles.content}>
          <ReelsSidebar
            setVideo={setVideo}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
          />
          <div className={styles.content}>
            <div className={styles.container}>
              <div className={styles.containerHor}>
                <div className={styles.story}>
                  <div className={styles.storyView}>
                    <div className={styles.background}>
                      {!video && <h3>Insert a video</h3>}
                      {video && (
                        <video
                          autoPlay={true}
                          loop={true}>
                          <source src={URL.createObjectURL(video)} />
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
