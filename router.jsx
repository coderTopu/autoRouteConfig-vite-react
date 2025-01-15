import React, { Children, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * 生成路由
 */

const pages = import.meta.glob('/pages/**/pages.*', {
    eager: true,
    import: 'default'
})

const elements = import.meta.glob('/pages/**/index.*')

function createRouterConfig(elements) {
    const baseRouterConfig = Object.entries(elements).map(element => {
        const [cPath, source] = element
        const path = cPath.replace('/pages', '').replace('/index.jsx', '')
        const eleKey = cPath.replace('index.jsx', 'pages.js')
        const meta = pages[eleKey] || {}


        const Element = lazy(() => source())


        return {
            path,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Element />
                </Suspense>
            ),
            meta,
        }
    })
    return baseRouterConfig
}

function createChildrenFactory(baseRouteConfig) {
    // 将每个路由路径分解为 parentId 和 id
    let _baseRouteConfig = baseRouteConfig.map(config => {
        let pathArr = config['path'].split('/').filter(Boolean);
        let length = pathArr.length;
        return {
            ...config,
            id: pathArr[length - 1] || '', // 使用最后一个路径部分作为 id
            parentId: length > 1 ? pathArr[length - 2] : null,
        };
    });

    // 递归将路径数组转为树形结构
    const arrToTree = (arr, parentId = null) => {
        return arr.reduce((prev, curr) => {
            if (curr.parentId === parentId) {
                // 找到子路由时递归处理
                let children = arrToTree(arr, curr.id);
                if (children.length) {
                    curr.children = children; // 添加子路由
                }
                prev.push(curr);
            }
            return prev;
        }, []);
    };

    // 调用递归方法生成路由树
    let res = arrToTree(_baseRouteConfig, null);
    return res;
}

const routerConfig = createChildrenFactory(createRouterConfig(elements))

// 创建路由配置
const router = createBrowserRouter(routerConfig);

export default router


