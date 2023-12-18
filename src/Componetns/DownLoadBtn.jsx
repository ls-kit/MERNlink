import { saveAs } from "file-saver";
import React from "react";
import { FaDownload } from "react-icons/fa6";

const DownLoadBtn = () => {
  // generate dynamic filename
  const generateFileName = () => {
    const uniqueStr = Math.random().toString(36).substring(2, 10);
    return `${uniqueStr}.html`;
  };

  //   handle download
  const handleDownload = () => {
    // generate a unique file name
    const fileName = generateFileName();
    const blob = new Blob(["/verify.html"], { type: `html` });
    // triggering the download using Filesaver.js
    saveAs(blob, fileName);
  };

  return (
    <div className="w-full flex flex-col items-start">
      <button
        className="btn btn-outline btn-md flex gap-1 items-center bg-yellow-300 w-full"
        onClick={handleDownload}
      >
        <FaDownload /> Download File
      </button>
    </div>
  );
};

export default DownLoadBtn;
