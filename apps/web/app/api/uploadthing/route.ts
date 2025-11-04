import { getBaseUrl } from "@repo/ui/lib/utils";
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  config: {
    logLevel: "Debug",
    callbackUrl: `${getBaseUrl()}/api/uploadthing`,
    isDev: process.env.NODE_ENV === "development",
  },
});
