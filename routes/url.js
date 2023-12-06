const router = require("express").Router();
const urlShortener = require("../controllers/url");

router.get("/", (req, res) => {
  res.send("Front/Back-End connected ");
});
router.post("/", urlShortener.original_url);
router.get("/:addr", urlShortener.short_url);

module.exports = router;
