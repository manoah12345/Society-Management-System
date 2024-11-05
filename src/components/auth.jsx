import { useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit
    setError(""); // Reset any previous error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // Handle different types of errors
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid Credentials.");
          break;
        default:
          setError("Login failed. Please try again.");
          console.log(error.code);
      }
    } finally {
      setLoading(false); // Set loading to false after attempt
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#E2E3E5]">
      <div
        className="bg-[#e0e0e0] p-8 rounded-[50px] shadow-lg w-full max-w-sm"
        style={{
          boxShadow: "12px 12px 28px #bababa, -12px -12px 28px #ffffff",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
          Login
        </h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}{" "}
        {/* Error message */}
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={logIn}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Logging in..." : "Login"} {/* Loading state */}
          </button>
          <Link
            to="/register"
            className="text-red-700 underline mt-4 block text-center"
          >
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};
