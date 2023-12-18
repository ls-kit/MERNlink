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
    <div
      className="tooltip tooltip-top top-center w-full"
      data-tip="Upload it to the root directory of your website, for example at www.example.com/downloadedfile.html"
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Download to verify</span>
        </div>
        <button
          className="btn btn-outline flex gap-1 items-center bg-yellow-300"
          onClick={handleDownload}
        >
          <FaDownload /> Download the HTML File
        </button>
      </label>
    </div>
  );
};

export default DownLoadBtn;
