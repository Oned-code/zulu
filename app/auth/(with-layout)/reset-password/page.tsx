import { ResetPasswordForm } from './reset-password-form';

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">
        Set New Password
      </h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">
        Enter your new password below.
      </p>
      <ResetPasswordForm />
    </>
  );
}
