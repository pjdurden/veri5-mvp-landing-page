"use client";

import dynamic from "next/dynamic";

// Dynamically import SwaggerUIWrapper with SSR disabled
const SwaggerUIWrapper = dynamic(() => import("./SwaggerUIWrapper"), {
  ssr: false,
});

export default function SwaggerClientView() {
  return <SwaggerUIWrapper />;
}
