const { MinHeap } = require('./index.js');
 
class HuffmanTree {

  // Build Huffman tree
  // input: freq - character frequency dict (byte length mapping) e.g. { "a": 3, "b": 2, "c": 1 }
  // output: HuffmanTree
  // Algorithm: Build tree bottom up
  // Construct a Huffman tree from character frequency.
  // scan of char frequency map
  // create each single node binary tree node for each char and add to the heap.
  // while heap.size > 1
  //    create an empty single node binary tree
  //    extract min and add to the left child of the new node,
  //    extract min and add to the right child of the new node,
  //    set the new node key to the sum {left, right}
  //    add to the heap.
  // extract min and return as the root.
  _buildTree(freq) {

  }

  // todo utility function to store characters along with
  // their huffman value in a hash map
  // input: huffmanTree
  // output: codes as bit mapping. e.g. { "a": "0", "b": "10", "c": "11" }
  // Algorithm:
  // DFS visit each leaf node and add the node value as the key // to the hashmap, and add the in-order path as the value to // its entry.
  _storeCodes(huffmanTree) {

  }

  // restore a huffman tree from bit mapping
  // input: codes as bit mapping. e.g. { "a": "0", "b": "10", "c": "11" }
  // output: huffman tree
  // Algorithm: Build the tree bottom up
  // Scan the bit map 
  // create a single node of each char and add to a max heap
  // while heap.size > 1
  //    create an empty single node binary tree Z
  //    extract max e1
  //      if the last bit of e1 is 1, Z.right = e1
  //      else Z.left = e1
  //    peek max e2
  //      if len(e2) == len(e1), they are on the same level, 
  //        extract max e2
  //        if the last bit of e2 is 1, Z.right = e2
  //        else Z.left = e2
  //    set Z.val = e1 without last bit
  //    add Z to the heap.
  // return extract max
  _restoreTree(codes) {

  }

  // todo Encode string with bit length mapping.
  // input: string to be encoded 
  // output: 
  //   encoded string in binary format (0/1)
  //   huffman codes as bit mapping  e.g. { "a": "0", "b": "10", "c": "11" }
  // Algorithm:
  // build byte length mapping (character frequency dict)
  // build huffman tree
  // build bit map
  //    traverse huffman tree, store each character and its path 
  //    in order to a hash map
  // encode string
  //    for each char in string, replace it with bit map path.
  encode(str) {

  }

  // todo Decode encoded string with a Huffman tree.
  // input: encoded string in binary format (0/1)
  //        codes as bit mapping. e.g. { "a": "0", "b": "10", "c": "11" }
  // output: decoded string
  // Algorithm:
  // for each directional bit:
  //    make one visit in the huffman tree
  //    until the node is a leaf node, 
  //    return the leaf node value.
  decodeFromCodes(str, codes) {

  }

  decodeFromTree(str, huffmanTree) {

  }
}

module.exports = HuffmanTree;





