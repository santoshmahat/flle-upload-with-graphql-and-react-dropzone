const fileResolvers = {
  Mutation: {
    singleFileUpload: async (info, { file }, ctx) => {
      const { filename, mimetype, encoding, createReadStream } = await file;
      console.log("single upload", filename);
      return {
        filename,
        mimetype,
        encoding,
      };
    },
  },
};

export default fileResolvers;
