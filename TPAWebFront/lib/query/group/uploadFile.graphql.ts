import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
    mutation uploadFile($id: ID!, $file: NewGroupFile!) {
        uploadFile(groupId: $id, file: $file) {
            url
        }
    }
`;
