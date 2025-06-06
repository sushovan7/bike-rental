import { useState, useEffect } from "react";
import NewsLetter from "../components/NewsLetter";
import stripe_logo from "../assets/stripe_logo.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [showReedeemInput, setShowReedeemInputs] = useState(false);
  const [reedeemValue, setReedeemValue] = useState(0);
  const { bikeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [orderType, setOrderType] = useState("buy");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrowStr);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  async function fetchProducts() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/product/user/products/${bikeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Invalid response structure");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async function fetchUser() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Invalid response structure");
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching User", error);
      throw new Error("Failed to fetch user");
    }
  }

  const { data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUser,
  });

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["products", bikeId],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data?.product) {
      setOrderType(data.product.price ? "buy" : "rent");
    }
  }, [data]);

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "country",
      "phone",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^[0-9]{6,}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    // Rental date validation
    if (orderType === "rent") {
      if (!startDate) errors.startDate = "Start date is required";
      if (!endDate) errors.endDate = "End date is required";
      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        errors.endDate = "End date must be after start date";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculateRentalDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const rentalDays = calculateRentalDays();

  const subtotal =
    orderType === "buy"
      ? data?.product?.price || 0
      : (data?.product?.rentalPrice || 0) * rentalDays;

  const shipping = 500;
  const total = subtotal + shipping - reedeemValue;

  const placeOrder = async (paymentMethod) => {
    setLoading(true);
    try {
      const orderData = {
        bikeId: bikeId,
        orderType,
        paymentMethod: paymentMethod || method,
        amount: total,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
        },
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        usedRedeemPoints: reedeemValue,
      };

      if (orderType === "rent") {
        orderData.rentalStartDate = startDate;
        orderData.rentalEndDate = endDate;
        orderData.rentalDuration = rentalDays;
      }

      if (paymentMethod === "khalti") {
        const phoneStr = formData.phone?.toString() || "";
        if (!/^(98|97|96)\d{8}$/.test(phoneStr)) {
          throw new Error(
            "Please provide a valid Nepali phone number (98/97/96XXXXXXXX)"
          );
        }
      }

      let endpoint = "/order/cod";
      if (paymentMethod === "stripe") endpoint = "/order/stripe";
      if (paymentMethod === "khalti") endpoint = "/order/khalti";

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}${endpoint}`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (paymentMethod === "khalti") {
        if (response.data.payment_url) {
          window.location.replace(response.data.payment_url);
          localStorage.setItem(
            "khalti_order_data",
            JSON.stringify({
              pidx: response.data.pidx || "",
              bikeId: response.data.bikeId || "",
              amount: response.data.amount || "",
              address: response.data.address || "",
              phone: response.data.phone || "",
              firstName: response.data.firstName || "",
              lastName: response.data.lastName || "",
              email: response.data.email || "",
              rentalDuration: response.data.rentalDuration || "",
              rentalStartDate: response.data.rentalDays || "",
              rentalEndDate: response.data.rentalEndDate || "",
            })
          );
        } else {
          throw new Error(
            response.data.message || "Failed to initiate Khalti payment"
          );
        }
      } else if (response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        throw new Error(response.data.message || "Failed to process order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(
        error.message || "Failed to process order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (method === "cod") {
      await placeOrder("cod");
    } else if (method === "stripe") {
      await placeOrder("stripe");
    } else if (method === "khalti") {
      await placeOrder("khalti");
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        {error.message}
      </div>
    );
  }

  if (!data || !data.product) {
    return (
      <div className="alert alert-warning max-w-md mx-auto mt-8">
        No product data available.
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="alert alert-warning max-w-md mx-auto mt-8">
        Please wait ...
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <div className="divider max-w-md mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="card bg-base-100 border border-gray-600">
              <div className="card-body px-6 py-4">
                <h2 className="card-title text-2xl mb-6">
                  <span>Delivery</span>{" "}
                  <span className="text-primary">Information</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className={`input input-bordered ${
                        formErrors.firstName ? "input-error" : ""
                      }`}
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={onChangeHandler}
                    />
                    {formErrors.firstName && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {formErrors.firstName}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className={`input input-bordered ${
                        formErrors.lastName ? "input-error" : ""
                      }`}
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={onChangeHandler}
                    />
                    {formErrors.lastName && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {formErrors.lastName}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control mt-6">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered ${
                      formErrors.email ? "input-error" : ""
                    }`}
                    required
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                  />
                  {formErrors.email && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {formErrors.email}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control mt-6">
                  <label className="label">
                    <span className="label-text">Street Address*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    className={`input input-bordered ${
                      formErrors.street ? "input-error" : ""
                    }`}
                    required
                    name="street"
                    value={formData.street}
                    onChange={onChangeHandler}
                  />
                  {formErrors.street && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {formErrors.street}
                      </span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">City*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      className={`input input-bordered ${
                        formErrors.city ? "input-error" : ""
                      }`}
                      required
                      name="city"
                      value={formData.city}
                      onChange={onChangeHandler}
                    />
                    {formErrors.city && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {formErrors.city}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">State/Province</span>
                    </label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="input input-bordered"
                      name="state"
                      value={formData.state}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">ZIP/Postal Code</span>
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="input input-bordered"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Country*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="United States"
                      className={`input input-bordered ${
                        formErrors.country ? "input-error" : ""
                      }`}
                      required
                      name="country"
                      value={formData.country}
                      onChange={onChangeHandler}
                    />
                    {formErrors.country && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {formErrors.country}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control mt-6">
                  <label className="label">
                    <span className="label-text">Phone Number*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className={`input input-bordered ${
                      formErrors.phone ? "input-error" : ""
                    }`}
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeHandler}
                  />
                  {formErrors.phone && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {formErrors.phone}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/2">
            <div className="card bg-base-100 border border-gray-600">
              <div className="card-body px-6 py-4">
                <h2 className="card-title text-2xl mb-6">
                  <span>Order</span>{" "}
                  <span className="text-primary">Summary</span>
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {data.product.bikeName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {orderType === "buy" ? "Purchase" : "Rental"}
                    </p>

                    {orderType === "rent" && (
                      <div className="mt-4 space-y-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Start Date*</span>
                          </label>
                          <input
                            type="date"
                            min={today}
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                              if (formErrors.startDate) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  startDate: "",
                                }));
                              }
                            }}
                            className={`input input-bordered ${
                              formErrors.startDate ? "input-error" : ""
                            }`}
                            required
                          />
                          {formErrors.startDate && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {formErrors.startDate}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">End Date*</span>
                          </label>
                          <input
                            type="date"
                            min={startDate || today}
                            value={endDate}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                              if (formErrors.endDate) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  endDate: "",
                                }));
                              }
                            }}
                            className={`input input-bordered ${
                              formErrors.endDate ? "input-error" : ""
                            }`}
                            required
                          />
                          {formErrors.endDate && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {formErrors.endDate}
                              </span>
                            </label>
                          )}
                        </div>
                        {rentalDays > 0 && (
                          <div className="text-sm">
                            Rental Duration: {rentalDays} day
                            {rentalDays !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      Rs{" "}
                      {orderType === "buy"
                        ? data.product.price
                        : data.product.rentalPrice}
                      {orderType === "rent" && (
                        <span className="text-sm">/day</span>
                      )}
                    </p>
                    {orderType === "rent" && rentalDays > 0 && (
                      <p className="text-sm">× {rentalDays} days</p>
                    )}
                  </div>
                </div>

                {orderType === "rent" && userData.user.redeemPoints > 0 && (
                  <div className="mt-4 p-4 bg-base-200 rounded-lg space-y-3">
                    {!showReedeemInput ? (
                      <>
                        <button
                          onClick={() => setShowReedeemInputs(true)}
                          className="btn btn-success btn-sm w-full sm:w-auto"
                        >
                          Apply Redeem Points
                        </button>
                        <div className="text-sm space-y-1">
                          <p>
                            Available points:{" "}
                            <span className="font-bold">
                              {userData.user.redeemPoints} pts
                            </span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Enter points"
                            className="input input-bordered flex-1"
                            min="0"
                            max={Math.min(
                              userData.user.redeemPoints,
                              total * 0.5
                            )}
                            value={reedeemValue}
                            onChange={(e) =>
                              setReedeemValue(Number(e.target.value))
                            }
                          />
                          <button
                            onClick={() => setShowReedeemInputs(false)}
                            className="btn btn-ghost btn-square btn-sm"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-gray-500">Point Value</div>
                            <div>1 pt = Rs 1</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Max Redeemable</div>
                            <div>
                              {Math.min(
                                userData.user.redeemPoints,
                                total * 0.5
                              )}{" "}
                              pts
                            </div>
                          </div>
                        </div>

                        <div className="p-2 bg-success/10 rounded">
                          <div className="flex justify-between">
                            <span>Discount Applied</span>
                            <span className="font-bold text-success">
                              Rs {Math.min(reedeemValue, total * 0.5)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="divider"></div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rs {shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reedeem discount</span>
                    <span>Rs {reedeemValue ? reedeemValue : 0}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>Rs {total}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="card-title text-2xl mb-6">
                    <span>Payment</span>{" "}
                    <span className="text-primary">Method</span>
                  </h2>

                  <div className="flex flex-col gap-3 mt-4">
                    <div
                      onClick={() => setMethod("stripe")}
                      className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
                        method === "stripe" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border ${
                          method === "stripe" ? "bg-blue-500" : "bg-white"
                        }`}
                      ></div>
                      <img src={stripe_logo} alt="Stripe" className="h-5" />
                    </div>
                    <div
                      onClick={() => setMethod("cod")}
                      className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
                        method === "cod" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border ${
                          method === "cod" ? "bg-blue-500" : "bg-white"
                        }`}
                      ></div>
                      <span className="text-gray-700">Cash On Delivery</span>
                    </div>
                    <div
                      onClick={() => setMethod("khalti")}
                      className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
                        method === "khalti" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border ${
                          method === "khalti" ? "bg-blue-500" : "bg-white"
                        }`}
                      ></div>
                      <span className="text-gray-700">Khalti</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <NewsLetter />
    </>
  );
}

export default PlaceOrder;
