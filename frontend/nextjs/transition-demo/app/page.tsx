import { TransitionLink } from "@/components/transition/TransitionLink";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 items-center gap-16">
      <h1
        style={{
          viewTransitionName: "book-4090",
        }}
      >
        Next Demo
      </h1>
      <TransitionLink href="/book">To book List</TransitionLink>
      <TransitionLink href="/book/1">To book item</TransitionLink>
    </main>
  );
}
