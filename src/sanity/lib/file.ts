import { dataset, projectId } from '../env'

// Build a Sanity CDN URL from a file asset ref when asset.url isn't expanded
export const urlForFile = (file: any): string | undefined => {
  if (!file) return undefined
  const directUrl = file?.asset?.url
  if (directUrl) return directUrl
  const ref: string | undefined = file?.asset?._ref || file?._ref
  if (!ref) return undefined
  
  // Handle file references like: file-2e568d68364a30988357f21bbd9bb08ea615bd3e-mp4
  const fileMatch = ref.match(/^file-([a-f0-9]+)-([a-z0-9]+)$/)
  if (fileMatch) {
    const [, id, ext] = fileMatch
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`
  }
  
  // Handle image references like: image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg
  const imageMatch = ref.match(/^image-([A-Za-z0-9]+)-([0-9x]+)-([a-z0-9]+)$/)
  if (imageMatch) {
    const [, id, dimensions, ext] = imageMatch
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}`
  }
  
  return undefined
}
