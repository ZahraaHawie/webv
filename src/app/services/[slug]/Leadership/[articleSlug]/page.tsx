import { client } from '../../../../../sanity/lib/client';
import LeadershipArticleClientCMS from './LeadershipArticleClientCMS';
import LeadershipArticleClientFallback from './LeadershipArticleClientFallback';

export default async function LeadershipArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string; articleSlug: string }> 
}) {
  const { slug, articleSlug } = await params;
  
  // Fetch the transformation template
  const transformationQuery = `*[_type == "transformationTemplate" && slug.current == $slug][0]`;
  const transformationTemplate = await client.fetch(transformationQuery, { slug });
  
  if (!transformationTemplate) {
    return <div>Transformation template not found for slug: {slug}</div>;
  }

  // Fetch the specific leadership article
  const articleQuery = `*[_type == "leadershipArticle" && slug.current == $articleSlug && transformationTemplate._ref == $transformationId][0] {
    _id,
    title,
    tag,
    slug,
    mainImage,
    publishedAt,
    writer,
    excerpt,
    body
  }`;
  const article = await client.fetch(articleQuery, { 
    articleSlug, 
    transformationId: transformationTemplate._id 
  });
  
  // If no CMS article is found, use fallback with hardcoded content
  if (!article) {
    const fallbackArticles: Record<string, any> = {
      "future-leadership-digital-transformation": {
        title: "The Future of Leadership in Digital Transformation",
        tag: "Strategic Insights",
        imgSrc: "/media/article-1.jpg",
        slug: "future-leadership-digital-transformation",
        writer: "Sarah Johnson",
        publishedAt: "2024-01-15T00:00:00Z",
        content: `
          <p>In today's rapidly evolving digital landscape, leadership has taken on new dimensions that require adaptability, technological fluency, and a forward-thinking mindset. The traditional command-and-control leadership model is giving way to more collaborative, data-driven approaches that empower teams to innovate and respond quickly to market changes.</p>
          
          <h2>The Digital Leadership Imperative</h2>
          <p>Digital transformation isn't just about implementing new technologies—it's about fundamentally changing how organizations operate, compete, and deliver value. Leaders who successfully navigate this transformation understand that technology is an enabler, not an end in itself.</p>
          
          <h3>Key Characteristics of Digital Leaders</h3>
          <p>Modern digital leaders exhibit several critical characteristics:</p>
          <ul>
            <li><strong>Agility:</strong> The ability to pivot quickly in response to changing market conditions</li>
            <li><strong>Data Literacy:</strong> Understanding how to leverage data for decision-making</li>
            <li><strong>Collaborative Mindset:</strong> Breaking down silos and fostering cross-functional teamwork</li>
            <li><strong>Customer-Centricity:</strong> Using technology to enhance customer experiences</li>
            <li><strong>Continuous Learning:</strong> Staying current with emerging technologies and trends</li>
          </ul>
          
          <h2>Building a Digital-First Culture</h2>
          <p>Creating a culture that embraces digital transformation requires leaders to model the behaviors they want to see throughout the organization. This includes being transparent about challenges, celebrating experimentation, and creating safe spaces for failure and learning.</p>
          
          <blockquote>
            "The best digital leaders don't just implement technology—they transform their organizations to be more human, more connected, and more capable of delivering exceptional value."
          </blockquote>
          
          <h2>Looking Ahead</h2>
          <p>As we look to the future, the role of leadership will continue to evolve. The leaders who will thrive are those who can balance technological advancement with human connection, data-driven insights with intuitive wisdom, and global reach with local relevance.</p>
        `
      },
      "building-resilient-teams-uncertain-times": {
        title: "Building Resilient Teams in Uncertain Times",
        tag: "Global News",
        imgSrc: "/media/article-2.jpg",
        slug: "building-resilient-teams-uncertain-times",
        writer: "Michael Chen",
        publishedAt: "2024-01-10T00:00:00Z",
        content: `
          <p>In an era marked by unprecedented uncertainty, building resilient teams has become one of the most critical leadership challenges. Resilient teams don't just survive difficult times—they thrive, adapt, and emerge stronger from adversity.</p>
          
          <h2>Understanding Team Resilience</h2>
          <p>Team resilience goes beyond individual resilience. It's about creating collective strength that enables teams to maintain performance, cohesion, and purpose even when facing significant challenges.</p>
          
          <h3>The Pillars of Team Resilience</h3>
          <p>Research has identified several key pillars that support team resilience:</p>
          <ul>
            <li><strong>Psychological Safety:</strong> Creating an environment where team members feel safe to take risks and express concerns</li>
            <li><strong>Clear Communication:</strong> Maintaining transparent, frequent, and honest communication</li>
            <li><strong>Shared Purpose:</strong> Ensuring everyone understands and is committed to common goals</li>
            <li><strong>Adaptive Capacity:</strong> Building the ability to pivot and adjust strategies quickly</li>
            <li><strong>Support Systems:</strong> Establishing networks of support both within and outside the team</li>
          </ul>
          
          <h2>Practical Strategies for Leaders</h2>
          <p>Building resilient teams requires intentional effort and consistent practice. Here are some practical strategies leaders can implement:</p>
          
          <h3>1. Foster Psychological Safety</h3>
          <p>Create an environment where team members feel comfortable sharing ideas, concerns, and mistakes without fear of judgment or retribution.</p>
          
          <h3>2. Develop Adaptive Leadership</h3>
          <p>Practice situational leadership, adjusting your approach based on the team's needs and the challenges they're facing.</p>
          
          <h3>3. Build Strong Relationships</h3>
          <p>Invest time in building genuine relationships with team members and encouraging them to do the same with each other.</p>
          
          <h2>The Long-Term Impact</h2>
          <p>Teams that develop resilience don't just weather storms—they become more innovative, collaborative, and effective. The investment in building resilience pays dividends in improved performance, higher engagement, and greater organizational success.</p>
        `
      },
      "case-study-successful-organizational-change": {
        title: "Case Study: Successful Organizational Change",
        tag: "Case Studies",
        imgSrc: "/media/article-3.jpg",
        slug: "case-study-successful-organizational-change",
        writer: "Dr. Emily Rodriguez",
        publishedAt: "2024-01-05T00:00:00Z",
        content: `
          <p>This case study examines how TechCorp, a mid-sized technology company, successfully navigated a major organizational transformation that resulted in 40% improved efficiency and 85% employee satisfaction scores.</p>
          
          <h2>The Challenge</h2>
          <p>TechCorp faced several critical challenges that necessitated organizational change:</p>
          <ul>
            <li>Declining market share due to outdated processes</li>
            <li>High employee turnover (25% annually)</li>
            <li>Poor cross-departmental collaboration</li>
            <li>Customer satisfaction scores below industry average</li>
          </ul>
          
          <h2>The Transformation Strategy</h2>
          <p>The leadership team developed a comprehensive transformation strategy with three key phases:</p>
          
          <h3>Phase 1: Assessment and Planning (Months 1-3)</h3>
          <p>Conducted comprehensive organizational assessment, including employee surveys, process mapping, and stakeholder interviews. This phase revealed that the main issues stemmed from siloed departments and lack of clear communication channels.</p>
          
          <h3>Phase 2: Implementation (Months 4-9)</h3>
          <p>Implemented several key changes:</p>
          <ul>
            <li>Restructured teams to be more cross-functional</li>
            <li>Introduced new communication tools and processes</li>
            <li>Launched comprehensive training programs</li>
            <li>Established regular feedback mechanisms</li>
          </ul>
          
          <h3>Phase 3: Optimization (Months 10-12)</h3>
          <p>Fine-tuned processes based on feedback and performance data, ensuring sustainable change.</p>
          
          <h2>Key Success Factors</h2>
          <p>Several factors contributed to the success of this transformation:</p>
          
          <h3>1. Strong Leadership Commitment</h3>
          <p>The CEO and executive team demonstrated unwavering commitment to the change, modeling new behaviors and consistently communicating the vision.</p>
          
          <h3>2. Employee Involvement</h3>
          <p>Employees were involved in the planning process and given opportunities to provide feedback throughout the transformation.</p>
          
          <h3>3. Clear Communication</h3>
          <p>Regular, transparent communication about progress, challenges, and successes kept everyone aligned and engaged.</p>
          
          <h3>4. Adequate Resources</h3>
          <p>Sufficient time, budget, and personnel were allocated to ensure successful implementation.</p>
          
          <h2>Results and Lessons Learned</h2>
          <p>The transformation resulted in significant improvements across all key metrics. The most important lesson learned was that successful organizational change requires both structural changes and cultural transformation.</p>
          
          <blockquote>
            "The key to our success wasn't just changing processes—it was changing mindsets and building a culture of continuous improvement."
          </blockquote>
          
          <p>This case study demonstrates that with proper planning, strong leadership, and employee engagement, organizations can successfully navigate major transformations and emerge stronger than before.</p>
        `
      }
    };

    const fallbackArticle = fallbackArticles[articleSlug];
    
    if (!fallbackArticle) {
      return <div>Leadership article not found</div>;
    }

    return (
      <LeadershipArticleClientFallback 
        article={fallbackArticle}
        serviceSlug={slug}
      />
    );
  }

  return (
    <LeadershipArticleClientCMS 
      article={article}
      serviceSlug={slug}
    />
  );
}