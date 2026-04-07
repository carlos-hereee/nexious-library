import Button from "@nxs-atoms/buttons/Button";

interface ErrorFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className="page-center flex-col" style={{ gap: "1rem", padding: "2rem" }}>
    <h2>Something went wrong</h2>
    <p>{(error as Error)?.message || "An unexpected error occurred."}</p>
    <Button label="Try again" onClick={resetErrorBoundary} />
  </div>
);

export default ErrorFallback;
