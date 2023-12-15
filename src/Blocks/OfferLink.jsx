import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { webCategory } from "../Api/siteCategory";
import DownLoadBtn from "../Componetns/DownLoadBtn";
import axios from "axios";
import { parentUrl } from "../Api/baseUrl";
import { toast } from "sonner";
import { AuthContext } from "../Poveiders/AuthProvider";

const OfferLink = () => {
  // get user
  const { user } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const payLoad = {
      addedSite: data.addedSite,
      category: data.category,
      launchDate: data.launchDate,
      monthlyOrgVisit: data.monthlyOrgVisit,
      rankingKeyWords: data.rankingKeyWords,
      type: data.type,
      email: user.email,
    };
    axios
      .post(`${parentUrl}/offer-backlink`, payLoad)
      .then((res) => {
        // console.log(res);
        toast.info(`Data submitted, Download the html file to verify`);
      })
      .then((error) => console.log(error));
    reset();
  };

  return (
    <div className="px-10 py-5 font-roboto">
      <h1 className="text-center text-lg font-bold text-slate-700">
        Add Your Website
      </h1>
      {/* form data */}
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex lg:flex-row flex-col items-start gap-3">
            {/* add website input */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Add Your Website</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("addedSite", {
                  required: true,
                  pattern: /^www\..+\.(com|net|org|io|info|co|edu)$/,
                })}
              />
              {errors.addedSite && errors.addedSite?.type === "pattern" && (
                <span className="text-xs py-2 font-semibold text-red-400">
                  Start with www. and end with .com or TLDs
                </span>
              )}
            </label>
            {/* category */}
            <label className="form-control w-fit max-w-xs">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                className="select select-bordered"
                {...register("category", { required: true })}
              >
                <option disabled selected>
                  Pick one
                </option>
                {webCategory.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
            </label>
            {/* monthly organic visits */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Monthly Organic Visits</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("monthlyOrgVisit", {
                  required: true,
                })}
              />
              {errors.monthlyOrgVisit &&
                errors.monthlyOrgVisist?.type === "valueAsNumber" && (
                  <span className="text-xs py-2 font-semibold text-red-400">
                    Numbers Only
                  </span>
                )}
            </label>
          </div>
          {/* second row */}
          <div className="mt-3 flex lg:flex-row flex-col gap-3">
            {/* launch date */}
            <label className="form-control w-fit max-w-xs">
              <div className="label">
                <span className="label-text">Launch Date</span>
              </div>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("launchDate", {
                  required: true,
                })}
              />
            </label>
            {/* key words */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Ranking Keywords</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("rankingKeyWords", {
                  required: true,
                  pattern: /^\w+(,\w+)*$/,
                })}
              />
              {errors.rankingKeyWords &&
                errors.rankingKeyWords?.type === "pattern" && (
                  <span className="text-xs py-2 font-semibold text-red-400">
                    Seperate words with commas (,)
                  </span>
                )}
            </label>
            {/* type do follow / not follow */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                className="select select-bordered"
                {...register("type", { required: true })}
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Follow</option>
                <option>Not follow</option>
              </select>
            </label>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label flex flex-col items-start mt-4">
              <span className="label-text pb-1">
                Download the file to verify your site
              </span>
              <DownLoadBtn />
            </div>
          </label>
          <input className="btn btn-md btn-outline mt-3" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default OfferLink;
