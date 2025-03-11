import { useForm } from "react-hook-form";
import kycUploadImg from "../assets/kyc-upload.jpeg";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const KycForm = () => {
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [licenseImg, setlicenseImg] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      contactNumber: "",
      emailAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      identificationType: "",
      idNumber: "",
      frontImg: "",
      backImg: "",
      licenseImg: "",
      licenseNumber: "",
      issuingDate: "",
      issuingAuthority: "",
      emergencyContactName: "",
      emergencyRelation: "",
      emergencyPhoneNumber: "",
      termsAndCondition: false,
      verificationAndProcessing: false,
    },
  });

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("fullName", data.fullName);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("gender", data.gender);
    formData.append("contactNumber", data.contactNumber);
    formData.append("emailAddress", data.emailAddress);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("zipCode", data.zipCode);
    formData.append("identificationType", data.identificationType);
    formData.append("idNumber", data.idNumber);
    formData.append("licenseNumber", data.licenseNumber);
    formData.append("emergencyContactName", data.emergencyContactName);
    formData.append("emergencyRelation", data.emergencyRelation);
    formData.append("emergencyPhoneNumber", data.emergencyPhoneNumber);
    formData.append("termsAndCondition", data.termsAndCondition);
    formData.append(
      "verificationAndProcessing",
      data.verificationAndProcessing
    );
    if (frontImg) formData.append("frontImg", frontImg);
    if (backImg) formData.append("backImg", backImg);
    if (licenseImg) formData.append("licenseImg", licenseImg);
    kycMutation.mutate(formData);
  }

  const kycMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/kyc/create-kyc`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Kyc request sent successfully! wait for admin approval");
        reset(), setFrontImg(null), setBackImg(null), setlicenseImg(null);
        navigate("/");
      }
    },

    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Kyc request sent failed.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-base-100">
      <div className="card w-full max-w-2xl p-6 md:p-8 shadow-lg bg-base-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">KYC Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                />
                {errors.fullName && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                  })}
                  type="date"
                  className="input input-bordered w-full"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="select select-bordered w-full"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  {...register("contactNumber", {
                    required: "Contact number is required",
                  })}
                  type="tel"
                  placeholder="Contact Number"
                  className="input input-bordered w-full"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  {...register("emailAddress", {
                    required: "Email address is required",
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Address Details</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full"
                />
                {errors.city && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("state", {
                    required: "State is required",
                  })}
                  type="text"
                  placeholder="State"
                  className="input input-bordered w-full"
                />
                {errors.state && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("country", {
                    required: "Country is required",
                  })}
                  type="text"
                  placeholder="Country"
                  className="input input-bordered w-full"
                />
                {errors.country && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("zipCode", {
                    required: "zipCode is required",
                  })}
                  type="text"
                  placeholder="ZIP Code"
                  className="input input-bordered w-full"
                />
                {errors.zipCode && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Identity Verification</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                {" "}
                <select
                  {...register("identificationType", {
                    required: "Identification type is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="PASSPORT">Passport</option>
                  <option value="NATIONAL_ID">National ID</option>
                </select>
                {errors.identificationType && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.identificationType.message}
                  </p>
                )}
              </div>
              <div>
                {" "}
                <input
                  {...register("idNumber", {
                    required: "Id number is required",
                  })}
                  type="text"
                  placeholder="ID Number"
                  className="input input-bordered w-full"
                />
                {errors.idNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.idNumber.message}
                  </p>
                )}
              </div>

              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">
                    Upload ID Proof (Front & Back)
                  </span>
                </label>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p>Front photo</p>
                    <label htmlFor="front-img" className="cursor-pointer">
                      <img
                        src={
                          frontImg
                            ? URL.createObjectURL(frontImg)
                            : kycUploadImg
                        }
                        alt="front_image"
                        className="object-cover w-full h-40 rounded-lg"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageChange(e, setFrontImg, "frontImg")
                        }
                        id="front-img"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Back photo</p>
                    <label htmlFor="back-img" className="cursor-pointer">
                      <img
                        src={
                          backImg ? URL.createObjectURL(backImg) : kycUploadImg
                        }
                        alt="back_image"
                        className="object-cover w-full h-40 rounded-lg"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageChange(e, setBackImg, "backImg")
                        }
                        id="back-img"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Driving License</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                {" "}
                <input
                  {...register("licenseNumber", {
                    required: "License number is required",
                  })}
                  type="text"
                  placeholder="Driving License Number"
                  className="input input-bordered w-full"
                />
                {errors.licenseNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>

              <br />
              <label htmlFor="license-img" className="cursor-pointer">
                <img
                  src={
                    licenseImg ? URL.createObjectURL(licenseImg) : kycUploadImg
                  }
                  alt="license_image"
                  className="object-cover w-full h-40 rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleImageChange(e, setlicenseImg, "license")
                  }
                  id="license-img"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-6 p-6 bg-base-100 rounded-lg">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <input
                  {...register("emergencyContactName", {
                    required: "Emergency contact name is required",
                  })}
                  type="text"
                  placeholder="Contact Name"
                  className="input input-bordered w-full"
                />
                {errors.emergencyContactName && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.emergencyContactName.message}
                  </p>
                )}
              </div>

              <div>
                {" "}
                <input
                  {...register("emergencyRelation", {
                    required: "Emergency relation name is required",
                  })}
                  type="text"
                  placeholder="Relationship"
                  className="input input-bordered w-full"
                />
                {errors.emergencyRelation && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.emergencyRelation.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("emergencyPhoneNumber", {
                    required: "Emergency phone number name is required",
                  })}
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full col-span-2"
                />
                {errors.emergencyPhoneNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.emergencyPhoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Agreement & Consent Section */}
          <div className="space-y-6">
            <div className="form-control">
              <label className="cursor-pointer flex gap-2">
                <input
                  {...register("termsAndCondition", {
                    required: "You must agree to the terms and conditions",
                  })}
                  type="checkbox"
                  className="checkbox"
                />
                <span>I agree to the Terms & Conditions</span>
              </label>
              {errors.termsAndCondition && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.termsAndCondition.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="cursor-pointer flex gap-2">
                <input
                  {...register("verificationAndProcessing", {
                    required: "Required",
                  })}
                  type="checkbox"
                  className="checkbox"
                />
                <span>I allow Data Verification & Processing</span>
              </label>
              {errors.verificationAndProcessing && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.verificationAndProcessing.message}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={kycMutation.isPending}
            type="submit"
            className="btn btn-primary w-full"
          >
            {kycMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "   Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KycForm;
