import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Fingerprint, ArrowRight, User, IdCard } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import AppLayout from "@/components/AppLayout";
import GlassCard from "@/components/GlassCard";
import BiometricScanner from "@/components/BiometricScanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type FormValues = {
  officerId: string;
  officerName: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setOfficer } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      officerId: "",
      officerName: "",
    },
  });

  const handleSubmitForm = (data: FormValues) => {
    handleSuccessfulAuth(data.officerId, data.officerName);
  };

  const handleSuccessfulAuth = (officerId: string, officerName: string) => {
    toast.success("Authentication successful");
    setOfficer({
      id: officerId,
      name: officerName,
      designation: "Polling Officer", // Default designation
    });
    navigate("/polling-station");
  };

  const handleBiometricComplete = async (success: boolean) => {
    setIsAuthenticating(true);

    try {
      // Get values from the form
      const values = form.getValues();

      handleSuccessfulAuth(values.officerId, values.officerName);
    } catch (error) {
      toast.error("An error occurred during authentication");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AppLayout className="flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-safe-primary text-white p-3 rounded-full">
              <Fingerprint className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-2">Polling Officer Login</h1>
          <p className="text-slate-500 mb-8">
            Authenticate using your credentials to access the SAFE system
          </p>

          {!showBiometric ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitForm)}
                className="space-y-4 text-left"
              >
                <FormField
                  control={form.control}
                  name="officerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <IdCard className="w-4 h-4" /> Officer ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your officer ID"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Officer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-safe-primary hover:bg-blue-700"
                >
                  Login
                </Button>
              </form>
            </Form>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <BiometricScanner
                  onComplete={handleBiometricComplete}
                  simulatedResult={true} // Always succeed in demo
                />
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Place your finger on the scanner to verify your identity
              </p>
              <Button
                variant="outline"
                onClick={() => setShowBiometric(false)}
                className="mt-2"
              >
                Back to Credentials
              </Button>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2">
              SAFE (Secure Automated Fast Election-verification) System
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </AppLayout>
  );
};

export default Login;
