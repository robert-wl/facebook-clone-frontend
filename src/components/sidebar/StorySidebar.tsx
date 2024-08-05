import styles from "@/assets/styles/sidebar/sidebarStory.module.scss";
import { Dispatch, SetStateAction } from "react";
import ColorButton from "@/components/stories/ColorButton.tsx";
import { Content } from "@/pages/story/CreateStory.tsx";
import useAuth from "@/hooks/use-auth.ts";
import SafeImage from "@/components/SafeImage.tsx";

interface Sidebar {
  title: string;
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  loading: boolean;
}

export default function StorySidebar({ title, content, setContent, tab, setTab, handleSubmit, loading }: Sidebar) {
  const { auth } = useAuth();

  const changeContent = (text: string) => {
    const replaced = text.replace(/\n/g, "<br>");
    setContent({ ...content, text: replaced });
  };

  return (
    <>
      <div className={styles.barSpace} />
      <div className={styles.bar}>
        <header>
          <div className={styles.bio}>
            <h2>{title}</h2>
          </div>
        </header>
        <div className={styles.profile}>
          <SafeImage
            src={auth?.profile}
            type={"user-profile"}
            alt={"profile picture"}
          />
          <h3>{auth?.username}</h3>
        </div>
        <hr />
        {tab == "text" ? (
          <div className={styles.content}>
            <textarea
              placeholder={"Start typing..."}
              onChange={(e) => changeContent(e.target.value)}
            />
            <select
              value={content.font}
              className={content.font == "normal" ? "" : styles.roman}
              onChange={(e) => setContent({ ...content, font: e.target.value })}>
              <option value={"normal"}>Normal</option>
              <option value={"roman"}>Roman</option>
            </select>
            <div className={styles.background}>
              <header>Background</header>
              <div className={styles.content}>
                <ColorButton
                  color={"lightblue"}
                  content={content}
                  setContent={setContent}
                />
                <ColorButton
                  color={"pink"}
                  content={content}
                  setContent={setContent}
                />
                <ColorButton
                  color={"lightgray"}
                  content={content}
                  setContent={setContent}
                />
                <ColorButton
                  color={"orange"}
                  content={content}
                  setContent={setContent}
                />
              </div>
            </div>
            <footer>
              <div className={styles.buttons}>
                <button onClick={() => setTab("create")}>Cancel</button>
                <button onClick={() => handleSubmit()}>Post</button>
              </div>
              <hr />
            </footer>
          </div>
        ) : (
          <div className={styles.contentImage}>
            <footer>
              <hr />
              <div className={styles.buttons}>
                <button onClick={() => setTab("create")}>Cancel</button>
                <button
                  disabled={loading}
                  onClick={() => {
                    setTab("image");
                    handleSubmit();
                  }}>
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}
