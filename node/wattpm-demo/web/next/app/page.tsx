export default async function Home() {
  const { content } = await (
    await fetch("http://node.plt.local", { cache: "no-store" })
  ).json();
  return (
    <div>
      <main>${content}</main>
    </div>
  );
}
