import { Suspense } from "react";
import PostBook from "./components/PostBook";
import SkeletonLoader from "./components/SkeletonCard";
import { TransitionLink } from "nextjs-view-transition";
export default async function BooksPage() {
  return (
    <main className="flex flex-col items-center min-h-screen py-10 gap-y-10">
      <TransitionLink href="/" className=" self-start p-5">
        {"<<"}
      </TransitionLink>
      <h1
        style={{
          viewTransitionName: "book-4090",
        }}
      >
        Books
      </h1>

      <Suspense fallback={<SkeletonLoader />}>
        <PostBook />
      </Suspense>
    </main>
  );
}
