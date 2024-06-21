import { createClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  prod,
  readToken,
} from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: prod ? undefined : readToken,
  perspective: prod ? "published" : "previewDrafts",
});
