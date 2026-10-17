const assert = require('assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');

function htmlFiles(directory = '.') {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) return entry.name === '.git' ? [] : htmlFiles(file);
        return entry.isFile() && file.endsWith('.html') ? [file] : [];
    });
}

function attributes(source) {
    return Object.fromEntries([...source.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/gs)]
        .map(([, name, , value]) => [name.toLowerCase(), value]));
}

const pages = htmlFiles();

test('party and menu redirect home and have no internal links', () => {
    for (const file of pages) {
        const html = fs.readFileSync(file, 'utf8');
        const pageUrl = new URL(`/${file.replaceAll(path.sep, '/')}`, 'https://example.test');

        for (const [, source] of html.matchAll(/<a\b([^>]*)>/gi)) {
            const href = attributes(source).href;
            if (!href) continue;
            const target = new URL(href, pageUrl);
            assert(!['/party/', '/menu/'].includes(target.pathname.replace(/\/?$/, '/')), `${file} links to ${target.pathname}`);
        }
    }

    for (const route of ['party', 'menu']) {
        const html = fs.readFileSync(`${route}/index.html`, 'utf8');
        const refresh = [...html.matchAll(/<meta\b([^>]*)>/gi)]
            .map(([, source]) => attributes(source))
            .find((attrs) => attrs['http-equiv']?.toLowerCase() === 'refresh');
        assert(refresh, `${route} should redirect on direct visits`);

        const destination = refresh.content.match(/\burl\s*=\s*([^;]+)/i)?.[1].trim();
        assert(destination, `${route} refresh should specify a destination`);
        assert.strictEqual(new URL(destination, `https://example.test/${route}/`).pathname, '/', `${route} should redirect home`);
    }
});
