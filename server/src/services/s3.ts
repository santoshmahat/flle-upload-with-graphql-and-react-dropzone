import * as AWS from "aws-sdk";
import { ReadStream } from "fs";
import * as stream from "stream";

export type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  stream?: ReadStream;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export interface IUploader {
  singleFileUploadResolver: (
    parent,
    { file }: { file: Promise<File> }
  ) => Promise<UploadedFileResponse>;
  multipleUploadsResolver: (
    parent,
    { files }: { files: File[] }
  ) => Promise<UploadedFileResponse[]>;
}

export class AWSS3Uploader implements IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    // AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || "ca-central-1",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ): string {
    console.log("createDestinationFilePath", fileName);
    return fileName;
  }

  private createUploadStream(key: string): S3UploadStream {
    console.log("config", this.config);
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  async singleFileUploadResolver(
    parent,
    { file }: { file: Promise<File> }
  ): Promise<UploadedFileResponse> {
    const { stream, filename, mimetype, encoding } = await file;
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );
    const uploadStream = this.createUploadStream(filePath);
    stream.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    return { filename, mimetype, encoding, url: result.Location };
  }

  async multipleUploadsResolver(
    parent,
    { files }: { files: File[] }
  ): Promise<UploadedFileResponse[]> {
    return Promise.all(
      files.map((f) =>
        this.singleFileUploadResolver(null, { file: Promise.resolve(f) })
      )
    );
  }
}
