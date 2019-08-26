const request = require('request');
const cheerio = require('cheerio');

const getNumOfPages = numberOfPosts => {
    return Math.ceil(numberOfPosts / 30)
};

const extractRankFromPost = el => {
    return extractNumFromStr(el.find('.rank').text());
};

const extractTitleFromPost = el => {
    return el.find('.storylink').text().slice(0, 256);
};

const extractUriFromPost = el => {
    return el.find('.storylink').attr('href');
};

const extractAuthorFromPost = el => {
    return el.next().find('.hnuser').text().slice(0, 256);
};

const extractPointsFromPost = el => {
    return extractNumFromStr(el.next().find('.score').text());
};

const extractCommentsFromPost = el => {
    return extractNumFromStr(el.next().find('a').last().text())
};

const extractNumFromStr = str => {
    const matches = str.match(/\d+/);
    return matches && matches.length > 0 ? +matches[0] : 0;
};

const scrape = numberOfPosts => {
    let listOfPosts = [];
    const pages = getNumOfPages(numberOfPosts);
    for (let page=1; page <= pages; page++) {
        request(`https://news.ycombinator.com/news?p=${page}`, (err, res, html) => {
            // Check there are no errors and the http response is successful
            if (!err && res.statusCode === 200) {
                const $ = cheerio.load(html);
                const table = $('table.itemlist tbody');

                table.children().each((i, el) => {
                    // Only execute the code every 3 lines as the information from each post is spread over 3 lines.
                    // 30 posts on the page, each consisting of 3 rows, hence the 90.
                    if (i % 3 === 0 && i < 90) {
                        const rank = extractRankFromPost($(el));
                        const title = extractTitleFromPost($(el));
                        const uri = extractUriFromPost($(el));
                        const author = extractAuthorFromPost($(el));
                        const points = extractPointsFromPost($(el));
                        const comments = extractCommentsFromPost($(el));
                        const postAsJson = { rank, title, uri, author, points, comments };
                        listOfPosts.push(postAsJson);
                    }
                });
            }
            if (page === pages) {
                console.log(listOfPosts.slice(0, numberOfPosts))
            }
        });
    }
};

const numberOfPosts = process.argv[2];
// If no argument is provided or the argument is not a number when the code is run
if (numberOfPosts === undefined || typeof +numberOfPosts !== "number") {
    console.log('Please enter the number of posts that you want to print')
} else if (+numberOfPosts > 100){
    console.log('Please enter a number less than 100')
} else if (+numberOfPosts < 0) {
    console.log('Please enter a number greater than 0')
} else {
    scrape(+numberOfPosts);
}

module.exports = {
    extractRankFromPost,
    extractTitleFromPost,
    extractUriFromPost,
    extractAuthorFromPost,
    extractPointsFromPost,
    extractCommentsFromPost,
    extractNumFromStr
};
