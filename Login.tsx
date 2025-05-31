import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Feather } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      className="min-h-screen flex bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Left panel - HR Content */}
      <div className="hidden md:flex md:w-1/2 bg-white bg-opacity-90 p-10 shadow-lg relative z-10 flex-col justify-center">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-400 text-white shadow">
              <Feather className="w-6 h-6" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-purple-600">Radha Sharma</h1>
              <p className="text-sm text-gray-600">Streamline Simplify Success</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Transform Your HR Operations
          </h2>

          <p className="text-gray-700 mb-8">
            Our platform provides a comprehensive suite of tools to manage your
            organization's human resources efficiently. From onboarding to
            performance management, we've got you covered.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-purple-700 mb-2">Employee Management</h3>
              <p className="text-sm text-gray-600">Manage your workforce with ease and efficiency.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700 mb-2">Time Tracking</h3>
              <p className="text-sm text-gray-600">Monitor attendance and optimize productivity.</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-green-700 mb-2">Leave Management</h3>
              <p className="text-sm text-gray-600">Streamline leave requests and approvals.</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-orange-700 mb-2">Performance Reviews</h3>
              <p className="text-sm text-gray-600">Assess and improve employee performance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8 space-x-4">
            <div className="bg-purple-300 rounded-full p-3 shadow-lg">
              <Feather className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold ">Radha Sharma</h1>
              <p className="mt-1 font-semibold">
                Streamline Simplify Success
              </p>
            </div>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9 0-1.196.278-2.328.774-3.343M6.343 6.343a9.993 9.993 0 0113.314 0m-1.414 1.414a7.972 7.972 0 00-11.314 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c1.25 0 2.44.28 3.53.78M15 15.2a5.999 5.999 0 006.464 1.713M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 select-none"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold rounded-md transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don’t have an account? Contact your administrator.
          </p>


        </div>
      </div>
    </div>
  );
}
