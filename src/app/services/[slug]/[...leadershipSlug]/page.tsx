import { client } from '../../../../sanity/lib/client';
import LeadershipPageClientCMS from '../Leadership/LeadershipPageClientCMS';
import LeadershipPageClientFallback from '../Leadership/LeadershipPageClientFallback';

export default async function LeadershipTemplatePage({ 
  params 
}: { 
  params: Promise<{ slug: string; leadershipSlug: string[] }> 
}) {
  const { slug: transformationSlug, leadershipSlug } = await params;
  
  // If leadershipSlug is ["Leadership"], use the existing logic
  if (leadershipSlug.length === 1 && leadershipSlug[0] === 'Leadership') {
    // Fetch the transformation template
    const transformationQuery = `*[_type == "transformationTemplate" && slug.current == $slug][0]`;
    const transformationTemplate = await client.fetch(transformationQuery, { slug: transformationSlug });
    
    if (!transformationTemplate) {
      return <div>Transformation template not found for slug: {transformationSlug}</div>;
    }

    // Fetch the leadership template for this transformation
    const leadershipQuery = `*[_type == "leadershipTemplate" && transformationTemplate._ref == $transformationId][0] {
      _id,
      title,
      heroImage,
      heroSmallLabel,
      heroTitle,
      heroParagraph,
      heroVideo,
      heroVideoUrl,
      articlesTitle,
      industries,
      footerTitle,
      footerParagraph,
      footerLogo
    }`;
    const leadershipTemplate = await client.fetch(leadershipQuery, { transformationId: transformationTemplate._id });
    
    // Fetch leadership articles for this transformation
    const articlesQuery = `*[_type == "leadershipArticle" && transformationTemplate._ref == $transformationId] | order(publishedAt desc) {
      _id,
      title,
      tag,
      industry,
      slug,
      mainImage,
      publishedAt,
      writer,
      excerpt
    }`;
    const articles = await client.fetch(articlesQuery, { transformationId: transformationTemplate._id });

    // If no leadership template is found, use fallback with hardcoded articles
    if (!leadershipTemplate) {
      const fallbackArticles = [
        {
          title: "The Future of Leadership in Digital Transformation",
          tag: "Strategic Insights",
          imgSrc: "/media/article-1.jpg",
          slug: "future-leadership-digital-transformation"
        },
        {
          title: "Building Resilient Teams in Uncertain Times",
          tag: "Global News",
          imgSrc: "/media/article-2.jpg",
          slug: "building-resilient-teams-uncertain-times"
        },
        {
          title: "Case Study: Successful Organizational Change",
          tag: "Case Studies",
          imgSrc: "/media/article-3.jpg",
          slug: "case-study-successful-organizational-change"
        },
        {
          title: "Market Trends in Leadership Development",
          tag: "Market Reports",
          imgSrc: "/media/article-1.jpg",
          slug: "market-trends-leadership-development"
        },
        {
          title: "Strategic Leadership for Remote Teams",
          tag: "Strategic Insights",
          imgSrc: "/media/article-2.jpg",
          slug: "strategic-leadership-remote-teams"
        },
        {
          title: "Global Leadership Challenges 2024",
          tag: "Global News",
          imgSrc: "/media/article-3.jpg",
          slug: "global-leadership-challenges-2024"
        },
        {
          title: "Innovation in Leadership Practices",
          tag: "Strategic Insights",
          imgSrc: "/media/article-1.jpg",
          slug: "innovation-leadership-practices"
        },
        {
          title: "Case Study: Cultural Transformation",
          tag: "Case Studies",
          imgSrc: "/media/article-2.jpg",
          slug: "case-study-cultural-transformation"
        }
      ];

      return (
        <LeadershipPageClientFallback 
          articles={fallbackArticles}
          serviceSlug={transformationSlug}
        />
      );
    }

    return (
      <LeadershipPageClientCMS 
        leadershipTemplate={leadershipTemplate}
        articles={articles}
        serviceSlug={transformationSlug}
      />
    );
  }
  
  // If leadershipSlug is a specific leadership template slug
  if (leadershipSlug.length === 1) {
    const leadershipTemplateSlug = leadershipSlug[0];
    
    // First, try to find the leadership template by its slug
    const leadershipQuery = `*[_type == "leadershipTemplate" && slug.current == $leadershipSlug][0] {
      _id,
      title,
      heroImage,
      heroSmallLabel,
      heroTitle,
      heroParagraph,
      heroVideo,
      heroVideoUrl,
      articlesTitle,
      industries,
      footerTitle,
      footerParagraph,
      footerLogo,
      transformationTemplate->
    }`;
    const leadershipTemplate = await client.fetch(leadershipQuery, { leadershipSlug: leadershipTemplateSlug });
    
    if (!leadershipTemplate) {
      return <div>Leadership template not found for slug: {leadershipTemplateSlug}</div>;
    }

    // Verify that the leadership template belongs to the correct transformation
    if (!leadershipTemplate.transformationTemplate || leadershipTemplate.transformationTemplate.slug.current !== transformationSlug) {
      return <div>Leadership template &quot;{leadershipTemplateSlug}&quot; does not belong to transformation &quot;{transformationSlug}&quot;</div>;
    }

    // Fetch leadership articles for this transformation
    const articlesQuery = `*[_type == "leadershipArticle" && transformationTemplate._ref == $transformationId] | order(publishedAt desc) {
      _id,
      title,
      tag,
      industry,
      slug,
      mainImage,
      publishedAt,
      writer,
      excerpt
    }`;
    const articles = await client.fetch(articlesQuery, { transformationId: leadershipTemplate.transformationTemplate._id });

    return (
      <LeadershipPageClientCMS 
        leadershipTemplate={leadershipTemplate}
        articles={articles}
        serviceSlug={transformationSlug}
      />
    );
  }
  
  // If we have more than one segment, it's not a valid route
  return <div>Invalid leadership route</div>;
}

