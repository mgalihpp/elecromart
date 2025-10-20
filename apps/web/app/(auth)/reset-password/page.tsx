import { Suspense } from "react";
import ResetPasswordContent from "./_components/reset-password-content";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
