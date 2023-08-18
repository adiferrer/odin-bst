/* eslint-disable prefer-const */
import Tree from './tree.js';

function randomNumberArray(arraySize = 10) {
  let array = [];

  while (array.length < arraySize) {
    let randomNumber = Math.round(Math.random() * 100);
    if (randomNumber !== 0 && !array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }

  return array;
}

function test() {
  let array = randomNumberArray();
  let tree = new Tree(array);
  tree.prettyPrint(tree.root);

  // testing insert
  console.log('Inserting 50');
  tree.insert(50);
  tree.prettyPrint(tree.root);

  console.log('Inserting 10');
  tree.insert(10);
  tree.prettyPrint(tree.root);

  // testing deleteNode
  console.log('Deleting 50');
  tree.deleteNode(50);
  tree.prettyPrint(tree.root);

  // testing find
  console.log('Finding 10');
  console.log(tree.find(10));

  // testing levelOrder
  console.log('Level order traversal');
  console.log(tree.levelOrder());

  // testing inorder
  console.log('Inorder traversal');
  console.log(tree.inorder());

  // testing preorder
  console.log('Preorder traversal');
  console.log(tree.preorder());

  // testing postorder
  console.log('Postorder traversal');
  console.log(tree.postorder());
}

test();
