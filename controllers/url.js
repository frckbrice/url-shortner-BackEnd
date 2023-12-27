const Url = require("../models/url");
const dns = require("dns");
const urlParser = require("url");

module.exports = {
  original_url: (req, res, next) => {
    const { url, url_id } = req.body;
    console.log(url, url_id);
    const client_url = req.headers.origin;
    // parsing the url to get the hostname
    const url_parsing = urlParser.parse(url, true).hostname;
    // check the validity of the the url via dns
    const dnsLookup = dns.lookup(url_parsing, async (err, address) => {
      if (err) {
        const err = new Error("Could not resolve address");
        err.status = 500;
        return res.json({ error: "Could not resolve address" });
      }
      if (!address) {
        return res.json({ error: "Invalid address" });
      }
      // build object from the Model
      const new_url = new Url({
        orinalpath: url,
        shortestPath: url_id,
      });
      const result = await new_url.save();
      console.log(result);
      // send back the result to frontEnd
      return res.json({
        original_url: result.orinalpath,
        short_url: result.shortestPath,
      });
    });
  },

  //* this code is not necessary because i have prefer to use frontend to handle everything on frontend
  short_url: async (req, res) => {
    const { addr } = req.params;
    const result = await Url.findOne({ shortestPath: addr }).exec();
    console.log(result);
    res.redirect(result.orinalpath);
  },
};
