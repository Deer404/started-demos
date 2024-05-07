
export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="p-4">
            <h1>Test</h1>
            {children}
        </section>
    );
}