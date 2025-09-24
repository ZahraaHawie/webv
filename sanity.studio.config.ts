import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Import schema types directly to avoid any potential client boundary issues
import {defineType, defineField, defineArrayMember} from 'sanity'
import {DynamicIndustrySelect} from './src/sanity/components/DynamicIndustrySelect'
import {TagIcon, UserIcon, ImageIcon} from '@sanity/icons'

// Define schema types inline to avoid import issues
const postType = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({
      name: 'tag', type: 'string', title: 'Tag',
      options: {list: [
        {title: 'Global News', value: 'Global News'},
        {title: 'Market Reports', value: 'Market Reports'},
        {title: 'Strategic Insights', value: 'Strategic Insights'},
        {title: 'Case Studies', value: 'Case Studies'},
      ]}
    }),
    // Leadership filters
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'Content type for Leadership filtering',
      options: { list: [
        { title: 'Blog', value: 'Blog' },
        { title: 'Podcasts', value: 'Podcasts' },
        { title: 'Events', value: 'Events' },
        { title: 'Reports', value: 'Reports' },
        { title: 'Keynotes', value: 'Keynotes' },
      ] }
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry',
      description: 'Industry for Leadership filtering',
      options: { list: [
        { title: 'Technology', value: 'Technology' },
        { title: 'Healthcare', value: 'Healthcare' },
        { title: 'Finance', value: 'Finance' },
        { title: 'Retail', value: 'Retail' },
        { title: 'Education', value: 'Education' },
        { title: 'Manufacturing', value: 'Manufacturing' },
        { title: 'Real Estate', value: 'Real Estate' },
        { title: 'Energy', value: 'Energy' },
        { title: 'Transportation', value: 'Transportation' },
        { title: 'Media & Entertainment', value: 'Media & Entertainment' },
        { title: 'Food & Beverage', value: 'Food & Beverage' },
        { title: 'Automotive', value: 'Automotive' },
        { title: 'Fashion & Beauty', value: 'Fashion & Beauty' },
        { title: 'Sports & Fitness', value: 'Sports & Fitness' },
        { title: 'Government', value: 'Government' },
      ] }
    }),
    defineField({
      name: 'transformation',
      type: 'string',
      title: 'Transformation',
      description: 'Service transformation for Leadership filtering',
      options: { list: [
        { title: 'Brand Transformation', value: 'Brand Transformation' },
        { title: 'Digital Transformation', value: 'Digital Transformation' },
        { title: 'Media Transformation', value: 'Media Transformation' },
        { title: 'AI Transformation', value: 'AI Transformation' },
        { title: 'Spatial Transformation', value: 'Spatial Transformation' },
      ] }
    }),
    defineField({name: 'writer', type: 'string', title: 'Writer'}),
    defineField({name: 'mainImage', type: 'image', title: 'Main image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', type: 'datetime', title: 'Published at'}),
    defineField({
      name: 'paragraph1', 
      type: 'array', 
      title: 'Paragraph 1',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image1', type: 'image', title: 'Image 1 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video1', type: 'url', title: 'Video 1 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph2', 
      type: 'array', 
      title: 'Paragraph 2',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image2', type: 'image', title: 'Image 2 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video2', type: 'url', title: 'Video 2 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph3', 
      type: 'array', 
      title: 'Paragraph 3',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image3', type: 'image', title: 'Image 3 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video3', type: 'url', title: 'Video 3 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph4', 
      type: 'array', 
      title: 'Paragraph 4',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image4', type: 'image', title: 'Image 4 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video4', type: 'url', title: 'Video 4 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph5', 
      type: 'array', 
      title: 'Paragraph 5',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image5', type: 'image', title: 'Image 5 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video5', type: 'url', title: 'Video 5 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph6', 
      type: 'array', 
      title: 'Paragraph 6',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image6', type: 'image', title: 'Image 6 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video6', type: 'url', title: 'Video 6 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({
      name: 'paragraph7', 
      type: 'array', 
      title: 'Paragraph 7',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({name: 'image7', type: 'image', title: 'Image 7 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video7', type: 'url', title: 'Video 7 URL (Optional)', description: 'YouTube, Vimeo, or direct video URL'}),
    defineField({name: 'secondTitle', type: 'string', title: 'Second Title (Chunky)'}),
    defineField({name: 'bottomImage', type: 'image', title: 'Bottom Image (Optional)', options: {hotspot: true}, description: 'Optional image to display below the article content'}),
    defineField({name: 'keyTakeaways', type: 'array', title: 'Key Takeaways', of: [defineArrayMember({type: 'string'})], description: 'Add key points or takeaways from the article'}),
  ],
})

const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
})

