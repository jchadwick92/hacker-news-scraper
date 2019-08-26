const {
    extractRankFromPost,
    extractTitleFromPost,
    extractUriFromPost,
    extractAuthorFromPost,
    extractPointsFromPost,
    extractCommentsFromPost,
    extractNumFromStr
} = require('./hackernews');
const chai = require('chai');
const expect = chai.expect;
const cheerio = require('cheerio');

const tableHtml = `
              <table class="itemlist">
                <tbody>
                  <tr class="athing" id="20796446">
                    <td align="right" valign="top" class="title"><span class="rank">1.</span></td>
                    <td valign="top" class="votelinks"><a id="up_20796446" href="vote?id=20796446&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td>
                    <td class="title"><a href="https://blog.bi0s.in/2019/08/24/Pwn/VM-Escape/2019-07-29-qemu-vm-escape-cve-2019-14378/" class="storylink">QEMU VM Escape</a><span class="sitebit comhead"> (<a href="from?site=blog.bi0s.in"><span class="sitestr">blog.bi0s.in</span></a>)</span></td>
                  </tr>
                  <tr>
                    <td colspan="2"></td>
                    <td class="subtext"><span class="score" id="score_20796446">197 points</span> by <a href="user?id=ngaut" class="hnuser">ngaut</a> <span class="age"><a href="item?id=20796446">8 hours ago</a></span> <span id="unv_20796446"></span> | <a href="hide?id=20796446&amp;goto=news">hide</a> | <a href="item?id=20796446">30&nbsp;comments</a></td>
                  </tr>    
                  <tr class="spacer" style="height:5px"></tr>
                </tbody>
              </table>`;

const $ = cheerio.load(tableHtml);
const table = $('table.itemlist tbody');
const post = $(table.children()[0]);

describe('extractRankFromPost', () => {
    it('should return the rank from the post', () => {
        expect(extractRankFromPost(post)).to.equal(1)
    });
    it('should be a number', () => {
        expect(extractRankFromPost(post)).to.be.a('number')
    })
});

describe('extractTitleFromPost', () => {
    it('should return the title from the post', () => {
        expect(extractTitleFromPost(post)).to.equal('QEMU VM Escape')
    });
    it('should be less than 256 characters', () => {
        expect(extractTitleFromPost(post).length).to.be.at.most(256)
    })
});

describe('extractUriFromPost', () => {
    it('should return the uri from the post', () => {
        expect(extractUriFromPost(post)).to.equal('https://blog.bi0s.in/2019/08/24/Pwn/VM-Escape/2019-07-29-qemu-vm-escape-cve-2019-14378/')
    });
});

describe('extractAuthorFromPost', () => {
    it('should return the author from the post', () => {
        expect(extractAuthorFromPost(post)).to.equal('ngaut')
    });
    it('should be less than 256 characters', () => {
        expect(extractAuthorFromPost(post).length).to.be.at.most(256)
    })
});

describe('extractPointsFromPost', () => {
    it('should return the points from the post', () => {
        expect(extractPointsFromPost(post)).to.equal(197)
    });
    it('should be a number', () => {
        expect(extractPointsFromPost(post)).to.be.a('number')
    })
});

describe('extractCommentsFromPost', () => {
    it('should return the comments from the post', () => {
        expect(extractCommentsFromPost(post)).to.equal(30)
    });
    it('should be a number', () => {
        expect(extractCommentsFromPost(post)).to.be.a('number')
    })
});

describe('extractNumFromStr', () => {
    it('should return an integer', () => {
        expect(extractNumFromStr('123 abc def')).to.be.a('number');
    });
    it('should return 0 if no numbers in string', () => {
        expect(extractNumFromStr('abc def')).to.equal(0);
    });
});

