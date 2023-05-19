import Node from './node.js';
import mergeSort from './merge-sort.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(mergeSort(array)
      .filter((item, pos, ary) => !pos || item !== ary[pos - 1]));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1, array.length));

    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value) {}

  remove(value) {}

  find(value) {}

  levelOrder(func) {}

  inorder(func) {}

  preorder(func) {}

  postorder(func) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
