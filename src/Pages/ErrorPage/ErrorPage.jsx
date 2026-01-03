import { motion } from "framer-motion";
import { useNavigate, useRouteError } from "react-router";
import Swal from "sweetalert2";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    Swal.fire({
      title: "Redirecting",
      text: "Going back to home page",
      icon: "info",
      timer: 1200,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card bg-base-100 shadow-xl max-w-md w-full"
      >
        <div className="card-body text-center">
          <h1 className="text-7xl font-bold text-error">404</h1>

          <h2 className="text-2xl font-semibold mt-2">
            Something went wrong
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error?.statusText || error?.message || "Unexpected error occurred"}
          </p>

          <div className="card-actions justify-center mt-6">
            <button
              onClick={handleGoHome}
              className="btn btn-error btn-outline"
            >
              Go Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;