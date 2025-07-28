import StreamView from "@/app/components/StreamView";

// Define the expected shape of the props for this page
type CreatorPageProps = {
  params: {
    creatorId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CreatorPage({ params }: CreatorPageProps) {
  const { creatorId } = params;

  // You can add a check here in case the ID is missing for some reason
  if (!creatorId) {
    return <div>Loading creator...</div>;
  }

  return (
    <div>
      <StreamView creatorId={creatorId} />
    </div>
  );
}