
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import GlassCard from "@/components/GlassCard";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <GlassCard>
          <div className="mb-6">
            <div className="bg-red-50 text-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
          <p className="text-slate-500 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>
          
          <button
            className="bg-safe-primary hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors inline-flex items-center"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </GlassCard>
      </motion.div>
    </AppLayout>
  );
};

export default NotFound;
