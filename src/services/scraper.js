import * as cheerio from 'cheerio';
import axios from 'axios';

export async function fetchComments(comicId) {
  try {
    const response = await axios.get(`https://ac.qq.com/Comic/comicInfo/id/${comicId}`);
    const $ = cheerio.load(response.data);
    
    const comments = [];
    $('.comment-list .comment-item').each((i, elem) => {
      const content = $(elem).find('.comment-content').text().trim();
      if (content) {
        comments.push(content);
      }
    });
    
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}