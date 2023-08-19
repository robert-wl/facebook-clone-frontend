import styles from "../../assets/styles/search/search.module.scss";
import Navbar from "../../components/navbar/Navbar.tsx";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import SidebarButton from "../../components/sidebar/SidebarButton.tsx";
import { BsFillPersonFill, BsFillPostcardFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdPeopleAlt } from "react-icons/md";
import { Post } from "../../../gql/graphql.ts";
import ShareModal from "../../components/ShareModal.tsx";
import AllPage from "../../components/search/AllPage.tsx";
import PostPage from "../../components/search/PostPage.tsx";
import { useParams } from "react-router-dom";
import UserPage from "../../components/search/UserPage.tsx";
import GroupPage from "../../components/search/GroupPage.tsx";

export default function Search() {
    const raw = decodeURIComponent(useParams().searchQuery ?? "");
    const searchQuery = raw ? (decodeURIComponent(raw)[0] == "&" ? decodeURIComponent(raw).split("&")[1] : raw) : "";
    const [tab, setTab] = useState("all");
    const [shareModalState, setShareModalState] = useState(false);
    const [currPost, setCurrPost] = useState<Post | null>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    console.log(searchQuery);
    return (
        <>
            {shareModalState && (
                <ShareModal
                    setShareModalState={setShareModalState}
                    currPost={currPost}
                />
            )}
            <div className={styles.page}>
                <Navbar />
                <div
                    id={"page"}
                    ref={pageRef}
                    className={styles.content}
                >
                    <Sidebar title={"Search Results"}>
                        <>
                            <h4>Filter</h4>
                            <div onClick={() => setTab("all")}>
                                <SidebarButton
                                    active={tab == "all"}
                                    text={"All"}
                                >
                                    <HiClipboardDocumentList size={"1.5rem"} />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("posts")}>
                                <SidebarButton
                                    active={tab == "posts"}
                                    text={"Posts"}
                                >
                                    <BsFillPostcardFill size={"1.5rem"} />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("people")}>
                                <SidebarButton
                                    active={tab == "people"}
                                    text={"People"}
                                >
                                    <BsFillPersonFill size={"1.5rem"} />
                                </SidebarButton>
                            </div>
                            <div onClick={() => setTab("groups")}>
                                <SidebarButton
                                    active={tab == "groups"}
                                    text={"Groups"}
                                >
                                    <MdPeopleAlt size={"1.5rem"} />
                                </SidebarButton>
                            </div>
                        </>
                    </Sidebar>
                    <div className={styles.contentBox}>
                        {tab == "all" && (
                            <AllPage
                                key={searchQuery + "all"}
                                setCurrPost={setCurrPost}
                                setShareModalState={setShareModalState}
                                setTab={setTab}
                                pageRef={pageRef}
                                searchQuery={searchQuery}
                            />
                        )}
                        {tab == "posts" && (
                            <PostPage
                                key={searchQuery + "posts"}
                                setCurrPost={setCurrPost}
                                setShareModalState={setShareModalState}
                                pageRef={pageRef}
                                searchQuery={searchQuery}
                            />
                        )}
                        {tab == "people" && (
                            <UserPage
                                key={searchQuery + "user"}
                                pageRef={pageRef}
                            />
                        )}
                        {tab == "groups" && (
                            <GroupPage
                                key={searchQuery + "groups"}
                                pageRef={pageRef}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
