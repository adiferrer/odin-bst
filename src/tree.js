import Node from './node.js';
import mergeSort from './merge-sort.js';

/**
   * Builds a binary search tree from the given array.
   * @param {Array} arr - The array to be converted to a binary search tree.
   * @returns {Object} The root node of the binary search tree.
   */
function buildTree(arr) {
  const sortedArr = mergeSort([...new Set(arr)]);

  const build = (start, end) => {
    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const node = Node(sortedArr[middle]);

    node.left = build(start, middle - 1);
    node.right = build(middle + 1, end);

    return node;
  };

  return build(0, sortedArr.length - 1);
}

/**
 * Represents a binary search tree.
 * @param {Array} array - Initial values to populate the tree.
 * @returns {Object} Tree object with various methods.
 */
function Tree(array) {
  let root = buildTree(array);

  /**
   * Pretty prints the tree structure starting from the given node.
   * @param {Object} node - The starting node for pretty printing.
   * @param {string} prefix - The prefix for indentation.
   * @param {boolean} isLeft - Indicates if the current node is the left child.
   */
  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  /**
   * Inserts a value into the binary search tree.
   * @param {*} value - The value to be inserted.
   */
  const insert = (value) => {
    if (root === null) {
      root = Node(value);
      return;
    }

    let current = root;
    while (true) {
      if (value === current.data) {
        return; // Value already exists, do nothing
      }
      if (value < current.data) {
        if (current.left === null) {
          current.left = Node(value);
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = Node(value);
          break;
        }
        current = current.right;
      }
    }
  };

  /**
   * Deletes a node with the given value from the binary search tree.
   * @param {*} value - The value to be deleted.
   */
  const deleteNode = (value) => {
    let current = root;
    let parent = null;
    let isLeftChild = false;

    while (current !== null) {
      if (value === current.data) {
        break;
      } else if (value < current.data) {
        parent = current;
        current = current.left;
        isLeftChild = true;
      } else {
        parent = current;
        current = current.right;
        isLeftChild = false;
      }
    }

    if (current === null) {
      return; // Node not found
    }

    if (current.left === null && current.right === null) { // Case 1: Node has no children
      if (parent === null) {
        root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.left === null) { // Case 2: Node has one child (left or right)
      if (parent === null) {
        root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.right === null) {
      if (parent === null) {
        root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else { // Case 3: Node has two children
      let successorParent = current;
      let successor = current.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      current.data = successor.data;
      deleteNode(successor.data);
    }
  };

  /**
   * Finds a node with the given value in the binary search tree.
   * @param {*} value - The value to be found.
   * @returns {Object|null} The found node or null if not found.
   */
  const find = (value) => {
    let current = root;

    while (current !== null) {
      if (value === current.data) {
        return current; // Found the node with the value
      } if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null; // Value not found
  };

  /**
   * Traverses the tree in breadth-first level order and
   * invokes the provided function for each node.
   * If no function is provided, returns an array of values in breadth-first order.
   * @param {Function} [func] - A function to be invoked for each node.
   * @returns {Array} An array of node values if no function is provided.
   */
  const levelOrder = (func) => {
    const result = [];
    if (!func) {
      func = (node) => result.push(node.data);
    }

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      const queue = [node];
      while (queue.length > 0) {
        const current = queue.shift();
        func(current);

        if (current.left !== null) {
          queue.push(current.left);
        }
        if (current.right !== null) {
          queue.push(current.right);
        }
      }
    };

    traverse(root);
    return result;
  };

  /**
   * Traverses the tree in inorder (left-root-right) depth-first order
   * and invokes the provided function for each node.
   * If no function is provided, returns an array of values in inorder order.
   * @param {Function} [func] - A function to be invoked for each node.
   * @returns {Array} An array of node values if no function is provided.
   */
  const inorder = (func) => {
    const result = [];
    if (!func) {
      func = (node) => result.push(node.data);
    }

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      traverse(node.left);
      func(node);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };

  /**
   * Traverses the tree in preorder (root-left-right) depth-first order
   * and invokes the provided function for each node.
   * If no function is provided, returns an array of values in preorder order.
   * @param {Function} [func] - A function to be invoked for each node.
   * @returns {Array} An array of node values if no function is provided.
   */
  const preorder = (func) => {
    const result = [];
    if (!func) {
      func = (node) => result.push(node.data);
    }

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      func(node);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return result;
  };

  /**
   * Traverses the tree in postorder (left-right-root) depth-first order
   * and invokes the provided function for each node.
   * If no function is provided, returns an array of values in postorder order.
   * @param {Function} [func] - A function to be invoked for each node.
   * @returns {Array} An array of node values if no function is provided.
   */
  const postorder = (func) => {
    const result = [];
    if (!func) {
      func = (node) => result.push(node.data);
    }

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      func(node);
    };

    traverse(root);
    return result;
  };

  /**
   * Calculates the height of a node in the binary search tree.
   * @param {Object} node - The node for which to calculate the height.
   * @returns {number} The height of the node.
   */
  const height = (node) => {
    if (node === null) {
      return -1;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  /**
   * Calculates the depth of a node in the binary search tree.
   * @param {Object} node - The node for which to calculate the depth.
   * @returns {number} The depth of the node.
   */
  const depth = (node) => {
    if (node === null) {
      return -1;
    }

    let currentNode = root;
    let currentDepth = 0;

    while (currentNode !== null) {
      if (node === currentNode) {
        return currentDepth;
      } if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      currentDepth++;
    }

    return -1;
  };

  /**
   * Checks if the binary search tree is balanced.
   * @param {Object} [node=root] - The node to check for balance.
   * @returns {boolean} True if the tree is balanced, false otherwise.
   */
  const isBalanced = (node = root) => {
    if (node === null) {
      return true; // Empty subtree is balanced
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    const heightDifference = Math.abs(leftHeight - rightHeight);

    return heightDifference <= 1 && isBalanced(node.left) && isBalanced(node.right);
  };

  /**
   * Rebalances an unbalanced binary search tree.
   */
  const rebalance = () => {
    const values = [];

    inorder((node) => values.push(node.data));
    // console.log('Collected values: ', values);

    root = buildTree(values);
    // console.log(root)
  };

  return {
    prettyPrint,
    insert,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export default Tree;
