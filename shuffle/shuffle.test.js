const assert = require('assert');
const { extractVideoId, pickVideo, shuffleVideos, getVideoTitle, chatGptUrl } = require('./shuffle.js');

assert.strictEqual(extractVideoId('https://www.youtube.com/watch?v=7DQ53W_cens'), '7DQ53W_cens');
assert.strictEqual(getVideoTitle({ title: 'Fritto Misto' }), 'Fritto Misto');
assert.strictEqual(chatGptUrl('https://youtu.be/example'), 'https://chatgpt.com/?q=Explain%20what%20this%20YouTube%20video%20is%20about%20in%20English.%20Video%20URL%3A%20https%3A%2F%2Fyoutu.be%2Fexample');
assert.strictEqual(pickVideo(['first', 'second', 'third'], 0.5), 'second');
const randomValues = [0.5, 0];
let randomIndex = 0;
assert.deepStrictEqual(
    shuffleVideos(['first', 'second', 'third'], () => randomValues[randomIndex++]),
    ['third', 'first', 'second']
);
assert.strictEqual(extractVideoId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
assert.strictEqual(extractVideoId('not a YouTube link'), null);

console.log('shuffle tests passed');
