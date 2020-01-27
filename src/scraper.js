const cheerio = require('cheerio')
const request = require('request-promise')
const { WIKIPEDIA_TARGET_URL, WIKIPEDIA_BASE_URL, WIKIPEDIA_WORDS_MAX } = require('./constants')
const { filterContent } = require('./utils')




const WikipediaScraper = ({ limit, search, offset }) => {
    const options = {
        uri: WIKIPEDIA_TARGET_URL({ limit, offset, search }),
        transform: function (body) {
            return cheerio.load(body)
        }
    }

    return new Promise((resolve, reject) => {
        request(options)
            .then(function ($) {
                let result = new Array

                $('.mw-search-result').each(function (index, el) {

                    result.push({
                        'id': index + 1,
                        'title': $(el).children('.mw-search-result-heading').text(),
                        'url': WIKIPEDIA_BASE_URL + $(el).children('.mw-search-result-heading').children('a').attr('href'),
                        'content': filterContent({
                            string: $(el).children('.searchresult').text(),
                            stringLength: WIKIPEDIA_WORDS_MAX
                        })
                    })
                })

                resolve(result)


            })
            .catch(function (err) {
                reject(err)
            })
    })

};


module.exports = {
    WikipediaScraper
}

