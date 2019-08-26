# hacker-news-scraper
A web scraper built in nodejs to pull the latest posts from hackernews


## Getting Started

### Prerequisites
You must have node and npm installed in order to run this application

### Libraries Used
* [request](https://github.com/request/request) - A simple library used to make http calls. I used this library as it is
 lightweight and easy to use.
* [cheerio](https://github.com/cheeriojs/cheerio) - A Library used to parse html. I used this library as it seemed to be
 the most popular way to web scrape with javascript.
* mocha - Test framework
* chai - Assertion library


### Installing
Clone this repository to your computer, navigate to the hacker-news-scraper directory and run:
```
$ npm install
```

## Running the tests
Run:
```
$ npm test
```

## Running the application

To run the application, navigate to the hacker-news-scraper directory and run the command:
```
$ node hackernews -n
```
where -n is the number of posts you want to print
