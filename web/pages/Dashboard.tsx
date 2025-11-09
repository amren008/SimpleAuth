import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../src/hooks/useAuth";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, error } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [tokenExpiry, setTokenExpiry] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryDate = new Date(payload.exp * 1000);
        setTokenExpiry(expiryDate.toLocaleString());
      } catch {
        setTokenExpiry("Unable to decode");
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load user data</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const user = userData.user;
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const daysSinceMember = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your account overview and session information
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-900 text-white flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoItem label="Email Address" value={user.email} />
              <InfoItem label="Username" value={user.username} />
              <InfoItem label="Member Since" value={memberSince} />
              <InfoItem
                label="Account Status"
                value="Active"
                valueColor="text-green-600"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <StatCard
              icon="📅"
              label="Days Active"
              value={daysSinceMember.toString()}
              color="bg-blue-50"
            />
            <StatCard
              icon="🔐"
              label="Auth Method"
              value="JWT"
              color="bg-green-50"
            />
            <StatCard
              icon="✅"
              label="Verified"
              value="Yes"
              color="bg-purple-50"
            />
          </div>
        </div>

        {/* Session Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Session Information
            </h3>
            <div className="space-y-3">
              <InfoRow label="Session Type" value="JWT Token" />
              <InfoRow label="Token Expiry" value={tokenExpiry} />
              <InfoRow label="Security" value="httpOnly Cookie" />
              <InfoRow
                label="Authentication"
                value="Bcrypt Hashed Password"
              />
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Features
            </h3>
            <div className="space-y-3">
              <SecurityItem
                icon="✓"
                label="Password Hashing"
                status="Enabled"
                color="text-green-600"
              />
              <SecurityItem
                icon="✓"
                label="Protected Routes"
                status="Active"
                color="text-green-600"
              />
              <SecurityItem
                icon="✓"
                label="CORS Protection"
                status="Configured"
                color="text-green-600"
              />
              <SecurityItem
                icon="✓"
                label="Input Validation"
                status="Active"
                color="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Tech Info Banner */}
        <div className="bg-gray-900 text-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Authentication System Details
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Backend</p>
              <p className="font-medium">Express + TypeScript</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Database</p>
              <p className="font-medium">PostgreSQL</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Token Type</p>
              <p className="font-medium">JWT (3h expiry)</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Validation</p>
              <p className="font-medium">Zod Schema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  valueColor?: string;
}

const InfoItem = ({ label, value, valueColor = "text-gray-900" }: InfoItemProps) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`font-medium ${valueColor}`}>{value}</p>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  return (
    <div className={`${color} p-4 border border-gray-200`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
};

interface SecurityItemProps {
  icon: string;
  label: string;
  status: string;
  color: string;
}

const SecurityItem = ({ icon, label, status, color }: SecurityItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        <span className={`${color} font-bold`}>{icon}</span>
        <span className="text-sm text-gray-900">{label}</span>
      </div>
      <span className={`text-sm font-medium ${color}`}>{status}</span>
    </div>
  );
};

export default Dashboard;