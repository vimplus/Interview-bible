function Node(element) {
    this.element = element;     // 当前节点的元素
    this.next = null;           // 下一个节点的链接
}

function find(item) {
    var currNode = this.head;
    while (currNode.element !== item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}

function findPre(item) {
    var currNode = this.head;
    while ((currNode.next !== null) && (currNode.next.element !== item)) {
        currNode = currNode.next;
    }
}

function remove(item) {
    var preNode = this.findPre(item);
    while (preNode.next !== null) {
        preNode.next = preNode.next.next;
    }
}

function display() {
    var currNode = this.head;
    while (currNode.next !== null) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function LinkedList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;

    this.findPre = findPre;
    this.display = display;
}

var pets = new LinkedList();
console.log('pets:', pets);