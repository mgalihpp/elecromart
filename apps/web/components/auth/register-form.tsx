"use client";

import { Alert, AlertDescription } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { getBaseUrl } from "@repo/ui/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
      isValid:
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar &&
        isLongEnough,
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    // setTimeout(() => {
    //   setSuccess('Account created successfully! Redirecting to login...');
    //   setIsLoading(false);
    // }, 1500);

    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
      callbackURL: `${getBaseUrl()}/login`,
    });

    if (error) {
      setError(error.message!);
      setIsLoading(false);
      return;
    }

    if (data) {
      setSuccess(
        "Account created successfully! Please check your email to verify your account.",
      );
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
          <AlertDescription className="text-green-800 dark:text-green-200">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-sm font-medium text-foreground"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2 mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p className="text-xs font-medium text-foreground">
              Password Requirements:
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasUpperCase ? "bg-green-500" : "bg-slate-300"}`}
                >
                  {passwordValidation.hasUpperCase && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={
                    passwordValidation.hasUpperCase
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  Uppercase letter
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasLowerCase ? "bg-green-500" : "bg-slate-300"}`}
                >
                  {passwordValidation.hasLowerCase && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={
                    passwordValidation.hasLowerCase
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  Lowercase letter
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasNumbers ? "bg-green-500" : "bg-slate-300"}`}
                >
                  {passwordValidation.hasNumbers && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={
                    passwordValidation.hasNumbers
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  Number
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.hasSpecialChar ? "bg-green-500" : "bg-slate-300"}`}
                >
                  {passwordValidation.hasSpecialChar && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={
                    passwordValidation.hasSpecialChar
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  Special character (!@#$%^&*)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.isLongEnough ? "bg-green-500" : "bg-slate-300"}`}
                >
                  {passwordValidation.isLongEnough && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                <span
                  className={
                    passwordValidation.isLongEnough
                      ? "text-green-700 dark:text-green-300"
                      : "text-muted-foreground"
                  }
                >
                  At least 8 characters
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          disabled={isLoading}
          className="mt-1"
        />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I agree to the Terms of Service and Privacy Policy
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading || !agreeToTerms}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
