import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import { UPLOAD_SINGLE_FILE } from "./graphql/upload";

function App() {
  const [singleFileUpload] = useMutation(UPLOAD_SINGLE_FILE);

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log("onDrop acceptedFiles", acceptedFiles);
    const file = acceptedFiles[0];
    await singleFileUpload({
      variables: { file },
    });
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  const files = acceptedFiles.map((file: any) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default App;
