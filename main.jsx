import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'; // 使用 createBrowserRouter 创建的路由配置

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
