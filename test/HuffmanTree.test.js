const assert = require('assert');
const { HuffmanTree } = require('../index.js');

const huffman = new HuffmanTree();
const str = 'abacab';
/*
      x
    0/ \1
  a(3)  x
      0/ \1
    b(2) c(1)
*/
const [encoded, codes] = huffman.encode(str);
const expectedEncoded = '010011010';
assert.equal(encoded, expectedEncoded, 'Encoded string should be the same');
assert.deepEqual(codes, {
  a: '0',
  b: '10',
  c: '11',
}, 'Codes bit map should be the same');

const decoded = huffman.decodeFromCodes(expectedEncoded, codes);
assert.equal(decoded, str, 'Decoded string should be the same');

console.log('All tests passed');