/** Union of types from a selected member. */
export type PickUnion<T, K extends keyof T> = T[K];

/** Awaited return type. */
export type AwaitedReturn<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

/** NonNullable type alias */
export type NN<T> = NonNullable<T>;
