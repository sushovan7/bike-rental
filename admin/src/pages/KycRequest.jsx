import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function KycRequest() {
  const fetchKycRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/kyc/kyc-request`,
      {
        headers: { token },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  };

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["kycRequests"],
    queryFn: fetchKycRequest,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No kyc request right now</span>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kyc Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.kycRequest &&
          Array.isArray(data.kycRequest) &&
          data.kycRequest.length > 0 ? (
            data.kycRequest.map((request) => {
              return (
                <tr key={request._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={request.userId.avatar}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {request.userId.firstName}
                        </div>
                        <div className="text-sm opacity-50">
                          {request.userId.lastName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {request.kycStatus === "PENDING" ||
                    request.kycStatus === "REJECTED" ? (
                      <div className="badge badge-error">
                        {request.kycStatus}
                      </div>
                    ) : (
                      <div className="badge badge-success">
                        {request.kycStatus}
                      </div>
                    )}
                  </td>
                  <th>
                    <Link
                      to={`/review-kyc-request/${request._id}`}
                      className="btn btn-info btn-sm"
                    >
                      Review
                    </Link>
                  </th>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No request present at the moment
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default KycRequest;
