
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import AppLayout from "@/components/AppLayout";
import GlassCard from "@/components/GlassCard";
import { pollingStations } from "@/utils/mockData";

const PollingStation = () => {
  const navigate = useNavigate();
  const { officer, setPollingStation, logout } = useAuth();
  const [selectedStationId, setSelectedStationId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!officer) {
    navigate("/");
    return null;
  }

  const handleStationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStationId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStationId) {
      toast.error("Please select a polling station");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const station = pollingStations.find(s => s.id === selectedStationId);
      
      if (station) {
        setPollingStation(station);
        toast.success("Polling station selected successfully");
        navigate("/verification");
      } else {
        toast.error("Invalid polling station selected");
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold">Select Polling Station</h1>
          <p className="text-slate-500">Welcome, {officer.name} ({officer.designation})</p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 hover:text-red-700 text-sm"
          onClick={logout}
        >
          Logout
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-6">
                <div className="bg-safe-primary text-white p-2 rounded-full mr-3">
                  <Building className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-medium">Polling Station Selection</h2>
              </div>

              <div className="mb-6">
                <label htmlFor="station" className="block text-sm font-medium text-gray-700 mb-1">
                  Select your assigned polling station
                </label>
                <select
                  id="station"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStationId}
                  onChange={handleStationSelect}
                  required
                >
                  <option value="">-- Select a polling station --</option>
                  {pollingStations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}, {station.constituency}
                    </option>
                  ))}
                </select>
              </div>

              {selectedStationId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100"
                >
                  {(() => {
                    const station = pollingStations.find(s => s.id === selectedStationId);
                    if (!station) return null;
                    
                    return (
                      <>
                        <h3 className="font-medium mb-2">{station.name}</h3>
                        <div className="text-sm text-slate-500 space-y-1">
                          <p className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {station.address}
                          </p>
                          <p>Constituency: {station.constituency}</p>
                          <p>District: {station.district}</p>
                          <p>State: {station.state}</p>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-safe-primary hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                disabled={isSubmitting || !selectedStationId}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Confirm Selection <Check className="ml-2 w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="h-full flex flex-col">
            <div className="flex items-center mb-6">
              <div className="bg-safe-secondary text-safe-primary p-2 rounded-full mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className="text-xl font-medium">Today's Session</h2>
            </div>

            <div className="mb-6 text-sm">
              <p className="font-medium mb-1">Current Date:</p>
              <p className="text-slate-500 mb-3">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <p className="font-medium mb-1">Session Start Time:</p>
              <p className="text-slate-500 mb-3">7:00 AM IST</p>
              
              <p className="font-medium mb-1">Session End Time:</p>
              <p className="text-slate-500 mb-3">6:00 PM IST</p>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Total Voters Expected:</span>
                <span className="font-medium">1,254</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-slate-500">Votes Cast (Demo):</span>
                <span className="font-medium">327</span>
              </div>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                <div className="bg-safe-primary h-2 rounded-full" style={{ width: '26%' }}></div>
              </div>
              <p className="text-xs text-right mt-1 text-slate-500">26% Complete</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default PollingStation;
