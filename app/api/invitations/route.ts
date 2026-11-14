import { env } from "cloudflare:workers";
import { handleInvitations } from "../../../services/invitations.mjs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
 const origin=request.headers.get("Origin");
 if(origin && origin!==new URL(request.url).origin)return Response.json({error:"Cette demande ne provient pas de l’invitation."},{status:403});
 return handleInvitations(request,env,{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"});
}
