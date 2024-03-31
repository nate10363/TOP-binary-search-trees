/* eslint-disable no-cond-assign */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const masterArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArr = masterArray.sort((a, b) => a - b);

const sortArr = () => {
  sortedArr.sort((a, b) => a - b);
};
const cleanedArr = () => {
  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] === sortedArr[i + 1]) {
      sortedArr.splice(i, 1);
    }
  }
  return sortedArr;
};
cleanedArr();

class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
    this.result = [];
    this.q = [];
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    // eslint-disable-next-line radix
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(value, node = this.root, previousNode = node) {
    if (node.data === value) {
      console.log('this value already exists');
      return;
    }

    if (value < node.data && (previousNode.left)) {
      return this.insert(value, node.left);
    }
    if (value > node.data && (previousNode.right)) {
      previousNode = previousNode.right;
      return this.insert(value, node.right);
    }

    if (value < node.data && !node.left) {
      node.left = new Node(value);
      masterArray.push(value);
      sortArr();
      return;
    }
    if (value > node.data && !node.right) {
      node.right = new Node(value);
      masterArray.push(value);
      sortArr();
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  delete(value, node = this.root, previousNode = node) {
    if (!this.has(value)) {
      return;
    }

    if (!node) {
      return;
    }

    // logic for deleting node without children
    if (node.data == value && !node.left && !node.right) {
      if (previousNode.left) {
        previousNode.left = null;
      }
      if (previousNode.right) {
        previousNode.right = null;
      }
      for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] == value) {
          masterArray.splice(i, 1);
        }
      } return;
    }

    // logic for deleting node with only one child
    if (node.data == value && ((node.left && !node.right) || (node.right && !node.left))) {
      if (previousNode.left.data == value) {
        previousNode.left = node.left || node.right;
      }
      if (previousNode.right.data == value) {
        previousNode.right = node.right;
      }
      for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] == value) {
          masterArray.splice(i, 1);
        }
      } return;
    }

    // logic for deleting node with two childred
    if (node.data == value && node.left && node.right) {
      let temp = node.left;
      let previousTemp = node;
      // while loop sets up top level node with right-most child of left node
      while (temp.right) {
        previousTemp = temp;
        temp = temp.right;
      }
      node.data = temp.data;
      previousTemp.right = null;
      for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] == value) {
          masterArray.splice(i, 1);
        }
      }
    }

    if (node.data != value) {
      this.delete(value, node.left, node);
      this.delete(value, node.right, node);
    }
  }

  has(value) {
    for (let i = 0; i < masterArray.length; i++) {
      if (masterArray[i] == value) {
        return true;
      }
    }
    return false;
  }

  find(value, node = this.root) {
    if (!this.has(value)) {
      return console.log('no such value in tree');
    }

    if (!node) {
      return;
    }

    if (node.data == value) {
      return console.log('The node which you desire: ', node);
    }

    this.find(value, node.right);
    this.find(value, node.left);
  }

  levelOrder(root = this.root, q = [], result = []) {
    if (!root) {
      return [];
    }
    q.push(root);

    while (q.length) {
      const currentNode = q.shift();
      result.push(currentNode.data);

      if (currentNode.left) {
        q.push(currentNode.left);
      }

      if (currentNode.right) {
        q.push(currentNode.right);
      }
    }
    return result;
  }

  inOrder(root = this.root, result = []) {
    if (!root) {
      return;
    }
    this.inOrder(root.left, result);
    result.push(root.data);
    this.inOrder(root.right, result);
    return result;
  }

  preOrder(root = this.root, result = []) {
    if (!root) {
      return;
    }
    result.push(root.data);
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);
    return result;
  }

  postOrder(root = this.root, result = []) {
    if (!root) {
      return;
    }
    this.postOrder(root.left, result);
    this.postOrder(root.right, result);
    result.push(root.data);
    return result;
  }

  height(node = this.root) {
    if (!node) {
      return 0;
    }

    const leftDepth = this.height(node.left);
    const rightDepth = this.height(node.right);

    if (leftDepth > rightDepth) {
      return (leftDepth + 1);
    }
    return (rightDepth + 1);
  }

  depth(value, node = this.root) {
    if (!node) {
      return 'Value not in tree';
    }

    let dist = -1;
    if (node.data == value
      || (dist = this.depth(value, node.left)) >= 0
      || (dist = this.depth(value, node.right)) >= 0) {
      return dist + 1;
    }
    return dist;
  }

  isBalanced(node = this.root) {
    if (!node) {
      return 'Tree is empty';
    }

    const leftDepth = this.height(node.left);
    const rightDepth = this.height(node.right);

    const difference = Math.abs(leftDepth - rightDepth);

    if (difference <= 1) {
      return true;
    }
    return false;
  }

  rebalance(node = this.root) {
    if (!node) {
      return 'Tree is empty';
    }
    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
  }
}

const tree = new Tree(sortedArr, 0, sortedArr.length - 1);
console.log(tree);
