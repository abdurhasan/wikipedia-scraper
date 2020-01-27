const querystring = require('querystring')
const path = require('path')


const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org'
const WIKIPEDIA_LIMIT_MAX = 591
const WIKIPEDIA_WORDS_MAX = 100
const WIKIPEDIA_CSV_HEADER = [
    { id: 'id', title: 'ID' },
    { id: 'title', title: 'Title' },
    { id: 'content', title: 'Content' },
    { id: 'url', title: 'Url' }

]

const PATH_CSV_FILE = path.resolve(__dirname, `./files/wikipedia-scraping-${Date.now()}.csv`)


const WIKIPEDIA_TARGET_URL = ({ limit, offset, search }) => {
    const result = querystring.encode({ limit, offset, search })
    return `https://en.wikipedia.org/w/index.php?${result}`
}

const RESET_COLOR = "\x1b[0m"
const GREEN_COLOR = "\x1b[32m"
const YELLOW_COLOR = "\x1b[33m"
const BLUE_COLOR = "\x1b[34m"
const RED_COLOR = "\x1b[31m"
const WHITE_COLOR = "\x1b[37m"


module.exports = {
    PATH_CSV_FILE,
    WIKIPEDIA_BASE_URL,
    WIKIPEDIA_TARGET_URL,
    WIKIPEDIA_LIMIT_MAX,
    WIKIPEDIA_WORDS_MAX,
    WIKIPEDIA_CSV_HEADER,
    YELLOW_COLOR,
    BLUE_COLOR,
    RED_COLOR,
    RESET_COLOR,
    GREEN_COLOR,
    WHITE_COLOR
}

