/**
 * 写一个单向链表数据结构
 */
class LinkList {
    constructor() {
        this.head = null;
    }
    find(value) {
        let currNode = this.head;
        while (currNode.value !== value) {
            currNode = currNode.next;
        }
        return currNode;
    }
    findPrev(value) {
        let currNode = this.head;
        while (currNode.next !== null && currNode.next.value !== value) {
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(newValue, value) {
        const newNode = new Node(newValue);
        const currNode = this.find(value);
        newNode.next = currNode.next;
        currNode.next = newNode;
    }
    delete(value) {
        const preNode = this.findPrev(value);
        const currNode = preNode.next;
        preNode.next = preNode.next.next;
        return currNode;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}