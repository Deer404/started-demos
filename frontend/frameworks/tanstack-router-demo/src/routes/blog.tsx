import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: BlogComponent,
});

function BlogComponent() {
  return <div>Hello "/blog"!</div>;
}
