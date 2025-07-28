// app/creator/[creatorId]/page.tsx

// Define the props type explicitly
type CreatorPageProps = {
  params: {
    creatorId: string;
  };
};

// This is the simplest possible server component for this route
export default function CreatorPage({ params }: CreatorPageProps) {
  const { creatorId } = params;

  return (
    <div style={{ padding: '40px', color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      <h1>Creator Page</h1>
      <p>If you can see this, the page is working.</p>
      <p>The creator ID from the URL is: <strong>{creatorId}</strong></p>
    </div>
  );
}