const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
    console.log('Actively crawling :',currentURL, ' Base URL :',baseURL);
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL] = 1;
    try {
        const response = await fetch(currentURL);
        if(response.status > 399){
            console.log('Error in fetch with status code : ',response.status, ' on page : ',currentURL);
            return pages;
        }
        const contentType = response.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log('non-html response, content type : ',contentType, 'on page : ', currentURL);
            return pages;
        }
        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages);
        }
        return pages;
    } catch (error) {
        console.log(error.message);
    }
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const links of linkElements){
        if(links.href.slice(0, 1) === '/'){
            try{
                const url = new URL(baseURL+links.href);
                urls.push(url.href);
            }catch(err){
                console.log('Error with relative url ',err.message,baseURL, links.href);
            }
        }else{
            try{
                const url = new URL(links.href);
                urls.push(url.href);
            }catch(err){
                console.log('Error with absolute url ',err.message);
            }
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const url = new URL(urlString);
    const hostPath = url.hostname+url.pathname;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};