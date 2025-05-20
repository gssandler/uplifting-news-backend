const express = require('express');
const cors = require('cors');
const RSSParser = require('rss-parser');
const parser = new RSSParser();

const app = express();
const PORT = process.env.PORT || 3001;

const feeds = {
  Health: [
    'https://www.positive.news/feed/',
    'https://www.goodnewsnetwork.org/category/health/feed/'
  ],
  Environment: [
    'https://www.goodnewsnetwork.org/category/news/environment/feed/'
  ],
  Community: [
    'https://www.inspiremore.com/feed/',
    'https://www.goodnewsnetwork.org/category/news/usa/feed/'
  ]
};

app.use(cors());

app.get('/news/:category', async (req, res) => {
  const category = req.params.category;
  const urls = feeds[category];

  if (!urls) {
    return res.status(404).json({ error: 'Category not found' });
  }

  try {
    const results = [];
    for (const url of urls) {
      const feed = await parser.parseURL(url);
      feed.items.slice(0, 5).forEach(item => {
        results.push({
          title: item.title,
          link: item.link,
          source: new URL(item.link).hostname.replace('www.', '')
        });
      });
    }
    res.json(results);
  } catch (error) {
    console.error('RSS fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Uplifting news server running on http://localhost:${PORT}`);
});