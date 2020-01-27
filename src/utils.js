const { createObjectCsvWriter } = require('csv-writer');
const { WIKIPEDIA_CSV_HEADER , BLUE_COLOR, RESET_COLOR, GREEN_COLOR} = require('./constants')
const print = console.log
const figlet = require('figlet')



const WriteCSVFile = ({ path, records }) => {    
        
    const csvWriter = createObjectCsvWriter({ path, header: WIKIPEDIA_CSV_HEADER })
    
    return new Promise((resolve, reject) => {
        csvWriter.writeRecords(records)       // returns a promise
            .then( () => resolve("File has been save"))
            .catch( () => reject("Error happens when writing csv file"))
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


module.exports = {
    banner,
    filterContent,
    WriteCSVFile
}