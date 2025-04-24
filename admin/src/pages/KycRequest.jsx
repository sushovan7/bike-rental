import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchKycRequests = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication required");

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/kyc/kyc-request`,
    { headers: { token } }
  );

  if (response.status !== 200) {
    throw new Error(`Failed to fetch KYC requests: ${response.statusText}`);
  }

  return response.data;
};

const StatusBadge = ({ status }) => {
  const statusMap = {
    VERIFIED: "badge-success",
    PENDING: "badge-warning",
    REJECTED: "badge-error",
  };

  return (
    <div className={`badge ${statusMap[status] || "badge-ghost"} uppercase`}>
      {status}
    </div>
  );
};

const UserAvatar = ({ user }) => (
  <div className="flex items-center gap-4">
    <div className="avatar">
      <div className="w-12 h-12 mask mask-squircle">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={`${user.firstName}'s avatar`}
        />
      </div>
    </div>
    <div>
      <p className="font-semibold">
        {user.firstName} {user.lastName}
      </p>
      <p className="text-xs text-gray-500">{user.email}</p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex justify-center py-10">
    <span className="loading loading-spinner text-primary w-10 h-10"></span>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="alert alert-error mt-4">
    <span>Error: {error.message}</span>
  </div>
);

const EmptyState = () => (
  <div className="alert alert-info mt-4">
    <span>No KYC requests at this time.</span>
  </div>
);

function KycRequest() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["kycRequests"],
    queryFn: fetchKycRequests,
    retry: false,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data?.kycRequest?.length) return <EmptyState />;

  return (
    <div className="overflow-x-auto mt-6 p-4 shadow rounded-xl bg-base-100">
      <h2 className="text-2xl font-bold mb-4">KYC Requests</h2>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.kycRequest.map((request) => (
            <tr key={request._id}>
              <td>
                <UserAvatar user={request.userId} />
              </td>
              <td>
                <StatusBadge status={request.kycStatus} />
              </td>
              <td>
                <Link
                  to={`/review-kyc-request/${request._id}`}
                  className="btn btn-sm btn-info"
                >
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KycRequest;
