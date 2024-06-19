import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
// import { defineConfig } from "@sanity-typed/types";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
    codeInput(),
  ],
});
