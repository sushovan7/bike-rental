import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uploadImg from "../assets/uploadimg.png";
import { updateUser } from "../features/auth/authSlice";
import NewsLetter from "../components/NewsLetter";

const Profile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      gender: user?.gender || "",
      avatar: null,
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      gender: user?.gender || "",
      avatar: null,
    });
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const formData = new FormData();
      formData.append("firstName", updatedData.firstName);
      formData.append("lastName", updatedData.lastName);
      formData.append("age", updatedData.age);
      formData.append("gender", updatedData.gender);
      if (profileImg) {
        formData.append("avatar", profileImg);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/users/${user._id}`,
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
        toast.success("User updated successfully!");
        reset();
        setProfileImg(null);
        dispatch(updateUser(data.updatedUser));
        navigate("/");
      }
    },

    onError: (error) => {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "User update failed.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("avatar", { type: "manual", message: "Avatar is required" });
    } else {
      setProfileImg(file);
      setValue("avatar", file, { shouldValidate: true });
      clearErrors("avatar");
    }
  };

  const onSubmit = (updatedData) => {
    updateMutation.mutate(updatedData);
  };

  return (
    <>
      <div className="max-w-lg mx-auto mb-20 p-6 bg-base-200 rounded-xl shadow-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-gray-400 mb-3">Profile Image</label>
          <label htmlFor="image1" className="cursor-pointer overflow-hidden">
            <img
              src={profileImg ? URL.createObjectURL(profileImg) : uploadImg}
              alt="profile_image"
              className="object-cover w-30 h-30"
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

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block text-gray-400">First Name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="input input-bordered w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-400">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="input input-bordered w-full"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          <button
            disabled={updateMutation.isPending}
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
      <NewsLetter />
    </>
  );
};

export default Profile;
