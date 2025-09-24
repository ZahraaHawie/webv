import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// your env helper (yours already exists)
import {apiVersion, dataset, projectId} from '../env'  // keep this path as-is if it works

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// -------- image helper (needed by next/image) ----------
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
