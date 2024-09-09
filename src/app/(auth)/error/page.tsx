"use client";

import { useSearchParams, useRouter } from "next/navigation";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-md rounded-lg bg-background-card p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Authentication Error
        </h2>
        <p className="mb-6 text-text-primary">
          {errorMessage || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={handleGoBack}
          className="rounded-md bg-primary px-4 py-2 text-white shadow transition hover:bg-primary-dark"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
