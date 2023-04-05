import type { DataType } from "@/utilities/typing"
import type { Book } from "epubjs"
import Epub from "epubjs"
import { Maybe, MaybeAsync } from "purify-ts"
import { match } from "ts-pattern"

type Source = DataType<{
  binary: { binary: ArrayBuffer }
  url: { url: string }
}>

export const open = (source: Source) =>
  match(source)
    .with({ type: "binary" }, ({ binary }) => {
      const epub = Epub()
      epub.open(binary, "binary")
      return epub
    })
    .with({ type: "url" }, ({ url }) => Epub(url))
    .exhaustive()

export const cover = (book: Book) =>
  MaybeAsync(async ({ liftMaybe }) => {
    const url = await liftMaybe(Maybe.fromNullable(await book.coverUrl()))
    const response = await fetch(url)
    return await response.blob()
  }).run()
