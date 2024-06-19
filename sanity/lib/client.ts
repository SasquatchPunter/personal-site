import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn, prod } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: prod ? "published" : "previewDrafts",
});
