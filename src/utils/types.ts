/** Creates a union of types of properties selected from another type. */
export type PickUnion<T, K extends keyof T> = T[K];
