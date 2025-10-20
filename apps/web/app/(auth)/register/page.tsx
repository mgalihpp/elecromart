import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import SocialLoginButtons from "@/components/auth/social-login-buttons";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-900 dark:to-emerald-950 p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full -ml-36 -mb-36"></div>

          {/* Logo/Brand */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">ElecroMart</h2>
            <p className="text-emerald-100">Join millions of happy shoppers</p>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <Image
              src="/happy-customer-shopping-online.jpg"
              alt="Happy customer illustration"
              width={400}
              height={400}
              className="drop-shadow-lg"
            />
          </div>

          {/* Benefits */}
          <div className="relative z-10 space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Exclusive Deals</p>
                <p className="text-emerald-100 text-sm">
                  Members-only discounts
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Easy Returns</p>
                <p className="text-emerald-100 text-sm">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Loyalty Rewards</p>
                <p className="text-emerald-100 text-sm">
                  Earn points on every purchase
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Join ShopHub and start shopping today
              </p>
            </div>

            {/* Register Card */}
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                  Create a new account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Register Form */}
                <RegisterForm />

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <SocialLoginButtons />

                {/* Footer Links */}
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </div>

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
