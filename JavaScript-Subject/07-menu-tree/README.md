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

写一个方法将以上数组结构转换为以下菜单结构:

```html
<ul>
    <li>
        <a>菜单1</a>
        <ul>
            <!-- 子菜单节点 -->
        </ul>
    <li/>
    <!-- 其他节点 -->
</ul>
```