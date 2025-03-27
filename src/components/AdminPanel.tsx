
import React, { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Map, 
  ClipboardList, 
  Settings, 
  LogOut,
  CheckCircle,
  AlertCircle,
  ActivitySquare,
  Fingerprint,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const mockStats = {
  verifiedVoters: 387,
  pendingVerifications: 23,
  totalRegistered: 612,
  manualVerifications: 14,
  biometricSuccess: 348,
  facialSuccess: 321
};

const AdminPanel = () => {
  const { officer, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="col-span-1">
        <GlassCard className="sticky top-24 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-safe-primary">
                <span className="text-xl font-semibold">{officer?.name.charAt(0) || "P"}</span>
              </div>
              <div>
                <h3 className="font-medium">{officer?.name || "Polling Officer"}</h3>
                <p className="text-xs text-slate-500">{officer?.designation || "Officer"}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
              <Button 
                variant={activeTab === "voters" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("voters")}
              >
                <Users className="w-4 h-4" />
                Voters
              </Button>
              <Button 
                variant={activeTab === "stations" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("stations")}
              >
                <Map className="w-4 h-4" />
                Polling Stations
              </Button>
              <Button 
                variant={activeTab === "logs" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("logs")}
              >
                <ClipboardList className="w-4 h-4" />
                Verification Logs
              </Button>
              <Button 
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </nav>
            
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content */}
      <div className="col-span-1 md:col-span-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="voters">Voters</TabsTrigger>
            <TabsTrigger value="stations">Stations</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Verified Voters
                    </CardTitle>
                    <CardDescription>Total verified voters today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockStats.verifiedVoters}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {Math.round((mockStats.verifiedVoters / mockStats.totalRegistered) * 100)}% of registered voters
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      Registered Voters
                    </CardTitle>
                    <CardDescription>Total registered in this station</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockStats.totalRegistered}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {mockStats.totalRegistered - mockStats.verifiedVoters} remaining
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Manual Verifications
                    </CardTitle>
                    <CardDescription>Voters verified manually</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockStats.manualVerifications}</p>
                    <p className="text-xs text-amber-600 mt-1">
                      {Math.round((mockStats.manualVerifications / mockStats.verifiedVoters) * 100)}% of total verifications
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Verification Methods</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fingerprint className="w-5 h-5 text-indigo-500" />
                      Biometric Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold">{mockStats.biometricSuccess}</p>
                      <p className="text-lg font-semibold text-indigo-600">
                        {Math.round((mockStats.biometricSuccess / mockStats.verifiedVoters) * 100)}%
                      </p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-indigo-500 h-full rounded-full" 
                        style={{ width: `${Math.round((mockStats.biometricSuccess / mockStats.verifiedVoters) * 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="w-5 h-5 text-purple-500" />
                      Facial Recognition Success
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold">{mockStats.facialSuccess}</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {Math.round((mockStats.facialSuccess / mockStats.verifiedVoters) * 100)}%
                      </p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-full rounded-full" 
                        style={{ width: `${Math.round((mockStats.facialSuccess / mockStats.verifiedVoters) * 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ActivitySquare className="w-5 h-5 text-blue-500" />
                    Hourly Verification Activity
                  </CardTitle>
                  <CardDescription>Number of voters verified per hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {[35, 42, 67, 89, 75, 62, 48, 36, 24].map((value, index) => (
                      <div key={index} className="relative group flex flex-col items-center">
                        <div 
                          className="w-8 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-slate-500">{`${index + 8}:00`}</span>
                        <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {Math.round(value * 3.8)} voters
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="voters">
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-4">Voter Management</h2>
              <p className="text-slate-500 mb-6">This section will allow management of voter data and verification status.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm">Voter management functionality will be implemented in the next phase.</p>
              </div>
            </GlassCard>
          </TabsContent>
          
          <TabsContent value="stations">
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-4">Polling Stations</h2>
              <p className="text-slate-500 mb-6">This section will provide management of polling station data.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm">Polling station management functionality will be implemented in the next phase.</p>
              </div>
            </GlassCard>
          </TabsContent>
          
          <TabsContent value="logs">
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-4">Verification Logs</h2>
              <p className="text-slate-500 mb-6">This section will display verification activity logs for auditing.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm">Verification logging functionality will be implemented in the next phase.</p>
              </div>
            </GlassCard>
          </TabsContent>
          
          <TabsContent value="settings">
            <GlassCard>
              <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
              <p className="text-slate-500 mb-6">This section will provide system configuration options.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm">Settings functionality will be implemented in the next phase.</p>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
