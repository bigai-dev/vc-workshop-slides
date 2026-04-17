export default function ProjectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen w-full">
      {children}
    </div>
  );
}
