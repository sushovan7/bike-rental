import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const ReviewKycRequest = () => {
  const { requestId } = useParams();

  const fetchKycRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/kyc/kyc-request/${requestId}`,
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
    queryKey: ["kycRequests", requestId],
    queryFn: fetchKycRequest,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-base-100">
      <div className="card w-full p-6 md:p-8 shadow-lg bg-base-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">
          KYC Request Review
        </h2>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                <img
                  src={data.kycRequest.userId.avatar}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">
                  {data.kycRequest.userId.firstName}{" "}
                  {data.kycRequest.userId.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{data.kycRequest.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{data.kycRequest.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{data.kycRequest.contactNumber}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{data.kycRequest.emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Address Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{data.kycRequest.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{data.kycRequest.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{data.kycRequest.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ZIP Code</p>
                <p className="font-medium">{data.kycRequest.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Identity Verification Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Identity Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Identification Type</p>
                <p className="font-medium">
                  {data.kycRequest.identificationType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="font-medium">{data.kycRequest.idNumber}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm text-gray-500">ID Proof (Front & Back)</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Front Photo</p>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={data.kycRequest.frontImg}
                        alt="front_image"
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Back Photo</p>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={data.kycRequest.backImg}
                        alt="back_image"
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Driving License Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Driving License</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Driving License Number</p>
                <p className="font-medium">{data.kycRequest.licenseNumber}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm text-gray-500">Driving License Image</p>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={data.kycRequest.licenseImg}
                    alt="license_image"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-6 p-6 bg-base-100 rounded-lg">
            <h3 className="text-xl font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Contact Name</p>
                <p className="font-medium">
                  {data.kycRequest.emergencyContactName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="font-medium">
                  {data.kycRequest.emergencyRelation}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">
                  {data.kycRequest.emergencyPhoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Agreement & Consent Section */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Terms & Conditions</p>
              <p className="font-medium">
                {data.kycRequest.termsAndCondition ? "Agreed" : "Not agreed"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Data Verification & Processing
              </p>
              <p className="font-medium">
                {data.kycRequest.verificationAndProcessing
                  ? "Allowed"
                  : "Not Allowed"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button className="btn btn-error">Reject</button>
            <button className="btn btn-success">Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewKycRequest;
