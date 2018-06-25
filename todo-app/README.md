1.react的安装（app是你开始构建一个全新单页应用的最好方式）

  npm install -g create-react-app
  create-react-app my-app

  cd my-app
  npm start
2.sublime里面的jsx语法支持
  安装插件babel（支持ES6、React.js、jsx代码语法高亮。）
  安装  command+shift+p -> install package -> babel
  配置  该插件不需要额外配置，在打开.js或.jsx后缀的文件，直接选择Babel为对应的语法就可以了。

3.react修改端口号
  3.1 打开react项目里面的package.json文件，
  3.2 将 scripts中的start键值对 "start": "react-scripts start"  修改为"start": "set PORT=8080 && react-scripts start"

  ## todo的实现步骤
  ### 1.生成项目
    ```
      npm install create-react-app -g  (安装生成工具，只需要全局安装一次)
      npm create-react-app todo   (生成项目 todo是项目名字)
      cd todo
      npm start
    ```
  ### 2.实现功能
  - 1.需求分析
  - 2.初始化项目并提交github
  - 3.引入bootstrap并编写TodoHeader组件
  - 4.编写待办事项列表组件
  - 5.添加待办项
  - 6.实现切换完成状态的功能
  - 7.实现删除功能
  - 8.实现全部选中/全部删除
  - 9.显示待办事项的数量
  - 10.实现过滤功能（三个按钮的显示）
  - 11.实现删除已完成功能
  - 12.
