# Balanced Binary Search Tree (BST) Implementation

## Overview
This project implements a Balanced Binary Search Tree in JavaScript, providing a comprehensive set of tree operations and traversal methods.

## Features
- Create a balanced BST from an array
- Insert and delete nodes
- Multiple traversal methods:
  - Level-order (breadth-first)
  - In-order, Pre-order, Post-order (depth-first)
- Find nodes
- Calculate node height and depth
- Check tree balance
- Rebalance the tree
- Pretty print tree structure

## Getting Started

### Prerequisites
- Node.js installed

### Installation
1. Clone the repository
2. Run the script with Node.js

```bash
node bst-implementation.js
```

## Methods
- `insert(value)`: Add a new value to the tree
- `deleteItem(value)`: Remove a value from the tree
- `find(value)`: Locate a specific node
- `levelOrder(callback)`: Breadth-first traversal
- `inOrder(callback)`: In-order depth-first traversal
- `preOrder(callback)`: Pre-order depth-first traversal
- `postOrder(callback)`: Post-order depth-first traversal
- `height(node)`: Calculate node's height
- `depth(node)`: Calculate node's depth
- `isBalanced()`: Check if tree is balanced
- `rebalance()`: Rebalance an unbalanced tree

## Example Usage
```javascript
const randomNumbers = createRandomArray(10, 100);
const tree = Tree(randomNumbers);
tree.insert(105);
tree.rebalance();
tree.prettyPrint();
```

## Contributing
Contributions are welcome. Please open an issue or submit a pull request.

## License
MIT License
