import React from "react";
import { Link } from "react-router-dom";
import DownLoadBtn from "../Componetns/DownLoadBtn";

const VerificationPg = () => {
  return (
    <div className="px-5 py-1 font-roboto">
      <div className="pt-4 border-b pb-3 border-slate-300">
        <h1 className="text-xl font-semibold text-slate-400">
          Please Confirm your ownership of the website by followig the
          instructions
        </h1>
        <p className="text-xs font-semibold text-slate-500 pt-3">
          You may skip this step now and later verify your site from{" "}
          <Link className="text-indigo-400" to={"/offer-backlink"}>
            My Websites
          </Link>
        </p>
      </div>
      {/* verification steps */}
      <ol className="mt-5 py-3 bg-[#fdfff5] px-3 rounded-lg text-sm flex flex-col gap-8">
        <li className="flex items-center gap-5">
          1. Click <DownLoadBtn />
        </li>
        <li>2. Add downloaded file to your websites root directory</li>
        <li>
          3. After that the file should be accessible at:{" "}
          <a target="_blank" href={""}>
            www.verify.com/html
          </a>
        </li>
        <li>4. Click "Confirm"</li>
        <li>5. Our system will check your website</li>
        <li>
          6. Once the verification is completed, you'll be notified about it's
          results
        </li>
      </ol>
      {/* buttons */}
      <div className="flex gap-3 mt-2">
        <Link
          className="w-28 btn btn-outline btn-md bg-indigo-400 font-bold text-white"
          to={"/submit-website"}
        >
          Back
        </Link>
        <button className="w-28 btn btn-outline btn-md bg-emerald-300 font-bold text-white">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default VerificationPg;
