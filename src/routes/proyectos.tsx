import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/proyectos")({
  staticData: { sitemap: false },
  beforeLoad: () => { throw redirect({ to: "/", statusCode: 301 }); },
});
