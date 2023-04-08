export type DataType<Definition extends Record<string, unknown>> = {
  [Variant in keyof Definition]: Definition[Variant] & { type: Variant }
}[keyof Definition]

export type VariantOf<
  DataType extends { type: string },
  Variant extends string
> = DataType extends { type: Variant } ? Omit<DataType, "type"> : never
