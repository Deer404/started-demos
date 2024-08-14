import {
  createRootRoute,
  Link,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
