export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { serve } from "inngest/next";
import { inngest, syncUser, createUserOrder } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUser,
    createUserOrder
  ],
});