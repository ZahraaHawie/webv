// Script to help identify and fix Sanity Studio errors
// Run this in your browser console when on the Sanity Studio page

console.log('🔍 Sanity Studio Error Fix Script');
console.log('================================');

// Check for any posts with old field structures
const query = `*[_type == "post"] {
  _id,
  title,
  slug,
  // Check for old fields that might be causing issues
  body,
  excerpt,
  // Check for old video fields
  video1,
  video2,
  video3,
  video4,
  video5,
  video6,
  video7,
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

console.log('📋 Run this query in Sanity Studio Vision tab to check your posts:');
console.log(query);

// To clean up old fields, run this mutation:
const mutation = `*[_type == "post"] {
  _id,
  "patch": {
    "unset": ["body", "excerpt"]
  }
}`

console.log('\n🧹 To remove old fields, run this mutation in Vision tab:');
console.log(mutation);

// Check for any validation errors
console.log('\n✅ Steps to fix Sanity Studio errors:');
console.log('1. Go to http://localhost:3000/studio');
console.log('2. Open browser console (F12)');
console.log('3. Run the query above to see what fields exist');
console.log('4. If you see "body" or "excerpt" fields, run the mutation');
console.log('5. Hard refresh the page (Ctrl+Shift+R)');
console.log('6. Check if any posts show "Unknown field" errors');
console.log('7. Delete any unknown fields manually');

console.log('\n🎥 Video URL fields should now be available:');
console.log('- Video 1 URL (Optional)');
console.log('- Video 2 URL (Optional)');
console.log('- Video 3 URL (Optional)');
console.log('- Video 4 URL (Optional)');
console.log('- Video 5 URL (Optional)');
console.log('- Video 6 URL (Optional)');
console.log('- Video 7 URL (Optional)');

