import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "WIAL Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});
