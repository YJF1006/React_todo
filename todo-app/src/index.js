import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './TodoApp.js';

ReactDOM.render(
	<TodoApp></TodoApp>,
	document.querySelector('#root')
);

/*一般项目里面index.js里面  这一块是标准代码
	1. 引入两个库
	2.引入自己的组件
	3.渲染
 */