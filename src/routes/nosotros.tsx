import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nosotros")({
  beforeLoad: () => { throw redirect({ to: "/nuestra-empresa", statusCode: 301 }); },
});
