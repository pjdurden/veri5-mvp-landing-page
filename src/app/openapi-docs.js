"use client";

import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import yaml from "js-yaml";

const OpenAPIDocs = () => {
  const [swaggerSpec, setSwaggerSpec] = useState(null);

  // Fetch and parse the OpenAPI YAML file
  useEffect(() => {
    const fetchOpenAPIDocs = async () => {
      try {
        // Fetch the YAML file from public directory
        const response = await fetch("/openapi.yaml"); // Adjust path based on where your file is
        const yamlText = await response.text();

        // Parse YAML to JSON
        const spec = yaml.load(yamlText);
        setSwaggerSpec(spec); // Set the parsed spec
      } catch (error) {
        console.error("Error loading OpenAPI spec", error);
      }
    };

    fetchOpenAPIDocs();
  }, []);

  if (!swaggerSpec) {
    return <div>Loading API Documentation...</div>; // Loading indicator
  }

  return (
    <div className="min-h-screen bg-white text-blue-900 font-sans">
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-semibold mb-4">API Documentation</h1>
        <p className="text-lg text-blue-800 max-w-2xl mx-auto mb-8">
          View and explore the API documentation for real-time identity and payment verification.
        </p>
      </section>

      {/* Pass the parsed Swagger spec to Swagger UI */}
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
};

export default OpenAPIDocs;
