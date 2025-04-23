import { useState } from "react";
import uploadImg from "../assets/uploadimg.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`,
        formData
      );
      return response.data;
    },

    onSuccess: (data) => {
      if (data.success) {
        toast.success(
          "User registered successfully. A Email verification link has been sent to your email."
        );
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
      setError("avatar", { type: "manual", message: "Avatar is required" });
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
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400">First Name</label>
            <input
              {...register("firstName", { required: "Firstname is required" })}
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-400">Last Name</label>
            <input
              {...register("lastName", { required: "Lastname is required" })}
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
            />
            {errors.lastName && (
              <p className="text-xs mt-1 text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-400">Email</label>
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
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
              },
            })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-400">Age</label>
          <input
            {...register("age", { required: "Age is required" })}
            type="number"
            placeholder="Age"
            className="input input-bordered w-full"
          />
          {errors.age && (
            <p className="text-xs text-red-500">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400">Gender</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="label-text">Male</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="MALE"
                className="radio radio-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="label-text">Female</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="FEMALE"
                className="radio radio-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="label-text">Other</span>
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                value="OTHERS"
                className="radio radio-primary"
              />
            </div>
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

        <div className="flex flex-col items-center">
          <label className="block text-gray-400 mb-3">Profile Image</label>
          <label htmlFor="image1" className="cursor-pointer overflow-hidden">
            <img
              width="70px"
              height="70px"
              src={profileImg ? URL.createObjectURL(profileImg) : uploadImg}
              alt="profile_image"
              className="object-cover"
            />
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
          className="btn btn-primary w-full mt-4"
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
