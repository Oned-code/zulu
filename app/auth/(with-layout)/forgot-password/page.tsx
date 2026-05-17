import { ForgotPasswordForm } from './forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">
        Reset Your Password
      </h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
