import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const data = response.data;

      login({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        user: {
          username: data.username,
          role: data.role,
        },
      });

      if (data.role === "ADMIN") {
        navigate("/dashboard");
      } else if (data.role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c7d3e5] px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden bg-[#4652d9] lg:block">
          <div className="h-[390px] bg-[url('https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />

          <div className="px-12 py-12 text-white">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#4652d9]">
                H
              </div>
              <h2 className="text-2xl font-bold">HAPMS</h2>
            </div>

            <div className="border-l-4 border-white/80 bg-white/10 p-6">
              <p className="text-lg">Welcome to</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight">
                Hospital Appointment Management System
              </h1>
              <p className="mt-5 text-sm leading-6 text-white/85">
                Cloud based hospital appointment platform with centralized
                patient, doctor, appointment, report, and prescription
                management.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex min-h-[720px] items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4652d9] text-xl font-bold text-white">
                H
              </div>
              <h2 className="text-2xl font-bold text-[#4652d9]">HAPMS</h2>
            </div>

            <h1 className="text-3xl font-bold text-slate-800">Login</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#4652d9] focus:ring-4 focus:ring-[#4652d9]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#4652d9] focus:ring-4 focus:ring-[#4652d9]/10"
                />
              </div>

              {error ? (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#4652d9] px-4 py-3 font-semibold text-white shadow-lg shadow-[#4652d9]/25 transition hover:bg-[#3742c6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;