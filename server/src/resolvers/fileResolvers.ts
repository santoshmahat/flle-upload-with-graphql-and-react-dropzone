import { AWSS3Uploader } from "../services/s3";

const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KRY,
  destinationBucketName: process.env.AWS_BUCKET_NAME,
});

console.log("process.env.AWS_BUCKET_NAME", process.env.AWS_BUCKET_NAME);

const fileResolvers = {
  Mutation: {
    singleFileUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
  },
};

export default fileResolvers;
