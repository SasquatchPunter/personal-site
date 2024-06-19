import type { InferSchemaValues } from "@sanity-typed/types";
import config from "@/sanity.config";

type Blog = InferSchemaValues<typeof config>;
