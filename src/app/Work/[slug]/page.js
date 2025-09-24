import WorkTemplate from '../work-template/page'
import { client } from '../../../sanity/lib/client'
import { PortableTextComponent } from '../../../sanity/lib/portableText'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function WorkDetailPage({ params }) {
  const { slug } = params || {}

  const query = `*[_type == "workTemplate" && slug.current == $slug][0]{
    introParagraph1,
    introParagraph2,
    introParagraph3,
    introSectionVideoUrl,
    firstComponentLeftTitle,
    firstComponentLeftLongTitle,
    firstComponentRightTitle1,
    firstComponentRightParagraph1,
    firstComponentRightTitle2,
    firstComponentRightParagraph2,
    firstComponentRightTitle3,
    firstComponentRightParagraph3,
    mediaGroup1VideoUrl,
    mediaGroup1ImageUrl,
    mediaGroup1LeftImageUrl,
    mediaGroup1RightImageUrl,
    secondComponentLeftTitle,
    secondComponentLeftLongTitle,
    secondComponentRightTitle1,
    secondComponentRightParagraph1,
    secondComponentRightTitle2,
    secondComponentRightParagraph2,
    secondComponentRightTitle3,
    secondComponentRightParagraph3,
    secondMediaImageUrl,
    secondMediaGrid1Url,
    secondMediaGrid2Url,
    secondMediaGrid3Url,
    secondMediaVideoUrl,
    thirdComponentLeftTitle,
    thirdComponentLeftLongTitle,
    thirdComponentRightTitle1,
    thirdComponentRightParagraph1,
    thirdComponentRightTitle2,
    thirdComponentRightParagraph2,
    thirdComponentRightTitle3,
    thirdComponentRightParagraph3,
    thirdMediaLeftImageUrl,
    thirdMediaRightImageUrl,
    thirdMediaImageUrl,
    thirdMediaVideoUrl,
    upNextLink,
    upNextImageUrl,
    _id,
    heroTitle,
    heroVideoLink,
    introTitleFirstWord,
    introTitleSecondWord,
    clientName,
    projectName,
    services,
    industries,
    // server-side display strings for common shapes
    "servicesDisplay": coalesce(
      array::join(services[]->title, ", "),
      array::join(services[], ", "),
      servicesText,
      service
    ),
    "industriesDisplay": coalesce(
      array::join(industries[]->title, ", "),
      array::join(industries[], ", "),
      industriesText,
      industry
    ),
    year,
  }`

  let doc = null
  try {
    doc = await client.withConfig({ useCdn: false }).fetch(query, { slug })
  } catch {}

  const props = doc ? {
    introParagraph1: doc.introParagraph1,
    introParagraph2: doc.introParagraph2,
    introParagraph3: doc.introParagraph3,
    introSectionVideoUrl: doc.introSectionVideoUrl,
    firstComponentLeftTitle: doc.firstComponentLeftTitle,
    firstComponentLeftLongTitle: doc.firstComponentLeftLongTitle,
    firstComponentRightTitle1: doc.firstComponentRightTitle1,
    firstComponentRightParagraph1: doc.firstComponentRightParagraph1,
    firstComponentRightTitle2: doc.firstComponentRightTitle2,
    firstComponentRightParagraph2: doc.firstComponentRightParagraph2,
    firstComponentRightTitle3: doc.firstComponentRightTitle3,
    firstComponentRightParagraph3: doc.firstComponentRightParagraph3,
    mediaGroup1VideoUrl: doc.mediaGroup1VideoUrl,
    mediaGroup1ImageUrl: doc.mediaGroup1ImageUrl,
    mediaGroup1LeftImageUrl: doc.mediaGroup1LeftImageUrl,
    mediaGroup1RightImageUrl: doc.mediaGroup1RightImageUrl,
    secondComponentLeftTitle: doc.secondComponentLeftTitle,
    secondComponentLeftLongTitle: doc.secondComponentLeftLongTitle,
    secondComponentRightTitle1: doc.secondComponentRightTitle1,
    secondComponentRightParagraph1: doc.secondComponentRightParagraph1,
    secondComponentRightTitle2: doc.secondComponentRightTitle2,
    secondComponentRightParagraph2: doc.secondComponentRightParagraph2,
    secondComponentRightTitle3: doc.secondComponentRightTitle3,
    secondComponentRightParagraph3: doc.secondComponentRightParagraph3,
    secondMediaImageUrl: doc.secondMediaImageUrl,
    secondMediaGrid1Url: doc.secondMediaGrid1Url,
    secondMediaGrid2Url: doc.secondMediaGrid2Url,
    secondMediaGrid3Url: doc.secondMediaGrid3Url,
    secondMediaVideoUrl: doc.secondMediaVideoUrl,
    thirdComponentLeftTitle: doc.thirdComponentLeftTitle,
    thirdComponentLeftLongTitle: doc.thirdComponentLeftLongTitle,
    thirdComponentRightTitle1: doc.thirdComponentRightTitle1,
    thirdComponentRightParagraph1: doc.thirdComponentRightParagraph1,
    thirdComponentRightTitle2: doc.thirdComponentRightTitle2,
    thirdComponentRightParagraph2: doc.thirdComponentRightParagraph2,
    thirdComponentRightTitle3: doc.thirdComponentRightTitle3,
    thirdComponentRightParagraph3: doc.thirdComponentRightParagraph3,
    thirdMediaLeftImageUrl: doc.thirdMediaLeftImageUrl,
    thirdMediaRightImageUrl: doc.thirdMediaRightImageUrl,
    thirdMediaImageUrl: doc.thirdMediaImageUrl,
    thirdMediaVideoUrl: doc.thirdMediaVideoUrl,
    upNextLink: doc.upNextLink,
    upNextImageUrl: doc.upNextImageUrl,
    heroTitle: doc.heroTitle,
    heroVideoUrl: doc.heroVideoLink,
    introTitleFirstWord: doc.introTitleFirstWord,
    introTitleSecondWord: doc.introTitleSecondWord,
    clientName: doc.clientName,
    projectName: doc.projectName,
    services: doc.services ?? [],
    industries: doc.industries ?? [],
    servicesDisplay: doc.servicesDisplay,
    industriesDisplay: doc.industriesDisplay,
    year: doc.year,
  } : {}

  return <WorkTemplate {...props} />
}


