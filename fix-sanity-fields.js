// Script to help identify and clean up old fields in Sanity posts
// Run this in your browser console when on the Sanity Studio page

// First, let's check what fields exist in your posts
const query = `*[_type == "post"] {
  _id,
  title,
  slug,
  // Check for old fields that might be causing issues
  body,
  excerpt,
  // Current fields
  tag,
  writer,
  publishedAt,
  mainImage,
  paragraph1,
  image1,
  paragraph2,
  image2,
  paragraph3,
  image3,
  paragraph4,
  image4,
  paragraph5,
  image5,
  paragraph6,
  image6,
  paragraph7,
  image7,
  secondTitle,
  keyTakeaways
}`

console.log('Run this query in your Sanity Studio to see what fields exist:')
console.log(query)

// To clean up old fields, you can run this mutation:
const mutation = `*[_type == "post"] {
  _id,
  "patch": {
    "unset": ["body", "excerpt"]
  }
}`

console.log('\nTo remove old fields, run this mutation:')
console.log(mutation)

