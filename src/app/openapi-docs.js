"use client";

import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import yaml from "js-yaml";

const OpenAPIDocs = () => {
  const [swaggerSpec, setSwaggerSpec] = useState(null);

  useEffect(() => {
    const fetchOpenAPIDocs = async () => {
      try {
        const response = await fetch("/api-docs.yaml"); // ✅ Correct path
        const yamlText = await response.text();
        const spec = yaml.load(yamlText);
        setSwaggerSpec(spec);
      } catch (error) {
        console.error("Error loading OpenAPI spec", error);
      }
    };

    fetchOpenAPIDocs();
  }, []);

  if (!swaggerSpec) {
    return <div className="text-center py-10">Loading API Documentation...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-blue-900 font-sans">
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-semibold mb-4">API Documentation</h1>
        <p className="text-lg text-blue-800 max-w-2xl mx-auto mb-8">
          View and explore the API documentation for real-time identity and payment verification.
        </p>
      </section>

      <div className="px-4 pb-10">
        <SwaggerUI spec={swaggerSpec} />
      </div>
    </div>
  );
};

export default OpenAPIDocs;
