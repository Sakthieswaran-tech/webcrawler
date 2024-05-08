const { crawlPage } = require("./crawl");

async function main(){
    if(process.argv.length < 3){
        console.log('No website provided');
        process.exit(1);
    }else if(process.argv.length > 3){
        console.log('Too many websites');
        process.exit(1);
    }
    const baseURL = process.argv[2];
    console.log('Started crawling');
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(pages);
}

main();