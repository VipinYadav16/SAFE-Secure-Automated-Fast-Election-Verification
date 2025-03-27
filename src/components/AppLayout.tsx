
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const AppLayout = ({ children, className }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 mb-2 sm:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-safe-primary text-white p-2 rounded-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V16L12 21L21 16V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-safe-primary">SAFE</h1>
              <p className="text-xs text-slate-500">Secure Automated Fast Election-verification</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center sm:text-right"
          >
          </motion.div>
        </div>
      </header>
      <main className={cn("flex-1 container mx-auto px-4 py-4 sm:py-8", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vipin Yadav</p>
          <p className="mt-1">SAFE (Secure Automated Fast Election-verification) System v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
