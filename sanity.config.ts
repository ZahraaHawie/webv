import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

// Note: This config file is not being used. The studio uses sanity.studio.config.ts instead.
// This file is kept for reference but can be removed if not needed.

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  title: 'Site CMS',
  plugins: [deskTool()],
  schema: { types: [] }, // Empty schema since we're using the studio config
  useCdn: false,
})
