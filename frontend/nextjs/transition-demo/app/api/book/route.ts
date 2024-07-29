import { sleep } from "@/lib/utils";
import { bookData } from "@/mock/book";

export async function GET(request: Request): Promise<Response> {
  await sleep(1000);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const book = bookData.find((book) => book.id === Number(id));
  return Response.json(book);
}
