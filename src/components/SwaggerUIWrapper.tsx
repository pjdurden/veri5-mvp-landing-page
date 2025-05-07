"use client";

import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import yaml from "js-yaml";
import "./styles/swagger-theme.css";


export default function SwaggerUIWrapper() {
  const [swaggerSpec, setSwaggerSpec] = useState(null);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const res = await fetch("/api-docs.yaml");
        const text = await res.text();
        const spec = yaml.load(text);
        setSwaggerSpec(spec);
      } catch (err) {
        console.error("Failed to load OpenAPI spec", err);
      }
    };

    fetchSpec();
  }, []);

  if (!swaggerSpec) return <p>Loading API docs…</p>;

  return (
    <SwaggerUI
      spec={swaggerSpec}
      docExpansion="none" // collapse all endpoints by default
      defaultModelsExpandDepth={-1} // hide schemas sidebar
      displayRequestDuration={true}
      showExtensions={true}
      showCommonExtensions={true}
    />
  );
}
