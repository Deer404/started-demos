import {
  Link,
  createLazyFileRoute,
  useElementScrollRestoration,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createLazyFileRoute("/about")({
  component: function About() {
    const [count, setCount] = useState(0);
    const scrollRestorationId = "myVirtualizedContent";
    const ref = useRef<HTMLDivElement>(null);
    // We use that ID to get the scroll entry for this element
    const scrollEntry = useElementScrollRestoration({
      id: scrollRestorationId,
    });

    useEffect(() => {
      console.log("scrollEntry", scrollEntry);
      if (scrollEntry) {
        ref.current!.scrollTop = scrollEntry.scrollY;
      }
    }, [scrollEntry]);

    return (
      <div className="p-2" style={{}}>
        <h3>About</h3>
        <p>
          This is a lazy-loaded route. It will only be loaded when the user
          navigates to it.
        </p>
        <p>
          <button onClick={() => setCount((c) => c + 1)}>Click me</button>
          <span> Clicked {count} times.</span>
        </p>
        <div
          data-scroll-restoration-id={scrollRestorationId}
          ref={ref}
          style={{ height: "100px", overflow: "scroll" }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </div>
        <span>111</span>
        <Link
          to="/"
          className="[&.active]:font-bold"
          style={{ padding: "30px" }}
        >
          Home
        </Link>
      </div>
    );
  },
});
