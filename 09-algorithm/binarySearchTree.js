/**
 * 二叉搜索树
 */
function BinarySearchTree() {
    // 根节点
    let root = null;

    // 用于创建节点的类
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    
    this.insert = function name(key) {
        let newNode = new Node(key);
        root === null ? root = newNode : insertNode(root, newNode);
    }
    
    function insertNode(node, newNode) {
        if (newNode.key < node.key) {
            node.left === null ? node.left = newNode : insertNode(node.left, newNode);
        } else {
            node.right === null ? node.right = newNode : insertNode(node.right, newNode);
        }
    }
}