## 简介
- 约定大于配置，按照规定的格式配置文件，自动生成路由
  
## 优点
1. 减少开发中重复代码的编写，方便路由维护
2. 大型项目中，不用每个人都去修改一下路由的配置，减少出错的概率，分工更为明确
   
## 如何使用？

1. 需要一个pages文件夹放置路由文件
2. 路由入口文件名为`index.jsx`
3. `pages.js`为路由meta的配置文件
```js
export default{
    name:'xxx',
    age:'xxx'
}
// 生成后
[{
    ...,
    meta:{
        name:'xxx',
        age:'xxx'
    }
}]
```
1. 如果需要创建子路由
```
-- user
  --user-about
    --index.jsx
  -- index.jsx
```
