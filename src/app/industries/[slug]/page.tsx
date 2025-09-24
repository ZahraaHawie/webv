import { client } from '../../../sanity/lib/client'
import IndustriesArticleClient from './IndustriesArticleClient'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  tag: string
  writer: string
  publishedAt: string
  mainImage: any
  paragraph1?: any[]
  image1?: any
  video1?: string
  paragraph2?: any[]
  image2?: any
  video2?: string
  paragraph3?: any[]
  image3?: any
  video3?: string
  paragraph4?: any[]
  image4?: any
  video4?: string
  paragraph5?: any[]
  image5?: any
  video5?: string
  paragraph6?: any[]
  image6?: any
  video6?: string
  paragraph7?: any[]
  image7?: any
  video7?: string
  secondTitle?: string
  keyTakeaways?: string[]
  bottomImage?: any
}

export default async function IndustryArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const query = `*[_type == "industryPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tag,
    writer,
    publishedAt,
    mainImage,
    paragraph1,
    image1,
    video1,
    paragraph2,
    image2,
    video2,
    paragraph3,
    image3,
    video3,
    paragraph4,
    image4,
    video4,
    paragraph5,
    image5,
    video5,
    paragraph6,
    image6,
    video6,
    paragraph7,
    image7,
    video7,
    secondTitle,
    keyTakeaways,
    bottomImage
  }`

  const post: Post = await client.fetch(query, { slug })

  if (!post) {
    return <div>Industry post not found for slug: {slug}</div>
  }

  return <IndustriesArticleClient post={post} />
}


