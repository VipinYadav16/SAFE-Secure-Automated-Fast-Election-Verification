
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AppLayout from "@/components/AppLayout";
import AdminPanel from "@/components/AdminPanel";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isAuthenticated, setOfficer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      toast.error("You must be logged in as an admin to access this page");
      navigate("/");
    }
  }, [isAuthenticated, navigate, setOfficer]);

  // Only render if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <AdminPanel />
    </AppLayout>
  );
};

export default AdminDashboard;
