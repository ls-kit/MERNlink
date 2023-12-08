import { saveAs } from "file-saver";
import React from "react";
import { FaCircleArrowDown } from "react-icons/fa6";

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
    <div>
      <button
        className="btn btn-outline flex gap-1 items-center"
        onClick={handleDownload}
      >
        Download HTML File
      </button>
    </div>
  );
};

export default DownLoadBtn;
