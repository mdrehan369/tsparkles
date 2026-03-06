"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { sendOtp, verifyOtpAndLogin } from "@/actions/auth";
import { OtpInput } from "../otp-input";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const { login, closeLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isOtpSent) {
        const { error } = await sendOtp(loginEmail);
        if (error) setError(error);
        else setIsOtpSent(true);
      } else {
        const { data, error } = await verifyOtpAndLogin(loginEmail, loginOtp);
        console.log(data);
        if (error || !data) setError(error);
        await login(loginEmail, data!.id, data!.cart);
        onClose();
        closeLogin();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Welcome</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              disabled={loading}
              className="border-gray-200 focus:border-purple-500"
            />
          </div>

          {isOtpSent && (
            <div className="space-y-2">
              <Label htmlFor="login-password">OTP</Label>
              <OtpInput onComplete={(otp) => setLoginOtp(otp)} />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isOtpSent ? "Login" : "Send OTP"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
