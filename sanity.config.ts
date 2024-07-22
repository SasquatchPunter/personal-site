import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
// import { defineConfig } from "@sanity-typed/types";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { structure } from "./sanity/structure";

import Icon from "@/src/assets/icons/favicon.svg";

export default defineConfig({
  title: "JeremyElliott.dev",
  icon: Icon,
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
