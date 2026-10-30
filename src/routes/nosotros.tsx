import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nosotros")({
  staticData: { sitemap: false },
  beforeLoad: () => { throw redirect({ to: "/nuestra-empresa", statusCode: 301 }); },
});
