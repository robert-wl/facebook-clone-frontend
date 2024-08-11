import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { CHECK_ACTIVATE_LINK } from "@/lib/query/user/checkActivateLink.graphql.ts";
import Loading from "@/components/Loading.tsx";

export default function ActivateAccountProtector({ children }: { children: JSX.Element }) {
  const { activationID } = useParams();
  const { data, loading } = useQuery(CHECK_ACTIVATE_LINK, {
    variables: {
      id: activationID,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data && data.checkActivateLink ? (
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
