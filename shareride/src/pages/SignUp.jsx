import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createUser(
        data.fullName,
        data.enrollmentNumber,
        data.phoneNo,
        data.password
      );
      if (!res || res.error) {
        toast.error(res.error || "An error occurred");
      } else {
        toast.success("User created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <img
          src="Share-Ride-logo.png"
          alt="logo"
          className="w-52 inline-block"
        />
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          Sign up into your account
        </h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name"
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Enrollment Number
            </label>
            <input
              type="text"
              {...register("enrollmentNumber", {
                required: "Enrollment number is required",
                pattern: {
                  value: /^[0-9]{2}[UI][A-Z]{2}[0-9]{3}$/,
                  message:
                    "Enrollment number must match format (e.g., 21UCS108 or 21UICS109)",
                },
              })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter enrollment number"
            />
            {errors.enrollmentNumber && (
              <p className="text-red-600 text-sm mt-1">
                {errors.enrollmentNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Mobile No.
            </label>
            <input
              type="tel"
              {...register("phoneNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message: "Mobile number must be 10 digits and start with 6-9",
                },
              })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
            />
            {errors.phoneNo && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#fff" loading={loading} size={20} />
                <span className="ml-3">Signing up...</span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
