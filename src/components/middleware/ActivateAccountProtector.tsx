import styles from "@/assets/styles/page.module.scss";
import {useQuery} from "@apollo/client";
import {Navigate, useParams} from "react-router-dom";
import {CHECK_ACTIVATE_LINK} from "@/lib/query/user/checkActivateLink.graphql.ts";

export default function ActivateAccountProtector({children}: { children: JSX.Element }) {
  const {activationID} = useParams();
  const {data, loading} = useQuery(CHECK_ACTIVATE_LINK, {
    variables: {
      id: activationID,
    },
  });

  if (loading) {
    return <div className={styles.page}/>;
  }

  return (
    <>
      {data && data.checkActivateLink ? (
        children
      ) : (
        <Navigate
          to={"/login"}
          replace={true}
        />
      )}
    </>
  );
}
