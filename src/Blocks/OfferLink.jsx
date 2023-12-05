import React from "react";
import { useForm } from "react-hook-form";

const OfferLink = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-10 py-5">
      <h1 className="text-center text-lg font-bold text-slate-700">
        Add Your Website
      </h1>
      {/* form data */}
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                pattern: /^https?:\/\//,
              })}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default OfferLink;
