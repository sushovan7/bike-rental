import { useState } from "react";
import uploadImg from "../assets/uploadimg.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import API from "../utils/axiosInstance";

function Signup() {
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (signupData) => {
      const formData = new FormData();

      formData.append("firstName", signupData.firstName);
      formData.append("lastName", signupData.lastName);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("age", signupData.age);
      formData.append("gender", signupData.gender);
      formData.append("avatar", signupData.avatar);
      const response = await API.post("/auth/signup", formData);
      return response.data;
    },

    onSuccess: (data) => {
      if (data.success) {
        toast.success("User registered successfully!");
      }
      reset();
      navigate("/login");
    },

    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "User registration failed.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      avatar: null,
    },
  });

  const selectedGender = watch("gender");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("avatar", { type: "manua;", message: "Avatar is required" });
    } else {
      console.log(file);
      setProfileImg(file);
      setValue("avatar", file, { shouldValidate: true });
      clearErrors("avatar");
    }
  };

  function onSubmit(data) {
    console.log(data);
    if (!data.avatar) {
      setError("avatar", { type: "manual", message: "Avatar is required" });
      return;
    }
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl w-full max-w-md flex flex-col gap-6 items-center justify-center px-6 py-10 rounded-2xl bg-white"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Your Account
        </h2>

        <div className="w-full">
          <input
            {...register("firstName", { required: "Firstname is required" })}
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="w-full">
          {" "}
          <input
            {...register("lastName", { required: "Lastname is required" })}
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.lastName && (
            <p className="text-xs mt-1 text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters long",
              },
            })}
            placeholder="Password"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="w-full">
          {" "}
          <input
            {...register("age", { required: "Age is required" })}
            type="number"
            placeholder="Age"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          {errors.age && (
            <p className="text-xs text-red-500">{errors.age.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col ">
          <div className="flex w-full justify-around gap-4">
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Male</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="MALE"
                className="radio radio-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Female</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="FEMALE"
                className="radio radio-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Other</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="OTHERS"
                className="radio radio-primary"
              />
            </label>
          </div>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender.message}</p>
          )}
          {selectedGender && (
            <p className="mt-2 text-[#605DFF]">
              You selected: {selectedGender}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full items-center">
          <h1 className="label text-[#1D232A]  mb-3">Profile Image:</h1>
          <label htmlFor="image1" className="cursor-pointer overflow-hidden">
            <img
              width="70px"
              height="70px"
              src={profileImg ? URL.createObjectURL(profileImg) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />{" "}
            <input
              type="file"
              id="image1"
              hidden
              onChange={handleImageChange}
            />
          </label>
          {errors.avatar && (
            <p className="text-xs text-red-500">{errors.avatar.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn btn-primary w-full mt-3 shadow-lg"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" /> ...Submitting
            </>
          ) : (
            "Sign up"
          )}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#5753E8]">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
