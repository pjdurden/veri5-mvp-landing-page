"use client";

import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import yaml from "js-yaml";

export default function OpenAPIDocs() {
  const [swaggerSpec, setSwaggerSpec] = useState(null);

  useEffect(() => {
    const fetchYAML = async () => {
      try {
        const res = await fetch("/api-docs.yaml");
        const text = await res.text();
        const spec = yaml.load(text);
        setSwaggerSpec(spec);
      } catch (err) {
        console.error("Failed to load OpenAPI spec", err);
      }
    };

    fetchYAML();
  }, []);

  if (!swaggerSpec) return <p className="p-6">Loading API Documentation...</p>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">API Documentation</h1>
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
}
