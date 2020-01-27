const { ArgumentParser } = require('argparse')
const { createObjectCsvWriter } = require('csv-writer')
const   figlet = require('figlet')
const { WIKIPEDIA_CSV_HEADER, BLUE_COLOR, RESET_COLOR, GREEN_COLOR, YELLOW_COLOR } = require('./constants')
const print = console.log




const WriteCSVFile = ({ path, records }) => {

    const csvWriter = createObjectCsvWriter({ path, header: WIKIPEDIA_CSV_HEADER })

    return new Promise((resolve, reject) => {
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => resolve("File has been save"))
            .catch(() => reject("Error happens when writing csv file"))
    })

}


const filterContent = ({ string, stringLength }) => {
    let _stringLength = stringLength ? stringLength : 100

    const words = string.trim().split(/[,. ]+/g)
    return words.slice(0, _stringLength).join(" ")
}

function banner() {
    figlet('Wikipedia Scraper', function (err, data) {
        print(`${BLUE_COLOR} ${data} ${RESET_COLOR} \n ======================================================== \n\n # Follow  ${GREEN_COLOR}: github.com/abdurhasan \n`)
    });
}
function parse_args() {
    const parser = new ArgumentParser()

    parser.addArgument(['-S', '--search'], { help: "Key word to be scraped", type: 'string', required: true })
    parser.addArgument(['-L', '--limit'], { help: 'Amount data to be scraped', type: 'int' })
    parser.addArgument(['-O', '--output'], { help: 'Location CSV File to be saved ' })

    return parser.parseArgs()
}

function parse_sucess(snap) {
    print(`${BLUE_COLOR} ${snap} .\n ${RESET_COLOR} Look at your File : ${YELLOW_COLOR} ${output} \n`)
}

module.exports = {
    banner,
    filterContent,
    WriteCSVFile,
    parse_args,
    parse_sucess
}