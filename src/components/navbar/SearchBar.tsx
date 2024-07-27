import {BsFacebook} from "react-icons/bs";
import styles from "@/assets/styles/navbar/navbar.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import {FormEvent, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function SearchBar() {
  const {searchQuery} = useParams();
  const [search, setSearch] = useState(searchQuery ? (decodeURIComponent(searchQuery)[0] == "&" ? "" : searchQuery) : "");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate("/search/" + encodeURIComponent(search));
  };
  return (
    <>
      <Link to={"/"}>
        <BsFacebook size={"2.5rem"}/>
      </Link>
      <form
        className={styles.search}
        onSubmit={handleSearch}>
        <AiOutlineSearch size={"1.2rem"}/>
        <input
          value={search}
          placeholder={"Search in Facebook"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </>
  );
}
