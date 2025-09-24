import { client } from '../../../../sanity/lib/client';
import LeadershipPageClientCMS from './LeadershipPageClientCMS';
import LeadershipPageClientFallback from './LeadershipPageClientFallback';

export default async function LeadershipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch the transformation template
  const transformationQuery = `*[_type == "transformationTemplate" && slug.current == $slug][0]`;
  const transformationTemplate = await client.fetch(transformationQuery, { slug });
  
  if (!transformationTemplate) {
    return <div>Transformation template not found for slug: {slug}</div>;
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
        serviceSlug={slug}
      />
    );
  }

  return (
    <LeadershipPageClientCMS 
      leadershipTemplate={leadershipTemplate}
      articles={articles}
      serviceSlug={slug}
    />
  );
}