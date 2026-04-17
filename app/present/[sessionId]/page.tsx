import { notFound } from "next/navigation";
import { SESSIONS } from "@/data/workshop";
import { PresenterClient } from "@/components/presenter/PresenterClient";

export default async function PresentPage({
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
  // key forces a full remount on session change so useState initializers re-run
  // with the fresh `initialAt` prop. Without the key, React reuses the instance
  // and the initializer is stuck with whatever the first session passed.
  return (
    <PresenterClient
      key={session.id}
      session={session}
      initialAt={at ?? null}
    />
  );
}
