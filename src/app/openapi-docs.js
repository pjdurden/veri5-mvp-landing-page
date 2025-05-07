import { useEffect, useState } from "react";
import SwaggerClientView from "components/SwaggerClientView";
import Loader from "components/Loader";  // Import the loader

export default function OpenAPIDocsPage() {
  const [isLoading, setIsLoading] = useState(true);  // State for loading

  useEffect(() => {
    // Simulate loading time and set isLoading to false when done
    const timer = setTimeout(() => {
      setIsLoading(false);  // Hide loader after content is loaded
    }, 2000);  // Adjust timeout as needed (for now 2 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">API Documentation</h1>

      {/* Show loader if still loading */}
      {isLoading ? <Loader /> : <SwaggerClientView />}
    </div>
  );
}
