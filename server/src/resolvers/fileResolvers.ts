import { AWSS3Uploader } from "../services/s3";

// AWS_ACCESS_KEY_ID = AKIAYD4MWHWF4E2SHCGA
// AWS_SECRET_ACCESS_KRY = yPor0DmmJLStAroSfrVWEUgEJZFBQ0WcP
// AWS_BUCKET_REGION = ap-southeast-2
// AWS_BUCKET_NAME = stratatown-ticket-attachment
const s3Uploader = new AWSS3Uploader({
  accessKeyId: "AKIAYD4MWHWF4E2SHCGA",
  secretAccessKey: "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",
  destinationBucketName: "stratatown-ticket-attachment",
});

console.log("process.env.AWS_BUCKET_NAME", process.env.AWS_BUCKET_NAME);

const fileResolvers = {
  Mutation: {
    singleFileUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
    //         async (info, { file }, ctx) => {
    //   const { filename, mimetype, encoding, createReadStream } = await file;
    //   console.log("single upload", filename);
    //   return {
    //     filename,
    //     mimetype,
    //     encoding,
    //   };
    // },
  },
};

export default fileResolvers;
