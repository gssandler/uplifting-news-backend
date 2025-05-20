const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const sampleNews = {
  Health: [
    {
      title: "New Breakthrough in Cancer Research Offers Hope",
      link: "https://example.com/cancer-breakthrough",
      source: "Health Daily"
    },
    {
      title: "Mental Health Programs Expand Across Schools",
      link: "https://example.com/mental-health-schools",
      source: "Positive Health"
    }
  ],
  Environment: [
    {
      title: "Coral Reefs Show Unexpected Recovery After Conservation Efforts",
      link: "https://example.com/coral-reef-recovery",
      source: "Positive News"
    },
    {
      title: "City Plants One Million Trees in 5 Years to Boost Air Quality",
      link: "https://example.com/million-trees-project",
      source: "Green Times"
    }
  ],
  Community: [
    {
      title: "Local Bakery Donates Bread to Homeless Every Morning",
      link: "https://example.com/local-bakery-donates",
      source: "Kindness News"
    },
    {
      title: "Volunteers Build Homes for Families in Need",
      link: "https://example.com/volunteers-build-homes",
      source: "Community Weekly"
    }
  ]
};

app.get("/news/:category", (req, res) => {
  const category = req.params.category;
  const data = sampleNews[category];
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});