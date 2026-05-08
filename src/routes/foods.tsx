import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/foods")({
  component: () => <Navigate to="/fruits" replace />,
});
