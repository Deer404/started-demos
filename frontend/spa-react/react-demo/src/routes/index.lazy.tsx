import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <h3>Welcome Home!</h3>
    </div>
  );
}
