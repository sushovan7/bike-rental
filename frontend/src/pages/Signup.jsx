import { useState } from "react";
import uploadImg from "../assets/uploadimg.png";

function Signup() {
  const [profileImg, setProfileImg] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form className="shadow-xl w-full max-w-md flex flex-col gap-6 items-center justify-center px-6 py-10 rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Your Account
        </h2>

        <div className="w-full">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>

        <div className="w-full">
          {" "}
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>
        <div className="w-full">
          {" "}
          <input
            type="number"
            placeholder="Age"
            className="input input-bordered w-full rounded-lg shadow-md"
          />
          <p className="text-xs text-red-500">error</p>
        </div>

        <div className="flex w-full flex-col ">
          <div className="flex w-full justify-around gap-4">
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Male</span>
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Female</span>
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text text-[#1D232A]">Other</span>
              <input
                type="radio"
                name="gender"
                value="other"
                className="radio radio-primary"
              />
            </label>
          </div>

          <p className="text-xs text-red-500">error</p>
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
              onChange={(e) => setProfileImg(e.target.files[0])}
            />
          </label>
          <p className="text-xs text-red-500">error</p>
        </div>

        <button className="btn btn-primary w-full mt-3 shadow-lg">
          Sign Up
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