const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})

const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
  ],
})

const industryPostType = defineType({
  name: 'industryPost',
  type: 'document',
  title: 'Industry Post',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'tag', type: 'string', title: 'Tag', validation: r => r.required(), options: { list: [
      { title: 'Public Sector', value: 'Public Sector' },
      { title: 'Technology', value: 'Technology' },
      { title: 'Finance', value: 'Finance' },
      { title: 'Energy', value: 'Energy' },
      { title: 'Production', value: 'Production' },
      { title: 'Professional Services', value: 'Professional Services' },
    ]}}),
    defineField({name: 'writer', type: 'string', title: 'Writer'}),
    defineField({name: 'mainImage', type: 'image', title: 'Main image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', type: 'datetime', title: 'Published at'}),
    defineField({name: 'paragraph1', type: 'array', title: 'Paragraph 1', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image1', type: 'image', title: 'Image 1 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video1', type: 'url', title: 'Video 1 URL (Optional)'}),
    defineField({name: 'paragraph2', type: 'array', title: 'Paragraph 2', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image2', type: 'image', title: 'Image 2 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video2', type: 'url', title: 'Video 2 URL (Optional)'}),
    defineField({name: 'paragraph3', type: 'array', title: 'Paragraph 3', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image3', type: 'image', title: 'Image 3 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video3', type: 'url', title: 'Video 3 URL (Optional)'}),
    defineField({name: 'paragraph4', type: 'array', title: 'Paragraph 4', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image4', type: 'image', title: 'Image 4 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video4', type: 'url', title: 'Video 4 URL (Optional)'}),
    defineField({name: 'paragraph5', type: 'array', title: 'Paragraph 5', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image5', type: 'image', title: 'Image 5 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video5', type: 'url', title: 'Video 5 URL (Optional)'}),
    defineField({name: 'paragraph6', type: 'array', title: 'Paragraph 6', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image6', type: 'image', title: 'Image 6 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video6', type: 'url', title: 'Video 6 URL (Optional)'}),
    defineField({name: 'paragraph7', type: 'array', title: 'Paragraph 7', of: [defineArrayMember({ type: 'block' })]}),
    defineField({name: 'image7', type: 'image', title: 'Image 7 (Optional)', options: {hotspot: true}}),
    defineField({name: 'video7', type: 'url', title: 'Video 7 URL (Optional)'}),
    defineField({name: 'secondTitle', type: 'string', title: 'Second Title (Chunky)'}),
    defineField({name: 'bottomImage', type: 'image', title: 'Bottom Image (Optional)', options: {hotspot: true}}),
    defineField({name: 'keyTakeaways', type: 'array', title: 'Key Takeaways', of: [defineArrayMember({type: 'string'})]}),
  ],
})

const transformationTemplateType = defineType({
  name: 'transformationTemplate',
  type: 'document',
  title: 'Transformation Template',
  fields: [
    // ===== BASIC INFO =====
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'pinnedWord', type: 'string', title: 'Pinned Word', description: 'e.g., 01 Brand Transformation' }),
    
    // ===== LEADERSHIP TEMPLATE REFERENCE =====
    defineField({
      name: 'leadershipTemplate',
      type: 'reference',
      title: 'Leadership Template',
      to: [{ type: 'leadershipTemplate' }],
      description: 'Link to the leadership template for this brand'
    }),

    // ===== BLOCK 1: HERO SECTION =====
    defineField({ name: 'block1Small', type: 'string', title: 'Block 1 - Small Italic Label' }),
    defineField({ name: 'block1Title', type: 'string', title: 'Block 1 - Main Title' }),
    defineField({ name: 'block1Paragraph', type: 'text', title: 'Block 1 - Paragraph' }),
    defineField({ name: 'block1Video', type: 'file', title: 'Block 1 - Video File', options: { accept: 'video/*' } }),
    defineField({ name: 'block1VideoUrl', type: 'url', title: 'Block 1 - Video URL (Alternative)' }),

    // ===== BLOCK 2: STICKY TEXT SECTION =====
    defineField({ name: 'block2Paragraph', type: 'text', title: 'Block 2 - Paragraph' }),
    defineField({ name: 'block2Words', type: 'array', title: 'Block 2 - Repetitive Words', of: [defineArrayMember({ type: 'string' })] }),

    // ===== BLOCK 3: VIDEO SECTION =====
    defineField({ name: 'block3Video', type: 'file', title: 'Block 3 - Video File', options: { accept: 'video/*' } }),
    defineField({ name: 'block3VideoUrl', type: 'url', title: 'Block 3 - Video URL (Alternative)' }),

    // ===== BLOCK 4: THREE ITEM SECTIONS =====
    defineField({ name: 'block4MainTitle', type: 'string', title: 'Block 4 - Main Title' }),
    
    // Item 1
    defineField({ name: 'block4Item1Title', type: 'string', title: 'Block 4 - Item 1 Title' }),
    defineField({ name: 'block4Item1Paragraph', type: 'text', title: 'Block 4 - Item 1 Paragraph' }),
    defineField({ name: 'block4Item1Video', type: 'file', title: 'Block 4 - Item 1 Video', options: { accept: 'video/*' } }),
    defineField({ name: 'block4Item1VideoUrl', type: 'url', title: 'Block 4 - Item 1 Video URL' }),
    
    // Item 2
    defineField({ name: 'block4Item2Title', type: 'string', title: 'Block 4 - Item 2 Title' }),
    defineField({ name: 'block4Item2Paragraph', type: 'text', title: 'Block 4 - Item 2 Paragraph' }),
    defineField({ name: 'block4Item2Video', type: 'file', title: 'Block 4 - Item 2 Video', options: { accept: 'video/*' } }),
    defineField({ name: 'block4Item2VideoUrl', type: 'url', title: 'Block 4 - Item 2 Video URL' }),
    
    // Item 3
    defineField({ name: 'block4Item3Title', type: 'string', title: 'Block 4 - Item 3 Title' }),
    defineField({ name: 'block4Item3Paragraph', type: 'text', title: 'Block 4 - Item 3 Paragraph' }),
    defineField({ name: 'block4Item3Video', type: 'file', title: 'Block 4 - Item 3 Video', options: { accept: 'video/*' } }),
    defineField({ name: 'block4Item3VideoUrl', type: 'url', title: 'Block 4 - Item 3 Video URL' }),

    // ===== BLOCK 7: THOUGHT LEADERSHIP =====
    // Article 1
    defineField({ name: 'block7Article1Category', type: 'string', title: 'Block 7 - Article 1 Category' }),
    defineField({ name: 'block7Article1Time', type: 'string', title: 'Block 7 - Article 1 Time' }),
    defineField({ name: 'block7Article1Date', type: 'string', title: 'Block 7 - Article 1 Date Posted' }),
    defineField({ name: 'block7Article1Title', type: 'string', title: 'Block 7 - Article 1 Title' }),
    defineField({ name: 'block7Article1Link', type: 'url', title: 'Block 7 - Article 1 Link' }),
    
    // Article 2
    defineField({ name: 'block7Article2Category', type: 'string', title: 'Block 7 - Article 2 Category' }),
    defineField({ name: 'block7Article2Time', type: 'string', title: 'Block 7 - Article 2 Time' }),
    defineField({ name: 'block7Article2Date', type: 'string', title: 'Block 7 - Article 2 Date Posted' }),
    defineField({ name: 'block7Article2Title', type: 'string', title: 'Block 7 - Article 2 Title' }),
    defineField({ name: 'block7Article2Link', type: 'url', title: 'Block 7 - Article 2 Link' }),
    
    // Article 3
    defineField({ name: 'block7Article3Category', type: 'string', title: 'Block 7 - Article 3 Category' }),
    defineField({ name: 'block7Article3Time', type: 'string', title: 'Block 7 - Article 3 Time' }),
    defineField({ name: 'block7Article3Date', type: 'string', title: 'Block 7 - Article 3 Date Posted' }),
    defineField({ name: 'block7Article3Title', type: 'string', title: 'Block 7 - Article 3 Title' }),
    defineField({ name: 'block7Article3Link', type: 'url', title: 'Block 7 - Article 3 Link' }),

    // ===== BLOCK 8: INDUSTRY PANELS =====
    // Industry 1
    defineField({ name: 'block8Industry1Title', type: 'string', title: 'Block 8 - Industry 1 Title' }),
    defineField({ name: 'block8Industry1Image', type: 'image', title: 'Block 8 - Industry 1 Image' }),
    
    // Industry 2
    defineField({ name: 'block8Industry2Title', type: 'string', title: 'Block 8 - Industry 2 Title' }),
    defineField({ name: 'block8Industry2Image', type: 'image', title: 'Block 8 - Industry 2 Image' }),
    
    // Industry 3
    defineField({ name: 'block8Industry3Title', type: 'string', title: 'Block 8 - Industry 3 Title' }),
    defineField({ name: 'block8Industry3Image', type: 'image', title: 'Block 8 - Industry 3 Image' }),
    
    // Industry 4
    defineField({ name: 'block8Industry4Title', type: 'string', title: 'Block 8 - Industry 4 Title' }),
    defineField({ name: 'block8Industry4Image', type: 'image', title: 'Block 8 - Industry 4 Image' }),
    
    // Industry 5
    defineField({ name: 'block8Industry5Title', type: 'string', title: 'Block 8 - Industry 5 Title' }),
    defineField({ name: 'block8Industry5Image', type: 'image', title: 'Block 8 - Industry 5 Image' }),
    
    // Industry 6
    defineField({ name: 'block8Industry6Title', type: 'string', title: 'Block 8 - Industry 6 Title' }),
    defineField({ name: 'block8Industry6Image', type: 'image', title: 'Block 8 - Industry 6 Image' }),
  ],
})

// Leadership Article Schema
const leadershipArticleType = defineType({
  name: 'leadershipArticle',
  type: 'document',
  title: 'Leadership Article',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ 
      name: 'tag', 
      type: 'string', 
      title: 'Category',
      options: { 
        list: [
          { title: 'Global News', value: 'Global News' },
          { title: 'Market Reports', value: 'Market Reports' },
          { title: 'Strategic Insights', value: 'Strategic Insights' },
          { title: 'Case Studies', value: 'Case Studies' }
        ]
      }
    }),
    defineField({ 
      name: 'industry', 
      type: 'string', 
      title: 'Industry',
      description: 'Industry category for filtering articles. Options are dynamically loaded from the Leadership Template of the selected Transformation Template.',
      components: {
        input: DynamicIndustrySelect
      }
    }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt' }),
    defineField({ name: 'writer', type: 'string', title: 'Writer' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published at' }),
    defineField({ name: 'mainImage', type: 'image', title: 'Main image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
    // Reference to the transformation template this article belongs to
    defineField({
      name: 'transformationTemplate',
      type: 'reference',
      title: 'Transformation Template',
      to: [{ type: 'transformationTemplate' }],
      validation: r => r.required()
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'mainImage'
    }
  }
})

// Leadership Template Schema - Each brand template can have its own leadership template
const leadershipTemplateType = defineType({
  name: 'leadershipTemplate',
  type: 'document',
  title: 'Leadership Template',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    
    // Reference to the transformation template this leadership template belongs to
    defineField({
      name: 'transformationTemplate',
      type: 'reference',
      title: 'Transformation Template',
      to: [{ type: 'transformationTemplate' }],
      validation: r => r.required()
    }),
    
    // ===== LEADERSHIP PAGE CONTENT =====
    
    // Hero Section
    defineField({ name: 'heroImage', type: 'image', title: 'Hero - Background Image', options: { hotspot: true }, description: 'Full viewport background image for hero section' }),
    defineField({ name: 'heroSmallLabel', type: 'string', title: 'Hero - Small Italic Label', description: 'e.g., Leadership Insights' }),
    defineField({ name: 'heroTitle', type: 'string', title: 'Hero - Main Title', description: 'e.g., Lead. Inspire. Transform.' }),
    defineField({ name: 'heroParagraph', type: 'text', title: 'Hero - Paragraph' }),
    defineField({ name: 'heroVideo', type: 'file', title: 'Hero - Video File (Optional)', options: { accept: 'video/*' }, description: 'Optional video overlay on hero image' }),
    defineField({ name: 'heroVideoUrl', type: 'url', title: 'Hero - Video URL (Alternative)', description: 'Optional video URL overlay on hero image' }),
    
    // Articles Section
    defineField({ name: 'articlesTitle', type: 'string', title: 'Articles Section Title', description: 'e.g., Leadership Articles' }),
    defineField({ 
      name: 'industries', 
      type: 'array', 
      title: 'Industries',
      description: 'Industry names for filter buttons (up to 10 industries)',
      validation: Rule => Rule.max(10).error('Maximum 10 industries allowed'),
      of: [defineArrayMember({ 
        type: 'string',
        title: 'Industry Name',
        validation: Rule => Rule.required().min(1).max(50).error('Industry name must be between 1-50 characters')
      })],
      options: {
        layout: 'grid',
        sortable: true
      }
    }),
    
    // Footer Section
    defineField({ name: 'footerTitle', type: 'string', title: 'Footer - Title', description: 'e.g., Our Story' }),
    defineField({ name: 'footerParagraph', type: 'text', title: 'Footer - Paragraph' }),
    defineField({ name: 'footerLogo', type: 'image', title: 'Footer - Logo', options: { hotspot: true } }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'transformationTemplate.title',
      media: 'footerLogo'
    }
  }
})

// Work Template Schema
const workTemplateType = defineType({
  name: 'workTemplate',
  type: 'document',
  title: 'Work Template',
  fields: [
    // ===== BASIC INFO =====
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    
    // ===== HERO SECTION =====
    defineField({ 
      name: 'heroVideoLink', 
      type: 'url', 
      title: 'Hero Video Link',
      description: 'Video URL for hero section background (className="absolute inset-0 z-0")',
      validation: r => r.required()
    }),
    defineField({ 
      name: 'heroTitle', 
      type: 'string', 
      title: 'Hero Title',
      description: 'Main title for hero section (className="relative z-10 w-full h-full")',
      validation: r => r.required()
    }),
    
    // ===== INTRO SECTION (client table removed; now controlled in code) =====
    defineField({
      name: 'introSectionVideoUrl',
      type: 'url',
      title: 'Intro Section Video URL',
      description: 'Video URL displayed in the Intro Section below the paragraphs'
    }),

    // ===== FIRST COMPONENT (LEFT/RIGHT COLUMNS) =====
    defineField({
      name: 'firstComponentLeftTitle',
      type: 'string',
      title: 'First Component - Left Title',
      description: 'e.g., Brand'
    }),
    defineField({
      name: 'firstComponentLeftLongTitle',
      type: 'string',
      title: 'First Component - Left Long Title',
      description: 'e.g., Empowering Saudis to build a futuristic vision for their homeland'
    }),
    defineField({
      name: 'firstComponentRightTitle1',
      type: 'string',
      title: 'First Component - Right Column First Title',
      description: 'e.g., Brand Strategy'
    }),
    defineField({
      name: 'firstComponentRightParagraph1',
      type: 'text',
      title: 'First Component - Right Column First Paragraph',
      description: 'e.g., We benchmarked against top city-building...'
    }),
    defineField({
      name: 'firstComponentRightTitle2',
      type: 'string',
      title: 'First Component - Right Column Second Title',
      description: 'e.g., Brand Identity'
    }),
    defineField({
      name: 'firstComponentRightParagraph2',
      type: 'text',
      title: 'First Component - Right Column Second Paragraph',
      description: 'e.g., The logo blends a palm...'
    }),
    defineField({
      name: 'firstComponentRightTitle3',
      type: 'string',
      title: 'First Component - Right Column Third Title',
      description: 'e.g., Brand Content'
    }),
    defineField({
      name: 'firstComponentRightParagraph3',
      type: 'text',
      title: 'First Component - Right Column Third Paragraph',
      description: 'e.g., We integrated Saudi cultural elements into the game..'
    }),

    // ===== MEDIA GROUP 1 =====
    defineField({
      name: 'mediaGroup1VideoUrl',
      type: 'url',
      title: 'Media Group 1 - Video URL',
      description: 'Video displayed at the top of Media Group 1'
    }),
    defineField({
      name: 'mediaGroup1ImageUrl',
      type: 'url',
      title: 'Media Group 1 - Image URL',
      description: 'Image displayed under the video in Media Group 1'
    }),
    defineField({
      name: 'mediaGroup1LeftImageUrl',
      type: 'url',
      title: 'Media Group 1 - Left Image URL',
      description: 'Left image in the two-column row in Media Group 1'
    }),
    defineField({
      name: 'mediaGroup1RightImageUrl',
      type: 'url',
      title: 'Media Group 1 - Right Image URL',
      description: 'Right image in the two-column row in Media Group 1'
    }),

    // ===== SECOND COMPONENT (LEFT/RIGHT COLUMNS) =====
    defineField({
      name: 'secondComponentLeftTitle',
      type: 'string',
      title: 'Second Component - Left Title',
      description: 'e.g., Product'
    }),
    defineField({
      name: 'secondComponentLeftLongTitle',
      type: 'string',
      title: 'Second Component - Left Long Title'
    }),
    defineField({
      name: 'secondComponentRightTitle1',
      type: 'string',
      title: 'Second Component - Right Column First Title'
    }),
    defineField({
      name: 'secondComponentRightParagraph1',
      type: 'text',
      title: 'Second Component - Right Column First Paragraph'
    }),
    defineField({
      name: 'secondComponentRightTitle2',
      type: 'string',
      title: 'Second Component - Right Column Second Title'
    }),
    defineField({
      name: 'secondComponentRightParagraph2',
      type: 'text',
      title: 'Second Component - Right Column Second Paragraph'
    }),
    defineField({
      name: 'secondComponentRightTitle3',
      type: 'string',
      title: 'Second Component - Right Column Third Title'
    }),
    defineField({
      name: 'secondComponentRightParagraph3',
      type: 'text',
      title: 'Second Component - Right Column Third Paragraph'
    }),

    // ===== SECOND COMPONENT - MEDIA GROUP 2 =====
    defineField({
      name: 'secondMediaImageUrl',
      type: 'url',
      title: 'Second Component - Image Media 2 URL',
      description: 'Large image below the second component titles'
    }),
    defineField({
      name: 'secondMediaGrid1Url',
      type: 'url',
      title: 'Second Component - 1/3 Media 2 URL'
    }),
    defineField({
      name: 'secondMediaGrid2Url',
      type: 'url',
      title: 'Second Component - 2/3 Media 2 URL'
    }),
    defineField({
      name: 'secondMediaGrid3Url',
      type: 'url',
      title: 'Second Component - 3/3 Media 2 URL'
    }),
    defineField({
      name: 'secondMediaVideoUrl',
      type: 'url',
      title: 'Second Component - Video Media 2 URL'
    }),

    // ===== THIRD COMPONENT (LEFT/RIGHT COLUMNS) =====
    defineField({
      name: 'thirdComponentLeftTitle',
      type: 'string',
      title: 'Third Component - Left Title',
      description: 'e.g., Media'
    }),
    defineField({
      name: 'thirdComponentLeftLongTitle',
      type: 'string',
      title: 'Third Component - Left Long Title'
    }),
    defineField({
      name: 'thirdComponentRightTitle1',
      type: 'string',
      title: 'Third Component - Right Column First Title'
    }),
    defineField({
      name: 'thirdComponentRightParagraph1',
      type: 'text',
      title: 'Third Component - Right Column First Paragraph'
    }),
    defineField({
      name: 'thirdComponentRightTitle2',
      type: 'string',
      title: 'Third Component - Right Column Second Title'
    }),
    defineField({
      name: 'thirdComponentRightParagraph2',
      type: 'text',
      title: 'Third Component - Right Column Second Paragraph'
    }),
    defineField({
      name: 'thirdComponentRightTitle3',
      type: 'string',
      title: 'Third Component - Right Column Third Title'
    }),
    defineField({
      name: 'thirdComponentRightParagraph3',
      type: 'text',
      title: 'Third Component - Right Column Third Paragraph'
    }),

    // ===== THIRD COMPONENT - MEDIA GROUP 3 =====
    defineField({
      name: 'thirdMediaLeftImageUrl',
      type: 'url',
      title: 'Third Component - Left Image Media 3 URL'
    }),
    defineField({
      name: 'thirdMediaRightImageUrl',
      type: 'url',
      title: 'Third Component - Right Image Media 3 URL'
    }),
    defineField({
      name: 'thirdMediaImageUrl',
      type: 'url',
      title: 'Third Component - Image Media 3 URL'
    }),
    defineField({
      name: 'thirdMediaVideoUrl',
      type: 'url',
      title: 'Third Component - Video Media 3 URL'
    }),

    // ===== UP NEXT =====
    defineField({
      name: 'upNextLink',
      type: 'url',
      title: 'Up Next - Link URL',
      description: 'Link to navigate when clicking the Up Next card'
    }),
    defineField({
      name: 'upNextImageUrl',
      type: 'url',
      title: 'Up Next - Image URL',
      description: 'Image displayed in the Up Next card'
    }),
    // Client Table Fields
    defineField({ 
      name: 'clientName', 
      type: 'string', 
      title: 'Client Name'
    }),
    defineField({ 
      name: 'projectName', 
      type: 'string', 
      title: 'Project Name'
    }),
    defineField({ 
      name: 'services', 
      type: 'array', 
      title: 'Services',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'industries', 
      type: 'array', 
      title: 'Industries',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'year', 
      type: 'string', 
      title: 'Year'
    }),
    
    // Two-word title separated (className="grid grid-cols-12 gap-8")
    defineField({ 
      name: 'introTitleFirstWord', 
      type: 'string', 
      title: 'Intro Title - First Word',
      description: 'First word of the two-word title'
    }),
    defineField({ 
      name: 'introTitleSecondWord', 
      type: 'string', 
      title: 'Intro Title - Second Word',
      description: 'Second word of the two-word title'
    }),
    
    // 3 Paragraph fields (className="col-span-4 space-y-8")
    defineField({
      name: 'introParagraph1',
      type: 'array',
      title: 'Intro Paragraph 1',
      description: 'First paragraph in the intro section',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'introParagraph2',
      type: 'array',
      title: 'Intro Paragraph 2',
      description: 'Second paragraph in the intro section',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'introParagraph3',
      type: 'array',
      title: 'Intro Paragraph 3',
      description: 'Third paragraph in the intro section',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Large', value: 'h3'},
            {title: 'Extra Large', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName'
    }
  }
})

const schemaTypes = [postType, industryPostType, transformationTemplateType, categoryType, authorType, blockContentType, leadershipArticleType, leadershipTemplateType, workTemplateType]

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  title: 'Site CMS',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
  useCdn: false,
})
