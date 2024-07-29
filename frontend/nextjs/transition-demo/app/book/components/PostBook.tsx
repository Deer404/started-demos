import { TransitionLink } from "nextjs-view-transition";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import { bookData } from "@/mock/book";
import { Book } from "@/types/book";

async function getBooks(): Promise<Book[]> {
  await sleep(1000);
  return bookData;
}

export default async function PostBook() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-y-2">
      {books.map((book, index) => (
        <TransitionLink
          href={`/book/${book.id}`}
          // href="/book/item"
          key={book.id}
        >
          <Card
            key={book.id}
            className="w-96"
            style={{ viewTransitionName: `book-${book.id}` }}
          >
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.description}</CardDescription>
            </CardHeader>
            <CardFooter>{book.author}</CardFooter>
          </Card>
        </TransitionLink>
      ))}
    </div>
  );
}
