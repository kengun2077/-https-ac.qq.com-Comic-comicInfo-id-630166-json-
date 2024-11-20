import { fetchComments } from './src/services/scraper.js';
import { analyzeComment } from './src/services/analyzer.js';

async function analyzeComments(comicId) {
  const comments = await fetchComments(comicId);
  const analyzedComments = comments.map(analyzeComment);
  console.log(JSON.stringify(analyzedComments, null, 2));
  return analyzedComments;
}

analyzeComments('630166');