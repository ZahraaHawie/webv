import {defineType} from 'sanity'

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    { name: 'title', type: 'string', title: 'Title', validation: r => r.required() },
    { name: 'slug',  type: 'slug',   title: 'Slug',  options: { source: 'title', maxLength: 96 }, validation: r => r.required() },

    // Shown as "Category" in the UI (keep the name 'tag')
    { name: 'tag', type: 'string', title: 'Category',
      options: { list: ['Global News','Market Reports','Strategic Insights','Case Studies'] } },

    // Leadership filters (used by Leadership page)
    { name: 'type', type: 'string', title: 'Type',
      description: 'Content type for Leadership page filtering',
      options: { list: ['Blog','Podcasts','Events','Reports','Keynotes'] } },

    { name: 'industry', type: 'string', title: 'Industry',
      description: 'Industry for Leadership page filtering',
      options: { list: [
        'Technology',
        'Healthcare',
        'Finance',
        'Retail',
        'Education',
        'Manufacturing',
        'Real Estate',
        'Energy',
        'Transportation',
        'Media & Entertainment',
        'Food & Beverage',
        'Automotive',
        'Fashion & Beauty',
        'Sports & Fitness',
        'Government'
      ] } },

    { name: 'transformation', type: 'string', title: 'Transformation',
      description: 'Service transformation for Leadership page filtering',
      options: { list: [
        'Brand Transformation',
        'Digital Transformation',
        'Media Transformation',
        'AI Transformation',
        'Spatial Transformation'
      ] } },

    // Optional short summary
    { name: 'excerpt', type: 'text', title: 'Excerpt' },

    // Writer field
    { name: 'writer', type: 'string', title: 'Writer' },

    // Date
    { name: 'publishedAt', type: 'datetime', title: 'Published at' },

    // Hero image
    { name: 'mainImage', type: 'image', title: 'Main image', options: { hotspot: true } },

    // Flexible body (rich text + images)
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    },
  ],
})
