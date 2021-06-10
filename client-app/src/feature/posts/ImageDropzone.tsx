import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
  className?: any;
}
export default function ImageDropzone({ setFiles, className }: Props) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Callback chỉ làm việc khi dependency thay đổi cụ thể là setFiles()
      setFiles(acceptedFiles);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      <i className="far fa-images" style={{ color: "green", fontSize: 30, marginLeft: 8, marginTop: 9 }}></i>
    </div>
  );
}
