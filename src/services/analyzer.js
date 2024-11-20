import Sentiment from 'sentiment';
import { tags } from '../config/tags.js';

const sentiment = new Sentiment();

export function analyzeSentiment(text) {
  const result = sentiment.analyze(text);
  return result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral';
}

export function splitIntoSegments(comment) {
  return comment
    .split(/[。！？.!?]/)
    .map(segment => segment.trim())
    .filter(segment => segment.length > 0);
}

export function findTags(segment) {
  const matchedTags = [];
  for (const [category, keywords] of Object.entries(tags)) {
    for (const keyword of keywords) {
      if (segment.includes(keyword)) {
        matchedTags.push(category);
        break;
      }
    }
  }
  return matchedTags;
}

export function analyzeComment(comment) {
  const segments = splitIntoSegments(comment);
  const analyzedSegments = segments.map(segment => ({
    text: segment,
    sentiment: analyzeSentiment(segment),
    tags: findTags(segment)
  }));

  return {
    original: comment,
    segments: analyzedSegments,
    overallSentiment: analyzeSentiment(comment)
  };
}