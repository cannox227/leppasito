const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { getVisibleStep, questions, verifyPassword } = require('./gift.js');

const passwordDigest = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

test('password verification accepts only a matching SHA-256 digest', async () => {
    assert.equal(await verifyPassword('password', passwordDigest), true);
    assert.equal(await verifyPassword('not the password', passwordDigest), false);
});

test('the supplied photo is displayed in the final reveal', () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const reveal = html.match(/<section class="gift-reveal"[\s\S]*?<\/section>/)?.[0];
    const photo = reveal?.match(/<img\b[^>]*id="gift-photo"[^>]*>/)?.[0];

    assert.ok(photo, 'final reveal should include the gift photo');
    assert.match(photo, /src="\.\.\/media\/gift\.jpg"/);
    assert.match(photo, /alt="[^"]+"/);
    assert.doesNotMatch(photo, /loading="lazy"/);
    assert.ok(fs.existsSync(path.resolve(__dirname, '../media/gift.jpg')));
});

test('the artist name appears only on the final reveal screen', () => {
    assert.equal(questions.length, 8);
    for (let index = 0; index < questions.length; index += 1) {
        const screen = getVisibleStep(index);
        assert.equal(screen.type, 'question');
        assert.doesNotMatch(JSON.stringify(screen), /Zucchero/i);
    }

    const reveal = getVisibleStep(questions.length);
    assert.equal(reveal.type, 'reveal');
    assert.match(reveal.content, /Zucchero/);
});
