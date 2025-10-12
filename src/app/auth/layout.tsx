export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container min-h-screen">
      <div className="h-full w-full overflow-y-scroll">
        {children}</div>
    </div>
  );
}
