import { gql } from "@apollo/client";

export const DELETE_FILE = gql`
    mutation deleteFile($id: ID!) {
        deleteFile(fileId: $id)
    }
`;
