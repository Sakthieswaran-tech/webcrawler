const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('strip trailing slash', ()=>{
    const input = 'https://www.programiz.com/javascript/online-compiler/';
    const actual = normalizeURL(input);
    const expected = 'www.programiz.com/javascript/online-compiler';
    expect(actual).toEqual(expected);
});

test('capital normalize', ()=>{
    const input = 'https://www.Programiz.com/javascript/online-compiler/';
    const actual = normalizeURL(input);
    const expected = 'www.programiz.com/javascript/online-compiler';
    expect(actual).toEqual(expected);
});

test('strip http', ()=>{
    const input = 'https://www.programiz.com/javascript/online-compiler/';
    const actual = normalizeURL(input);
    const expected = 'www.programiz.com/javascript/online-compiler';
    expect(actual).toEqual(expected);
});

test('get absolute url from html', ()=>{
    const inputHTML = `
    <html>
        <body>
            <a href='https://www.google.com/'>
                Go to google
            </a>
        </body>
    </html>
    `
    const inputUrl = 'https://www.google.com/'
    const actual = getURLsFromHTML(inputHTML, inputUrl);
    const expected = ['https://www.google.com/'];
    expect(actual).toEqual(expected);
});

test('get relative url from html', ()=>{
    const inputHTML = `
    <html>
        <body>
            <a href='/path'>
                Relative url check
            </a>
            <a href='https://www.google.com/path1'>
                Url2 check
            </a>
        </body>
    </html>
    `
    const inputUrl = 'https://www.google.com'
    const actual = getURLsFromHTML(inputHTML, inputUrl);
    const expected = ['https://www.google.com/path', 'https://www.google.com/path1'];
    expect(actual).toEqual(expected);
});

test('invalid url', ()=>{
    const inputHTML = `
    <html>
        <body>
        <a href='invalid'>
                invalid url check
            </a>
            <a href='/path'>
                Relative url check
            </a>
            <a href='https://www.google.com/path1'>
                Url2 check
            </a>
        </body>
    </html>
    `
    const inputUrl = 'https://www.google.com'
    const actual = getURLsFromHTML(inputHTML, inputUrl);
    const expected = ['https://www.google.com/path', 'https://www.google.com/path1'];
    expect(actual).toEqual(expected);
});