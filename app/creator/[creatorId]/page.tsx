// import StreamView from "@/app/components/StreamView"

// export default function({
//     params :{
//         creatorId
//     } 
// }: {
//     params : {
//         creatorId : string,
//     }
// }) {
//     return <div>
//         <StreamView creatorId={creatorId}/>
//     </div>
// }

import StreamView from "@/app/components/StreamView";
import type { Metadata } from 'next'

// Define the expected shape of the props for Next.js 15+
// Note that `params` is now wrapped in a Promise.
type Props = {
  params: Promise<{ creatorId: string }>;
};

// Optional: Add generateMetadata using the new async params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Read route params by awaiting the promise
  const { creatorId } = await params;
 
  return {
    title: `Creator Stream | ${creatorId}`, // Example dynamic title
  }
}

// The component must be async to handle the new promise-based props
export default async function CreatorPage({
  params,
}: {
  // The `params` object is now a Promise
  params: Promise<{ creatorId: string }>;
}) {
  // We must await the promise to get the values
  const { creatorId } = await params;

  return (
    <div>
      <StreamView creatorId={creatorId} />
    </div>
  );
}
