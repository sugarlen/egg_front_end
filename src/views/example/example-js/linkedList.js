// 单链表实现
// 节点类
function Node(data){
    this.data = data;
    this.next = null;
}
// 链表行为类
function LinkedList(item){
    this.head = new Node('head'); // 头节点
}
LinkedList.prototype = {
    find: function(item){
        var currentNode = this.head;
        while (currentNode.data !== item){
            currentNode = currentNode.next
        }
        return currentNode
    }
}

