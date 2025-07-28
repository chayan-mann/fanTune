
import StreamView from "@/app/components/StreamView";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth"; 
import { redirect } from "next/navigation";
import { Appbar } from "../components/Appbar";
export default async function DashboardPage() {
    
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/api/auth/signin"); 
    }
    
    //Get the creator's ID from the session object.
    // The path might be `session.user.id`, `session.user.sub`, etc.,
    const creatorId = session.user.id; 

    if (!creatorId) {
        return <div>Error: Could not find user ID. Please log in again.</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            <Appbar/>
            <main className="pt-16 ">
              <StreamView creatorId={creatorId} />
            </main>
        </div>
    );
}