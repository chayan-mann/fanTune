import StreamView from "@/app/components/StreamView";

interface PageProps {
  params: {
    creatorId: string;
  };
}

export default function CreatorPage({ params }: PageProps) {
  return (
    <div>
      <StreamView creatorId={params.creatorId} />
    </div>
  );
}
