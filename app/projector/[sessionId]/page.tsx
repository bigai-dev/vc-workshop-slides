import { notFound } from "next/navigation";
import { SESSIONS } from "@/data/workshop";
import { ProjectorClient } from "@/components/projector/ProjectorClient";

export default async function ProjectorPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ at?: string }>;
}) {
  const { sessionId } = await params;
  const { at } = await searchParams;
  const session = SESSIONS.find((s) => String(s.id) === sessionId);
  if (!session) notFound();
  return (
    <ProjectorClient
      key={session.id}
      session={session}
      initialAt={at ?? null}
    />
  );
}
