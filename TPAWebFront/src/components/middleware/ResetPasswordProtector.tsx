import styles from "../../assets/styles/page.module.scss";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { CHECK_RESET_LINK } from "../../../lib/query/user/checkResetLink.graphql.ts";

export default function ResetPasswordProtector({ children }: { children: JSX.Element }) {
    const { forgotID } = useParams();
    const { data, loading } = useQuery(CHECK_RESET_LINK, {
        variables: {
            id: forgotID,
        },
    });

    if (loading) {
        return <div className={styles.page} />;
    }

    return (
        <>
            {data && data.checkResetLink ? (
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
