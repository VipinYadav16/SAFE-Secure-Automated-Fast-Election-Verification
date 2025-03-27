
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { VerificationProvider } from "@/context/VerificationContext";
import Login from "./pages/Login";
import PollingStation from "./pages/PollingStation";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <VerificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/polling-station" element={<PollingStation />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/index" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </VerificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
