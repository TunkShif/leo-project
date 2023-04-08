import { isFileSystemAccessAvailable } from "@/utilities/platform"

const openFileFromFileSystem = async (): Promise<FileSystemFileHandle | null> => {
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
    return handle
  } catch {
    return null
  }
}

// TODO: file type striction
const openFileFromInput = async (): Promise<File | null> => {
  return new Promise((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.addEventListener("change", () => {
      resolve(input.files?.[0] ?? null)
    })
    input.click()
  })
}

const open = (): Promise<File | FileSystemFileHandle | null> =>
  isFileSystemAccessAvailable() ? openFileFromFileSystem() : openFileFromInput()

export const FilePicker = {
  open
}
