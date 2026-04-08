import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentFilePath = path.resolve(__dirname, '../../data/content.json')

const readContent = async () => {
  const raw = await fs.readFile(contentFilePath, 'utf8')
  return JSON.parse(raw)
}

const writeContent = async (content) => {
  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf8')
}

export const getContent = async () => {
  return readContent()
}

export const updateContentSection = async (section, value) => {
  const content = await readContent()
  content[section] = value
  await writeContent(content)
  return content
}
