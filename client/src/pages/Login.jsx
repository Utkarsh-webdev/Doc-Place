import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h1>

          <p className="text-gray-500 mt-2">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an
            appointment
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#5F6FFF]"
              required
            />
          </div>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#5F6FFF]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#5F6FFF]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5F6FFF] hover:bg-[#4d5cf5] text-white py-3 rounded-lg font-medium transition-all duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="mt-6 text-center">
          {state === "Sign Up" ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;