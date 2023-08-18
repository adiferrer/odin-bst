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
  tree.prettyPrint();

  console.log('Is tree balanced? ', tree.isBalanced());

  // insert numbers to make tree unbalanced
  for (let i = 0; i < 10; i++) {
    tree.insert(Math.round(Math.random() * 100));
  }

  console.log('Is tree balanced? ', tree.isBalanced());

  console.log('Rebalancing tree...');
  tree.rebalance();
  tree.prettyPrint();

  console.log('Is tree balanced? ', tree.isBalanced());
}

test();
