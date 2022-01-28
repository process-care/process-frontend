// import { gql } from "graphql-request";

// export const UPLOAD_FILE_SINGLE = gql`
//   mutation uploadFileSingle($refId: ID, $ref: String, $field: String, $file: Upload!) {
//     upload(
//       refId: $refId,
//       ref: $ref,
//       field: $field,
//       file: $file
//     ) {
//       id
//       name
//     }
//   }
// `;

// export const UPLOAD_FILE_MULTIPLE = gql`
//   mutation uploadFileMultiple($refId: ID, $ref: String, $field: String, $files: [Upload]!) {
//     multipleUpload(
//       refId: $refId,
//       ref: $ref,
//       field: $field,
//       files: $files
//     ) {
//       id
//       name
//     }
//   }
// `;

// export const DELETE_FILE = gql`
//   mutation deleteFile($id: ID!) {
//     deleteFile(input: { where: { id: $id } }) {
//       file {
//         name
//       }
//     }
//   }
// `;