const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
//let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

request(url, cb);

function cb(error, response, body) {
  parseBody(body);
}

function parseBody(html) {
  // i will get html here of cricinfo ipl home page !!
  let ch = cheerio.load(html);
  let lastshortcomment = ch('.match-comment-short-text  span:first').text();
  let lastlongcomment = ch('.match-comment-long-text[itemprop="articleBody"] p:first').text();
  console.log(lastshortcomment);
  console.log(lastlongcomment);
}