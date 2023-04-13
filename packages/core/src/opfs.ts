const getRoot = () => navigator.storage.getDirectory()

const parsePath = (path: string) => path.split("/").filter((it) => it !== "")

const getDirectory = async (path: string) => {
  const root = await getRoot()
  const directories = parsePath(path)

  let traversed = root
  for (const directory of directories) {
    traversed = await traversed.getDirectoryHandle(directory, { create: true })
  }
  return traversed
}

const getFileHandle = async (path: string, create?: boolean) => {
  const parsed = parsePath(path)
  const directories = parsed.slice(0, parsed.length - 1)
  const file = parsed[parsed.length - 1]

  const directory = await getDirectory(directories.join("/"))
  const handle = await directory.getFileHandle(file, { create })
  return handle
}

const readFile = async (path: string) => {
  try {
    const handle = await getFileHandle(path)
    return await handle.getFile()
  } catch (e) {
    console.error(`[opfs] failed to read file '${path}', `, e)
    return null
  }
}

const writeFile = async (path: string, content: FileSystemWriteChunkType) => {
  const handle = await getFileHandle(path, true)

  const writer = await handle.createWritable()
  await writer.write(content)
  await writer.close()
}

export const OPFS = {
  getDirectory,
  readFile,
  writeFile
}
