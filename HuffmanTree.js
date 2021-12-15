const MinHeap = require('./MinHeap.js');
const HeapItem = require('./HeapItem.js');
const TreeNode = require('./TreeNode.js');

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
  //    extract min and add to the right child of the new node,
  //    extract min and add to the left child of the new node,
  //    set the new node key to the sum {left, right}
  //    add to the heap.
  // extract min and return as the root.
  _buildTree(freq) {
    const comparator = (a, b) => {
      if (a.priority === b.priority) {
        return a.item.val - b.item.val
      }
      return a.priority - b.priority;
    };
    const heap = new MinHeap(comparator);
    Object.keys(freq).forEach(key => {
      const node = new TreeNode(key);
      const entry = new HeapItem(node, freq[key]);
      heap.push(entry);
    })
    while (heap.size() > 1) {
      const node = new TreeNode();
      const entry1 = heap.pop();
      const entry2 = heap.pop();
      node.right = entry1.item;
      node.left = entry2.item;
      const priority = entry1.priority + entry2.priority;
      const entry = new HeapItem(node, priority);
      heap.push(entry);
    }
    return heap.pop().item;
  }

  // todo utility function to store characters along with
  // their huffman value in a hash map
  // input: huffmanTree
  // output: codes as bit mapping. e.g. { "a": "0", "b": "10", "c": "11" }
  // Algorithm:
  // DFS visit each leaf node and add the node value as the key 
  // to the hashmap, and add the in-order path as the value to // its entry.
  _storeCodes(huffmanTree) {
    const map = {};
    const dfs = (node, path) => {
      if (!node) {
        return;
      }
      if (!node.left && !node.right) {
        map[node.val] = path;
        return;
      }
      if (node.left) dfs(node.left, path + '0');
      if (node.right) dfs(node.right, path + '1');
    }
    dfs(huffmanTree, '', huffmanTree.val);
    return map;
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
  // Alternative algorithm:
  // for each code, create the binary tree if not exists.
  _restoreTree(codes) {
    const huffmanTree = new TreeNode();
    const dfs = (node, path, char) => {
      if (path.length === 0) return;
      const bit = path.substring(0, 1);
      if (path.length === 1) {
        const leaf = new TreeNode(char);
        if (bit === '1') node.right = leaf;
        if (bit === '0') node.left = leaf;
        return;
      }
      const emptyNode = new TreeNode();
      const nextPath = path.substring(1);
      if (bit === '1') {
        if (!node.right) node.right = emptyNode;
        dfs(node.right, nextPath, char);
      }
      if (bit === '0') {
        if (!node.left) node.left = emptyNode;
        dfs(node.left, nextPath, char);
      }
    }
    Object.keys(codes).forEach(char => {
      dfs(huffmanTree, codes[char], char);
    })
    return huffmanTree;
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
    const freq = {};
    for (let c of str) {
      if (freq[c] === undefined) {
        freq[c] = 1;
      } else {
        freq[c] += 1;
      }
    }
    const huffmanTree = this._buildTree(freq);
    const codes = this._storeCodes(huffmanTree);
    const sb = [];
    for (let c of str) {
      sb.push(codes[c]);
    }
    return [sb.join(''), codes];
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
    const huffmanTree = this._restoreTree(codes);
    return this.decodeFromTree(str, huffmanTree);
  }

  decodeFromTree(str, huffmanTree) {
    const sb = [];
    let currentNode = huffmanTree;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '0') {
        currentNode = currentNode.left;
      } 
      if (str[i] === '1') {
        currentNode = currentNode.right;
      }
      if (currentNode.val !== undefined) {
        sb.push(currentNode.val);
        // reset pointer to the top of the tree
        currentNode = huffmanTree;
      } 
    }
    return sb.join('');
  }
}

module.exports = HuffmanTree;





