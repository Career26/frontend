type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T];

export type MappedArrayValue<T> = Extract<ArrayKeys<T>, string> extends keyof T
  ? T[Extract<ArrayKeys<T>, string>]
  : unknown;

export type FormFieldWithArray<T> = Extract<ArrayKeys<T>, string>;
