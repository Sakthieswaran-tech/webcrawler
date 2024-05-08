function sortPages(pages){
    const pageEntries = Object.entries(pages)
    pageEntries.sort((a, b) => b[1] - a[1]);
    console.log("==========REPORT==========");
    for(const page of pageEntries){
        console.log(`Found ${page[1]} links to page: ${page[0]}`);
    }
    console.log("==========END OF REPORT==========");
}

module.exports = sortPages;