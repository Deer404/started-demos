import { TransitionLink } from "nextjs-view-transition";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";

const getBook = async (id: string): Promise<Book> => {
  const response = await fetch(`http://localhost:3000/api/book?id=${id}`);
  return await response.json();
};

export default async function BookItemPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBook(params.id);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <TransitionLink href="/book" className=" self-start p-5">
        {"<<"}
      </TransitionLink>
      <a>
        <Card
          className="w-[500px] h-[500px] p-10"
          style={{ viewTransitionName: `book-${book.id}` }}
        >
          <CardTitle>{book.title}</CardTitle>
          <CardContent>{book.description}</CardContent>
          <CardFooter>{book.author}</CardFooter>
        </Card>
      </a>
    </div>
  );
}
