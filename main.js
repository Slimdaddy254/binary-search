// Node factory function
const Node = (data) => {
    return {
      data,
      left: null,
      right: null
    };
  };
  
  // Tree factory function
  const Tree = (array) => {
    let root = buildTree(array);
  
    // Builds a balanced BST from an array
    function buildTree(array) {
      // Remove duplicates and sort the array
      const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);
      
      // Helper function to build tree recursively
      function buildTreeRec(arr, start, end) {
        if (start > end) return null;
        
        const mid = Math.floor((start + end) / 2);
        const node = Node(arr[mid]);
        
        node.left = buildTreeRec(arr, start, mid - 1);
        node.right = buildTreeRec(arr, mid + 1, end);
        
        return node;
      }
      
      return buildTreeRec(uniqueSorted, 0, uniqueSorted.length - 1);
    }
  
    // Insert a value into the BST
    function insert(value) {
      function insertRec(node, value) {
        if (node === null) return Node(value);
        
        if (value < node.data) {
          node.left = insertRec(node.left, value);
        } else if (value > node.data) {
          node.right = insertRec(node.right, value);
        }
        
        return node;
      }
      
      root = insertRec(root, value);
    }
  
    // Delete a value from the BST
    function deleteItem(value) {
      function findMin(node) {
        let current = node;
        while (current.left !== null) {
          current = current.left;
        }
        return current;
      }
      
      function deleteRec(node, value) {
        if (node === null) return null;
        
        if (value < node.data) {
          node.left = deleteRec(node.left, value);
        } else if (value > node.data) {
          node.right = deleteRec(node.right, value);
        } else {
          // Node with only one child or no child
          if (node.left === null) {
            return node.right;
          } else if (node.right === null) {
            return node.left;
          }
          
          // Node with two children
          const temp = findMin(node.right);
          node.data = temp.data;
          node.right = deleteRec(node.right, temp.data);
        }
        
        return node;
      }
      
      root = deleteRec(root, value);
    }
  
    // Find a node with given value
    function find(value) {
      function findRec(node, value) {
        if (node === null || node.data === value) return node;
        
        if (value < node.data) {
          return findRec(node.left, value);
        }
        return findRec(node.right, value);
      }
      
      return findRec(root, value);
    }
  
    // Level-order traversal
    function levelOrder(callback) {
      if (!callback) {
        throw new Error('Callback function is required');
      }
      
      if (root === null) return;
      
      const queue = [root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
    }
  
    // Inorder traversal
    function inOrder(callback) {
      if (!callback) {
        throw new Error('Callback function is required');
      }
      
      function inOrderRec(node) {
        if (node === null) return;
        
        inOrderRec(node.left);
        callback(node);
        inOrderRec(node.right);
      }
      
      inOrderRec(root);
    }
  
    // Preorder traversal
    function preOrder(callback) {
      if (!callback) {
        throw new Error('Callback function is required');
      }
      
      function preOrderRec(node) {
        if (node === null) return;
        
        callback(node);
        preOrderRec(node.left);
        preOrderRec(node.right);
      }
      
      preOrderRec(root);
    }
  
    // Postorder traversal
    function postOrder(callback) {
      if (!callback) {
        throw new Error('Callback function is required');
      }
      
      function postOrderRec(node) {
        if (node === null) return;
        
        postOrderRec(node.left);
        postOrderRec(node.right);
        callback(node);
      }
      
      postOrderRec(root);
    }
  
    // Calculate height of a node
    function height(node) {
      if (node === null) return -1;
      
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    // Calculate depth of a node
    function depth(node) {
      function depthRec(root, node, level = 0) {
        if (root === null) return -1;
        if (root === node) return level;
        
        const leftDepth = depthRec(root.left, node, level + 1);
        if (leftDepth !== -1) return leftDepth;
        
        return depthRec(root.right, node, level + 1);
      }
      
      return depthRec(root, node);
    }
  
    // Check if tree is balanced
    function isBalanced() {
      function checkBalance(node) {
        if (node === null) return true;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        
        return checkBalance(node.left) && checkBalance(node.right);
      }
      
      return checkBalance(root);
    }
  
    // Rebalance the tree
    function rebalance() {
      const values = [];
      inOrder((node) => values.push(node.data));
      root = buildTree(values);
    }
  
    // Pretty print function
    const prettyPrint = (node = root, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
  
    return {
      get root() { return root; },
      insert,
      deleteItem,
      find,
      levelOrder,
      inOrder,
      preOrder,
      postOrder,
      height,
      depth,
      isBalanced,
      rebalance,
      prettyPrint
    };
  };
  
  // Driver script
  function createRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }
  
  // Create a tree with random numbers
  const randomNumbers = createRandomArray(10, 100);
  const tree = Tree(randomNumbers);
  
  console.log("Initial tree:");
  tree.prettyPrint();
  
  console.log("\nIs balanced:", tree.isBalanced());
  
  console.log("\nLevel order traversal:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPreorder traversal:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPostorder traversal:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nInorder traversal:");
  tree.inOrder(node => console.log(node.data));
  
  // Unbalance the tree
  console.log("\nAdding numbers > 100 to unbalance the tree:");
  [101, 102, 103, 104, 105].forEach(num => tree.insert(num));
  tree.prettyPrint();
  
  console.log("\nIs balanced:", tree.isBalanced());
  
  // Rebalance the tree
  console.log("\nRebalancing the tree:");
  tree.rebalance();
  tree.prettyPrint();
  
  console.log("\nIs balanced:", tree.isBalanced());
  
  console.log("\nLevel order traversal after rebalancing:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPreorder traversal after rebalancing:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPostorder traversal after rebalancing:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nInorder traversal after rebalancing:");
  tree.inOrder(node => console.log(node.data));