import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { bookData } from "@/mock/book";

export default function ItemPage() {
  const book = bookData[0];
  return (
    <div className="min-h-screen flex flex-col justify-center items-center book">
      <Card className="w-[500px] h-[500px] p-10">
        <CardTitle>{book.title}</CardTitle>
        <CardContent>{book.description}</CardContent>
        <CardFooter>{book.author}</CardFooter>
      </Card>
    </div>
  );
}
