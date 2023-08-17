import { BsFacebook } from "react-icons/bs";
import styles from "../../assets/styles/navbar/navbar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBar() {
    const { searchQuery } = useParams();
    const [search, setSearch] = useState(searchQuery ? searchQuery : "");
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        navigate("/search/" + encodeURIComponent(search));
    };
    return (
        <>
            <BsFacebook size={"2.5rem"} />
            <form
                className={styles.search}
                onSubmit={handleSearch}
            >
                <AiOutlineSearch size={"1.2rem"} />
                <input
                    value={search}
                    placeholder={"Search in Facebook"}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </>
    );
}
