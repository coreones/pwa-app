import DeviceRestriction from "@/components/DeviceRestriction";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DeviceRestriction>
      <div className="container min-h-screen">
        <div className="h-full w-full overflow-y-scroll">
          {children}</div>
      </div>
    </DeviceRestriction>
  );
}
