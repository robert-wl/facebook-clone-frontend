import styles from "@/assets/styles/group/groupFileBox.module.scss";
import { AiOutlineFile, AiOutlineSearch } from "react-icons/ai";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import uploadStorage, { deleteStorage, FileUpload } from "@/lib/firebase/storage.ts";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_FILE } from "@/lib/query/group/uploadFile.graphql.ts";
import { Link, useParams } from "react-router-dom";
import { debouncedError } from "@/controller/errorHandler.ts";
import { GET_GROUP_FILES } from "@/lib/query/group/getGroupFiles.graphql.ts";
import { Group, GroupFile } from "@/gql/graphql.ts";
import { HiOutlineDownload } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiTrashBold } from "react-icons/pi";
import { DELETE_FILE } from "@/lib/query/group/deleteFile.graphql.ts";
import { toast } from "react-toastify";
import promiseToast from "@/controller/toast/promiseToast.ts";
import useAuth from "@/hooks/use-auth.ts";

interface GroupFileBox {
  group: Group | undefined;
}

export default function GroupFileBox({ group }: GroupFileBox) {
  const [inputKey, setInputKey] = useState(0);
  const { groupId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [deleteFile] = useMutation(DELETE_FILE);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [data, setData] = useState<GroupFile[] | null>(null);
  const [filteredData, setFilteredData] = useState<GroupFile[]>([]);
  const { data: rawData } = useQuery(GET_GROUP_FILES, {
    variables: {
      id: groupId,
    },
    fetchPolicy: "cache-and-network",
  });
  const { auth } = useAuth();

  useEffect(() => {
    if (rawData) {
      setData(rawData.getGroupFiles);
      setFilteredData(rawData.getGroupFiles);
    }
  }, [rawData]);
  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setInputKey(inputKey + 1);
    const file = e.target.files[0];

    const url = await uploadStorage("groups", file);

    const dataRes = await uploadFile({
      variables: {
        id: groupId,
        file: {
          name: file.name,
          type: file.type,
          url: url,
        },
      },
    }).catch(debouncedError);

    if (dataRes) {
      setSearch("");
      setData((prev) => {
        return [...prev!, dataRes.data.uploadFile];
      });
      setFilteredData((prev) => {
        return [...prev!, dataRes.data.uploadFile];
      });
    }

    setInputKey(inputKey + 1);
    toast.success("File uploaded successfully");
  };

  const handleDelete = async (file: GroupFile) => {
    if (data && filteredData) {
      const filtered = data?.filter((f) => {
        return f.id.toString() != file.id.toString();
      });
      if (filtered) setData(filtered);

      const filteredF = filteredData?.filter((f) => {
        return f.id.toString() != file.id.toString();
      });

      setFilteredData(filteredF);
    }

    const filez = JSON.parse(file.url) as FileUpload;

    await deleteStorage(filez.directory);
    await deleteFile({
      variables: {
        id: file.id,
      },
    }).catch(debouncedError);

    toast.success("File deleted successfully");
  };

  const handleSort = () => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  };

  const handleSearch = (filter: string) => {
    setSearch(filter);
    if (data) {
      const filtered = data.filter((file) => {
        return file.name.toLowerCase().includes(filter.toLowerCase());
      });

      setFilteredData(filtered);
    }
  };

  return (
    <div className={styles.content}>
      <header>
        <h3>Files</h3>
        <div className={styles.right}>
          <div className={styles.search}>
            <AiOutlineSearch size={"1rem"} />
            <input
              placeholder={"Search files"}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <h5 onClick={() => handleInput()}>Upload File</h5>
          <input
            key={inputKey}
            ref={inputRef}
            type={"file"}
            hidden={true}
            onChange={(e) => promiseToast(() => handleUpload(e))}
          />
        </div>
      </header>
      <hr />
      <table>
        <thead>
          <tr>
            <th className={styles.name}>File Name</th>
            <th className={styles.type}>Type</th>
            <th
              className={styles.date}
              onClick={() => handleSort()}>
              Uploaded Date
              {sort === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </th>
            <th className={styles.misc}></th>
          </tr>
        </thead>
        <tbody style={{ flexDirection: sort === "asc" ? "column-reverse" : "column" }}>
          {filteredData?.map((file: GroupFile) => {
            if (file)
              return (
                <tr key={file.id}>
                  <th className={styles.name}>
                    <AiOutlineFile size={"1.5rem"} />
                    <>{file.name}</>
                  </th>
                  <th className={styles.type}>{file.type}</th>
                  <th className={styles.date}>
                    <p>
                      {new Date(file.uploadedAt).toLocaleDateString()} at {new Date(file.uploadedAt).toLocaleTimeString()}
                    </p>
                    <span>
                      by {file.uploadedBy.firstName} {file.uploadedBy.lastName}
                    </span>
                  </th>
                  <th className={styles.misc}>
                    <Link
                      to={file.url}
                      download={file.name}
                      target={"_blank"}>
                      <div className={styles.button}>
                        <HiOutlineDownload size={"1.5rem"} />
                      </div>
                    </Link>
                    {(group?.isAdmin || file.uploadedBy.username == auth?.username) && (
                      <div
                        className={styles.button}
                        onClick={() => promiseToast(() => handleDelete(file))}>
                        <PiTrashBold size={"1.5rem"} />
                      </div>
                    )}
                  </th>
                </tr>
              );
          })}
          {filteredData?.length == 0 && (
            <>
              <tr className={styles.noFile}>
                <th>No files</th>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
