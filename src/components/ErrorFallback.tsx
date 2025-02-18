import React from "react";
import { FallbackProps } from "react-error-boundary";

const getErrorMessage = (error: Error) => {
  switch (error.name) {
    case "APIError":
      return {
        title: "API Error",
        description: error.message,
      };
    case "NetworkError":
      return {
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
      };
    case "ValidationError":
      return {
        title: "Data Error",
        description:
          "We received invalid data from our servers. Please try again later.",
      };
    default:
      return {
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
      };
  }
};

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const errorMessage = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {errorMessage.title}
        </h2>
        <p className="text-gray-600 mb-4">{errorMessage.description}</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
