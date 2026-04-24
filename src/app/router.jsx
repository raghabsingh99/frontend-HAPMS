import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../component/layout/DashboardLayout';
import LoginPage from '../pages/auth/LoginPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import DoctorDashboardPage from '../pages/dashboard/DoctorDashboardPage';
import PatientPage from '../pages/patients/PatientPage';
import Appointmentpage from '../pages/appointments/Appointmentpage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import DoctorSlotsPage from '../features/slots/DoctorSlotsPage';
import ScheduleGeneratorPage from '../features/slots/ScheduleGeneratorPage';
import BookAppointmentPage from "../pages/appointments/BookAppointmentPage";
 

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RoleRouter({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function DashboardRedirect() {
  const { user } = useAuth();

  if (user?.role === "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  if (user?.role === "DOCTOR") {
    return <Navigate to="/doctor-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />
      },
      {
        path: "dashboard",
        element: (
          <RoleRouter allowedRoles={["ADMIN"]}>
            <AdminDashboardPage />
          </RoleRouter>
        ),
      },
      {
        path: "doctor-dashboard",
        element: (
          <RoleRouter allowedRoles={["DOCTOR"]}>
            <DoctorDashboardPage />
          </RoleRouter>
        ),
      },
      {
        path: "patients",
        element: (
          <RoleRouter allowedRoles={["ADMIN", "DOCTOR"]}>
            <PatientPage />
          </RoleRouter>
        ),
      },
      {
        path: "appointments",
        element: (
          <RoleRouter allowedRoles={["ADMIN", "DOCTOR"]}>
            <Appointmentpage />
          </RoleRouter>
        ),
      },
      {
        path: "slots",
        element: (
          <RoleRouter allowedRoles={["ADMIN", "DOCTOR"]}>
            <DoctorSlotsPage />
          </RoleRouter>
        ),
      },
      {
        path: "schedule-generator",
        element: (
          <RoleRouter allowedRoles={["ADMIN", "DOCTOR"]}>
            <ScheduleGeneratorPage />
          </RoleRouter>
        ),
        },
        {
          path: "appointments/book",
          element: (
            <RoleRouter allowedRoles={["ADMIN", "DOCTOR"]}>
              <BookAppointmentPage />
            </RoleRouter>
          ),
        },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
]);

export default router;