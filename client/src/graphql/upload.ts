import { gql } from "@apollo/client";

export const UPLOAD_SINGLE_FILE = gql`
  mutation UploadSingleFile($file: Upload!) {
    singleFileUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
