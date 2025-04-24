import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMessages = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/contact/contact-message`,
    {
      headers: { token },
    }
  );
  return response.data;
};

function UserMessage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: fetchMessages,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Contact Messages from Users
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading messages. Please try again.</span>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.messages?.length ? (
            data.messages.map((message) => (
              <div
                key={message._id}
                className="card border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {message.name}
                      </h2>
                      <div className="text-sm text-gray-400 mt-1">
                        {message.email}
                      </div>
                    </div>
                  </div>

                  {message.subject && (
                    <h3 className="text-lg font-medium text-white mb-2">
                      Subject: {message.subject}
                    </h3>
                  )}

                  <p className="text-gray-200 mb-4">
                    Message : {message.message}
                  </p>

                  <div className="text-xs text-gray-400">
                    Received on {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg">No messages found</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMessage;
