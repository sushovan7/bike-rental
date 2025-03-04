import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import uploadImg from "../assets/uploadimg.png";
import { useForm } from "react-hook-form";

function AllUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
  });

  const queryClient = useQueryClient();
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/users`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    if (!id) {
      throw new Error("userId is required");
    }

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/delete-user/${id}`,
      { headers: { token } }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      const message = data.message || "User deleted successfully";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user");
    },
  });

  const updateUser = async ({ updatedData, id }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    if (!id) {
      throw new Error("userId is required");
    }

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/update-user/${id}`,
      updatedData,
      { headers: { token } }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      const message = data.message || "User updated successfully";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error(error.message || "Failed to update user");
    },
  });

  const handleDeleteUser = (id) => {
    setDeletingUserId(id);
    deleteMutation.mutate(id, {
      onSettled: () => {
        setDeletingUserId(null);
      },
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    reset(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    reset();
  };

  function handleSelectedUser(id) {
    if (selectedIds.includes(id)) {
      const updatedIds = selectedIds.filter((itemId) => id !== itemId);
      setSelectedIds(updatedIds);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  function onSubmit(data) {
    const id = data._id;
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    avatar && formData.append("avatar", avatar);
    updateMutation.mutate({ updatedData: formData, id });
  }

  const handleViewUser = (user) => {
    setSelectedUser(user);
    document.getElementById("user_details_modal").showModal();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table min-w-[800px]">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Kyc?</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users && data.users.length > 0
              ? data.users.map((user) => (
                  <tr key={user._id}>
                    <th>
                      <label>
                        <input
                          onChange={() => handleSelectedUser(user._id)}
                          type="checkbox"
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={user.avatar} alt="Bike Image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.firstName}</div>
                          <div className="text-sm opacity-50">
                            {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      {user.kycVerified ? (
                        <div className="badge badge-success">Verified</div>
                      ) : (
                        <div className="badge badge-error">Not verified</div>
                      )}
                    </td>
                    <td>{user.gender}</td>
                    <td>{user.age}</td>
                    <td>
                      <div className="flex gap-2">
                        <div className="tooltip" data-tip="edit">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Pencil size={20} />
                          </button>

                          <dialog
                            open={editModalOpen}
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="modal-box"
                            >
                              <h3 className="font-bold text-lg">
                                Edit User Details:
                              </h3>
                              <div className="py-4">
                                <div className="form-control mb-2">
                                  <label className="label flex flex-col">
                                    <span className="label-text">Avatar</span>
                                    <img
                                      height={80}
                                      width={80}
                                      src={
                                        avatar && avatar !== null
                                          ? URL.createObjectURL(avatar)
                                          : uploadImg
                                      }
                                      alt="profile_img"
                                    />
                                    <input
                                      type="file"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setAvatar(file || null);
                                      }}
                                      className="file-input file-input-bordered hidden w-full"
                                      accept="image/*"
                                    />
                                  </label>
                                </div>

                                <div className="form-control mb-2">
                                  <label className="label">
                                    <span className="label-text">
                                      First Name
                                    </span>
                                  </label>
                                  <input
                                    {...register("firstName")}
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered w-full"
                                  />
                                </div>

                                <div className="form-control mb-2">
                                  <label className="label">
                                    <span className="label-text">
                                      Last Name
                                    </span>
                                  </label>
                                  <input
                                    {...register("lastName")}
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered w-full"
                                  />
                                </div>

                                <div className="form-control mb-2">
                                  <label className="label">
                                    <span className="label-text">Age</span>
                                  </label>
                                  <input
                                    {...register("age")}
                                    type="number"
                                    placeholder="Age"
                                    className="input input-bordered w-full"
                                  />
                                </div>

                                <div className="form-control mb-2">
                                  <label className="label">
                                    <span className="label-text">Gender</span>
                                  </label>
                                  <div className="flex gap-4">
                                    <label className="label cursor-pointer">
                                      <input
                                        {...register("gender")}
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        className="radio"
                                      />
                                      <span className="label-text ml-2">
                                        Male
                                      </span>
                                    </label>
                                    <label className="label cursor-pointer">
                                      <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        className="radio"
                                      />
                                      <span className="label-text ml-2">
                                        Female
                                      </span>
                                    </label>
                                    <label className="label cursor-pointer">
                                      <input
                                        type="radio"
                                        name="gender"
                                        value="OTHERS"
                                        className="radio"
                                      />
                                      <span className="label-text ml-2">
                                        Others
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="modal-action">
                                <button
                                  disabled={updateMutation.isPending}
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  {updateMutation.isPending ? (
                                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                                <button
                                  type="button "
                                  className="btn btn-error"
                                  onClick={closeEditModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </dialog>
                        </div>
                        <div className="tooltip" data-tip="view">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="btn btn-success btn-sm"
                          >
                            <Eye size={20} />
                          </button>
                          <dialog
                            id="user_details_modal"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                User Details:
                              </h3>

                              <div className="flex flex-col items-center gap-4 py-4">
                                <div className="avatar">
                                  <div className="w-24 rounded-full">
                                    <img
                                      className="object-cover object-center"
                                      src={selectedUser?.avatar}
                                      alt="selectedUser Profile"
                                    />
                                  </div>
                                </div>

                                <div className="text-center">
                                  <p className="text-xl font-semibold mb-3">
                                    <span className="inline capitalize">
                                      {selectedUser?.firstName}
                                    </span>{" "}
                                    {selectedUser?.lastName}
                                  </p>
                                  <p className="text-gray-400">
                                    {selectedUser?.email}
                                  </p>
                                  <p className="text-gray-400">
                                    Age: {selectedUser?.age}
                                  </p>
                                  <p className="text-gray-400">
                                    Gender: {selectedUser?.gender}
                                  </p>
                                  <div className="text-gray-400 mt-2 gap-2 flex items-center">
                                    KYC:{" "}
                                    {selectedUser?.kycVerified ? (
                                      <div className="badge badge-success">
                                        Verified
                                      </div>
                                    ) : (
                                      <div className="badge badge-error">
                                        Not verified
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn btn-primary">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </div>

                        <div className="tooltip" data-tip="delete">
                          <button
                            disabled={
                              (deleteMutation.isPending &&
                                deleteUser === user._id) ||
                              selectedIds.length > 1
                            }
                            onClick={() => handleDeleteUser(user._id)}
                            className="btn px-2  btn-error btn-sm"
                          >
                            {deleteMutation.isPending &&
                            deletingUserId === user._id ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : "There are no products"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
