import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

/**
 * 生成路由
 */
const pages = import.meta.glob('/pages/**/pages.*', {
  eager: true,
  import: 'default',
});

const elements = import.meta.glob('/pages/**/index.*');

function createRouterConfig(elements) {
  const baseRouterConfig = Object.entries(elements).map(([cPath, source]) => {
    const path = cPath.replace('/pages', '').replace('/index.jsx', '');
    const eleKey = cPath.replace('index.jsx', 'pages.js');
    const meta = pages[eleKey] || {};

    const Element = lazy(() => source());

    return {
      path,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Element />
        </Suspense>
      ),
      meta,
    };
  });

  return createChildrenFactory(baseRouterConfig);
}

function createChildrenFactory(baseRouteConfig) {
  const _baseRouteConfig = baseRouteConfig.map(config => {
    const pathArr = config.path.split('/').filter(Boolean);
    const length = pathArr.length;

    return {
      ...config,
      id: pathArr[length - 1] || '',
      parentId: length > 1 ? pathArr[length - 2] : null,
    };
  });

  // 递归将路径数组转为树形结构
  const arrToTree = (arr, parentId = null) =>
    arr.reduce((prev, curr) => {
      if (curr.parentId === parentId) {
        const children = arrToTree(arr, curr.id);
        if (children.length) curr.children = children;
        prev.push(curr);
      }
      return prev;
    }, []);

  let res = arrToTree(_baseRouteConfig);

  // 移除不必要的字段
  res.forEach(({ parentId, id, ...rest }) => rest);
  return res;
}

const routerConfig = createRouterConfig(elements);

const router = createBrowserRouter(routerConfig);

export default router;
