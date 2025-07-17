// components/ui/chart.jsx
import React from "react";

export function ChartContainer({ children }) {
  return (
    <div style={{ padding: "1rem", backgroundColor: "#fff", borderRadius: "8px" }}>
      {children}
    </div>
  );
}

export function ChartTooltip({ children }) {
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", padding: "0.5rem", borderRadius: "4px" }}>
      {children}
    </div>
  );
}

export function ChartTooltipContent({ content }) {
  return <div>{content}</div>;
}
