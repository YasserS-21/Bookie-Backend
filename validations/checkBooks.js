const checkTitle = (req, res, next) => {
    if (!req.body.title) {
      res.status(400).json({ error: "Title is required" });
    } else {
      next();
    }
  };
  
const checkAuthor = (req, res, next) => {
    if (!req.body.author) {
      res.status(400).json({ error: "Author is required" });
    } else {
      next();
    }
};

  const checkPublished_Year = (req, res, next) => {
    const publishedYear = req.body.published_year.toString();
    if (publishedYear.length !== 4) {
      res.status(400).json({ error: "Invalid published year." });
    } else {
      next();
    }
  };

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
const checkArt = (req, res, next) => {
 const artUrl = req.body.art;

 if (
   !artUrl ||
   isValidUrl(artUrl)
 ) {
   next();
 } else {
   res.status(400).json({ error: "Invalid box art URL." });
 }
}

const checkPages = (req, res, next) => {
    const pages = req.body.pages;
    if ( pages<= 0 ) {
      res.status(400).json({ error: "Invalid number of pages." });
    } else {
      next();
    }
}


module.exports = { checkPages, checkArt, checkAuthor, checkPublished_Year, checkTitle}