const menu = [
    { id: 1, parentId: null, sort: 0, name: '菜单1' },
    { id: 2, parentId: 1, sort: 0, name: '菜单1-1' },
    { id: 3, parentId: 1, sort: 0, name: '菜单1-2' },
    { id: 4, parentId: 2, sort: 2, name: '菜单1-1-2' },
    { id: 5, parentId: 2, sort: 1, name: '菜单1-1-1' },
    { id: 6, parentId: null, sort: 0, name: '菜单2' },
    { id: 7, parentId: 6, sort: 0, name: '菜单2-1' },
    { id: 8, parentId: 6, sort: 0, name: '菜单2-2' },
    { id: 9, parentId: 8, sort: 2, name: '菜单2-2-2' },
    { id: 10, parentId: 8, sort: 1, name: '菜单2-2-1' },
    { id: 11, parentId: 10, sort: 0, name: '菜单2-2-1-1' }
];


function getTree(data, root, idKey = 'id', parentIdKey = 'parentId', childKey = 'children') {
    function getNode(id) {
        let node = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i][parentIdKey] === id) {
                // 判断是不是这个父节点下面的子节点
                data[i][childKey] = getNode(data[i][idKey]);
                node.push(data[i]);
            }
        }
        if (node.length === 0) return;
        return node;
    }
    // 使用根节点
    return getNode(root)
}

const menuTree = getTree(menu, null);
console.log(menuTree);