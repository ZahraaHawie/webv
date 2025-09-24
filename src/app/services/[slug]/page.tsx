import { client } from '../../../sanity/lib/client'
import TransformationTemplateClient from './TransformationTemplateClient'

export default async function ServicesTemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const query = `*[_type == "transformationTemplate" && slug.current == $slug][0]`
  const doc = await client.fetch(query, { slug })
  if (!doc) return <div>Template not found for slug: {slug}</div>
  return <TransformationTemplateClient doc={doc} />
}



