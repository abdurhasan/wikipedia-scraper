const { ArgumentParser } = require('argparse')
const { PATH_CSV_FILE , WIKIPEDIA_LIMIT_MAX } = require('./src/constants')
const { banner }   = require('./src/utils')


function parse_args() {
    const parser = new ArgumentParser()
    
    parser.addArgument(['-S', '--search'], { help: "Key word to be scraped", type: 'string', required: true })    
    parser.addArgument(['-L', '--limit'], { help: 'Amount data to be scraped', type: 'int' })
    parser.addArgument(['-O', '--output'], { help: 'Location CSV File to be saved '})        
    
    return parser.parseArgs()
}


const args = parse_args() // Function parse_args returns an object    
let search = args.search
let limit = args.limit    
let output = args.output    
let offset = WIKIPEDIA_LIMIT_MAX % limit

if (!limit || isNaN(limit) || limit <= 0) limit = 10
if (!search) search = search ? search : ''
if (!output) output = PATH_CSV_FILE


// banner()



