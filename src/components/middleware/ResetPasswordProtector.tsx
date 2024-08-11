import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { CHECK_RESET_LINK } from "@/lib/query/user/checkResetLink.graphql.ts";
import Loading from "@/components/Loading.tsx";

export default function ResetPasswordProtector({ children }: { children: JSX.Element }) {
  const { forgotID } = useParams();
  const { data, loading } = useQuery(CHECK_RESET_LINK, {
    variables: {
      id: forgotID,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data && data.checkResetLink ? (
        children
      ) : (
        <Navigate
          to={`${import.meta.env.VITE_ROOT_URL}/login`}
          replace={true}
        />
      )}
    </>
  );
}
