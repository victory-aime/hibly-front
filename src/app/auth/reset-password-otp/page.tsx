import { Suspense } from 'react';
import { ResetPasswordOtp } from '../components/ResetPasswordOtp';

export default function ResetPasswordOtpPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordOtp />
    </Suspense>
  );
}
