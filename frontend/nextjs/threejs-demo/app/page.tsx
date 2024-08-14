import Image from "next/image";
import { Suspense, use } from "react";

type MessagePromiseProp = {
  messagePromise: Promise<any[]>;
};

function Message({ messagePromise }: MessagePromiseProp) {
  const messageContent = use(messagePromise);
  return (
    <p>
      Here is the message: <div>{messageContent.map((item) => item.title)}</div>
    </p>
  );
}

function MessageContainer({ messagePromise }: MessagePromiseProp) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}

async function fetchMessage() {
  const response = await fetch("http://localhost:8080/book");
  return response.json();
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MessageContainer messagePromise={fetchMessage()} />
    </main>
  );
}
