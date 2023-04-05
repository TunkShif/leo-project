import { isFileSystemAccessAvailable } from "@/utilities/platform"
import { Just, Maybe, Nothing } from "purify-ts"

export type FileHandle = {
  file: File
  handle?: FileSystemFileHandle
}

const openFileFromFileSystem = async (): Promise<Maybe<FileHandle>> => {
  const options = {
    id: "importEpub",
    multiple: false,
    excludeAcceptAllOption: true,
    types: [
      {
        description: "Epub",
        startIn: "documents",
        accept: {
          "application/epub+zip": [".epub"]
        }
      }
    ]
  }

  try {
    const [handle] = await window.showOpenFilePicker(options)
    const file = await handle.getFile()
    return Just({ file, handle })
  } catch (e) {
    return Nothing
  }
}

// TODO: to be implemented
const openFileFromInput = async (): Promise<Maybe<FileHandle>> => {
  return new Promise((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.addEventListener("change", () => {
      const file = Maybe.fromNullable(input.files?.[0])
      resolve(file.map((file) => ({ file })))
    })
    input.click()
  })
}

export const open = () =>
  isFileSystemAccessAvailable() ? openFileFromFileSystem() : openFileFromInput()
