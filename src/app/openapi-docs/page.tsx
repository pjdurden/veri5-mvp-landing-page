import SwaggerClientView from "components/SwaggerClientView";

export default function OpenAPIDocsPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">API Documentation</h1>
      <SwaggerClientView />
    </div>
  );
}
