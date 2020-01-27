#!/usr/bin/env node
const Path = require('path')
const rootModule = Path.resolve(__dirname, '../');
const { PATH_CSV_FILE, WIKIPEDIA_LIMIT_MAX, BLUE_COLOR, RESET_COLOR, YELLOW_COLOR } = require(rootModule + '/src/constants')
const { banner, WriteCSVFile, parse_args } = require(rootModule + '/src/utils')
const { WikipediaScraper } = require(rootModule + '/src/scraper')

const cluster = require('cluster')

let _data = new Array


if (cluster.isMaster) {

    const args = parse_args() // Function parse_args returns an object    
    let search = args.search
    let limit = args.limit
    let output = args.output

    if (!limit || isNaN(limit) || limit <= 0) limit = 10
    if (!search) search = search ? search : ''
    if (!output) output = PATH_CSV_FILE
    if (Path.extname(output) !== '.csv') output += '.csv'
    banner()

    const loop = Math.ceil(limit / WIKIPEDIA_LIMIT_MAX)

    for (let index = 0; index < loop; index++) {
        let worker = cluster.fork()

        if (limit > WIKIPEDIA_LIMIT_MAX) {

            worker.send({ search, limit: WIKIPEDIA_LIMIT_MAX, offset: index });
            limit = limit - WIKIPEDIA_LIMIT_MAX
        } else {

            worker.send({ search, limit, offset: index });

        }



        worker.on('message', function (msg) {
            _data.push(...msg)
            worker.kill()
            if (_data.length == args.limit) {
                WriteCSVFile({ path: output, records: _data })
                    .then(snap => {
                        console.log(`${BLUE_COLOR} ${snap} .\n ${RESET_COLOR} Look at your File : ${YELLOW_COLOR} ${output} \n`)
                        process.exit()
                    })

            }
        });

    }




    cluster.on('death', function (worker) {
        console.log('Worker ' + worker.pid + ' died.');
    });



} else {
    process.on('message', ({ limit, search, offset }) => {
        WikipediaScraper({ limit, search, offset }).then(snap => {
            process.send(snap)

        })
    });
}

