# Project: Binary Search Trees (BST)
This is my code solution for the BST mini project.

## Contents
- `main.js`: the simple driver script to test the code
- `node.js`
    - Attributes
        - `data`: contains the value or information of the node
        - `left`: contains the pointer to the node's left node or null if there is none
        - `right`: contains the pointer to the node's right node or null if there is none
- `tree.js`
    - `root`: contains the root node of the BST
    - Functions
        - `buildTree(array)`: accepts a sorted `array` (with no duplicates) and returns the root node of the BST
        - `prettyPrint(node, prefix = '', isLeft = true)`: accepts a `node`, a `prefix` (default is a blank string) and a boolean parameter (`isLeft`, default is set to true), and the BST structure of the node is printed through `console.log` 