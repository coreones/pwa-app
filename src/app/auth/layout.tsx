export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full max-w-3xl mx-auto relative">
      <div className="h-full w-full overflow-y-scroll">{children}</div>
    </div>
  );
}
