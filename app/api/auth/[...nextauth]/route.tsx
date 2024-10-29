import { authOptions } from "@/app/lib/authOptions";
import NextAuth, { AuthOptions } from "next-auth";


// Default export NextAuth with the options
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
