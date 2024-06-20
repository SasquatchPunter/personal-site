### [Sanity Typegen](#sanity-typegen)
Newer cli for Sanity has an experimental subcommand `typegen` for extracting types from the schema and from `groq` queries. That's used here for quickly parsing usable types.

To regenerate types for use in code, use the command `npm run build:sanity:types`. 
This overwrites old types, however, so care should be taken to maintain backwards compatibility when modifying the schema or groq queries.
