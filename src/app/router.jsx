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


function ProtectedRoute({children}){
    const { isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return <Navigate to ="/login" replace />

    }
    return children;
}

function RoleRouter({children, allowedRoles}){
    const { user} = useAuth();

    if(!user){
         return <Navigate to ="/login" replace />;
    }

    if(!allowedRoles.includes(user.role)){
         return <Navigate to ="/unauthorized" replace />;
    }
    return children;
}

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>
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
                element:(
                    <RoleRouter allowedRoles={["ADMIN","DOCTOR"]}>
                        <PatientPage />
                    </RoleRouter>
                ),
            },
            {
                path: "appointments",
                element: (
                    <RoleRouter allowedRoles={["ADMIN","DOCTOR"]}>
                        <Appointmentpage />
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

 

export default router