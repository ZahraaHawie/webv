# Leadership CMS System Guide

## Overview

The Leadership CMS system allows each transformation template to have its own customizable leadership section with articles. This system provides a flexible, content-managed approach to leadership content that can be tailored to each transformation's specific needs.

## System Architecture

### 1. Sanity Schema Types

#### `leadershipTemplate`
- **Purpose**: Defines the leadership page template for each transformation
- **Key Fields**:
  - `title`: Template name
  - `slug`: URL slug
  - `transformationTemplate`: Reference to the transformation template
  - `pinnedWord`: Text for the pinned label
  - `heroSmallLabel`: Hero section small text
  - `heroTitle`: Main hero title
  - `heroParagraph`: Hero description
  - `heroVideo`: Hero video file
  - `heroVideoUrl`: Alternative video URL
  - `articlesTitle`: Articles section title
  - `filterCategories`: Array of filter categories
  - `footerTitle`: Footer title
  - `footerParagraph`: Footer description
  - `footerLogo`: Footer logo image

#### `leadershipArticle`
- **Purpose**: Individual leadership articles linked to transformation templates
- **Key Fields**:
  - `title`: Article title
  - `slug`: URL slug
  - `tag`: Category (Global News, Market Reports, Strategic Insights, Case Studies)
  - `excerpt`: Short description
  - `writer`: Author name
  - `publishedAt`: Publication date
  - `mainImage`: Hero image
  - `body`: Rich text content
  - `transformationTemplate`: Reference to the transformation template

#### `transformationTemplate` (Updated)
- **New Field**: `leadershipTemplate`: Reference to the leadership template for this transformation

### 2. Routing Structure

```
/services/[slug]/Leadership/
├── page.tsx                    # Main leadership page
├── LeadershipPageClientCMS.tsx # CMS-driven component
├── LeadershipPageClientFallback.tsx # Fallback component
└── [articleSlug]/
    ├── page.tsx                    # Individual article page
    ├── LeadershipArticleClientCMS.tsx # CMS-driven article component
    └── LeadershipArticleClientFallback.tsx # Fallback article component
```

### 3. Component Architecture

#### CMS-Driven Components
- **LeadershipPageClientCMS**: Renders leadership pages using CMS data
- **LeadershipArticleClientCMS**: Renders individual articles using CMS data

#### Fallback Components
- **LeadershipPageClientFallback**: Provides hardcoded content when no CMS template exists
- **LeadershipArticleClientFallback**: Provides hardcoded content when no CMS article exists

## How It Works

### 1. Transformation Template Creation
1. Create a transformation template in Sanity Studio
2. Optionally create a leadership template and link it to the transformation template
3. Create leadership articles and link them to the transformation template

### 2. Page Rendering Logic

#### Leadership Page (`/services/[slug]/Leadership/`)
1. Fetches the transformation template by slug
2. Attempts to fetch the associated leadership template
3. Fetches all leadership articles for the transformation
4. If leadership template exists: renders `LeadershipPageClientCMS`
5. If no leadership template: renders `LeadershipPageClientFallback` with hardcoded content

#### Individual Article (`/services/[slug]/Leadership/[articleSlug]/`)
1. Fetches the transformation template by slug
2. Attempts to fetch the specific article by slug and transformation
3. If article exists: renders `LeadershipArticleClientCMS`
4. If no article exists: renders `LeadershipArticleClientFallback` with hardcoded content

### 3. Content Management

#### Creating a Leadership Template
1. Go to Sanity Studio
2. Create a new "Leadership Template" document
3. Fill in the required fields:
   - Title and slug
   - Link to the transformation template
   - Customize hero section content
   - Set up filter categories
   - Configure footer content

#### Creating Leadership Articles
1. Go to Sanity Studio
2. Create a new "Leadership Article" document
3. Fill in the required fields:
   - Title and slug
   - Select category
   - Add content using rich text editor
   - Link to the transformation template
   - Set publication date

## Features

### 1. Dynamic Content
- Hero section with customizable video and text
- Filterable article grid
- Rich text article content with images
- Customizable footer

### 2. Fallback System
- Graceful degradation when CMS content is not available
- Hardcoded sample content for demonstration
- Maintains consistent user experience

### 3. Brand-Specific Customization
- Each transformation can have its own leadership template
- Articles are filtered by transformation
- Consistent transformationing across all content

### 4. Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Smooth animations and transitions

## Usage Examples

### Example 1: Creating a Brand with Leadership Content

1. **Create Transformation Template**:
   ```
   Title: "TechCorp Brand"
   Slug: "techcorp"
   ```

2. **Create Leadership Template**:
   ```
   Title: "TechCorp Leadership"
   Slug: "techcorp-leadership"
   Transformation Template: [Link to TechCorp Brand]
   Hero Title: "Innovation. Leadership. Impact."
   ```

3. **Create Articles**:
   ```
   Article 1: "Digital Transformation Leadership"
   Article 2: "Building Remote Teams"
   Article 3: "AI in Leadership"
   ```

### Example 2: Accessing Content

- **Leadership Page**: `/services/techcorp/Leadership`
- **Individual Article**: `/services/techcorp/Leadership/digital-transformation-leadership`

## Benefits

1. **Flexibility**: Each transformation can have completely customized leadership content
2. **Scalability**: Easy to add new transformations and content
3. **Maintainability**: Content managed through Sanity Studio
4. **Performance**: Optimized rendering with fallbacks
5. **User Experience**: Consistent design with transformation-specific content

## Future Enhancements

1. **SEO Optimization**: Meta tags and structured data
2. **Search Functionality**: Full-text search across articles
3. **Social Sharing**: Share buttons for articles
4. **Comments System**: User engagement features
5. **Analytics**: Track article performance
6. **Multi-language Support**: Internationalization

## Troubleshooting

### Common Issues

1. **Leadership page not loading**:
   - Check if transformation template exists
   - Verify leadership template is linked to transformation
   - Check Sanity Studio for content

2. **Articles not displaying**:
   - Ensure articles are linked to the correct transformation template
   - Check article publication dates
   - Verify article slugs are unique

3. **Images not loading**:
   - Check image uploads in Sanity Studio
   - Verify image URLs are accessible
   - Check network connectivity

### Debug Mode

To enable debug mode, add `?debug=true` to any leadership URL to see additional information about the data being fetched.

## Support

For technical support or questions about the Leadership CMS system, please refer to the development team or check the Sanity documentation for schema-related issues.
