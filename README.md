# 开发代码规范

## 1.命名规范

- 1.index.js/index.vue，使用小写字母开头
- 2.js/ts文件使用camelCase命名规范
- 3.components文件下子文件夹使用PascalCase命名规范
- 4.components文件下子文件夹必须拥有index.vue，其他vue文件使用PascalCase命名规范
- 5.views文件下子文件夹使用kebab-case命名规范，vue文件也使用kebab-case命名规范
- 6.css/sccc/less文件使用kebab-case命名规范
- 7.全局组件放在components文件夹下，其他业务组件放在各自页面下./components文件夹下

## 2.vue文件方法书写顺序
- components   
- props    
- data     
- created
- mounted
- activited
- update
- beforeRouteUpdate
- methods   
- filter
- computed
- watch