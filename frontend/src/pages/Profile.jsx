const Profile = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="space-y-4">
        <label>
          <div className="avatar">
            <div className="w-24 rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400">First Name</label>
            <input type="text" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block text-gray-400">Last Name</label>
            <input type="text" className="input input-bordered w-full" />
          </div>
        </div>
        <div>
          <label className="block text-gray-400">Email</label>
          <input type="text" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-gray-400">Password</label>
          <input type="text" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-gray-400">Age</label>
          <input type="number" className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-gray-400">Gender</label>
          <select className="select select-bordered w-full">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">KYC Verified</label>
          <input
            type="text"
            disabled
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>
      </div>
      <button className="btn btn-primary w-full mt-4">Update Profile</button>
    </div>
  );
};

export default Profile;
