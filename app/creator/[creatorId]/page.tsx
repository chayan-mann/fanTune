import StreamView from "@/app/components/StreamView";

export const dynamic = 'force-dynamic'; // Optional but fine

export default function CreatorPage({
  params,
}: {
  params: { creatorId: string };
}) {
  return (
    <div>
      <StreamView creatorId={params.creatorId} />
    </div>
  );
}
