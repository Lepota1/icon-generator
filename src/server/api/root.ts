import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { generateRouter } from "~/server/api/routers/generate";

/**
 * This is the primary router for your server.
@@ -8,6 +9,7 @@ import { exampleRouter } from "~/server/api/routers/example";
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  generate: generateRouter,
});
