"use client";

import { Alert, AlertDescription } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { getBaseUrl } from "@repo/ui/lib/utils";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    // setTimeout(() => {
    //   setSuccess(true);
    //   setIsLoading(false);
    // }, 1500);

    const { data, error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${getBaseUrl()}/reset-password`,
    });

    if (error) {
      setError(error.message!);
      setIsLoading(false);
      return;
    }

    if (data) {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center">
        {/* Help Section */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg text-start">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 text-sm">
            Didn't receive an email?
          </h3>
          <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Try again in a few minutes</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2">
            Check Your Email
          </h3>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          The link will expire in 24 hours. If you don't see the email, check
          your spam folder.
        </p>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setSuccess(false);
            setEmail("");
          }}
        >
          Try Another Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter the email address associated with your account
        </p>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>
  );
}
