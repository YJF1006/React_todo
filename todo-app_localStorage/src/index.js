import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './TodoApp.js';
import TodoModel from './TodoModel.js'  //引入TodoMoldel这个类（localStorage存储，已经完成了）
//import TodoApiModel from './TodoApiModel.js'   //引入ApiModel 这个类 （接口从后端调用，存储在数据库中，后端代码还没有写）

let model =new TodoModel();   //ne 一个model实例 把这个实例传给TodoApp  这样的好处就是：
//let model = new TodoApiModel();   //new一个modelAPI实例 (接口用的时候)

//把render渲染封装成一个函数，因为要把它加入到监听数组里面
function render(){ 
	ReactDOM.render(
		<TodoApp model={model}></TodoApp>,
		document.querySelector('#root')
	);
}

model.subscribe(render);  //把render添加到订阅里面

render();   //第一次的时候要render一次，所以要在最后面调用一次


/*一般项目里面index.js里面  这一块是标准代码
	1. 引入两个库
	2.引入自己的组件
	3.渲染
 */

/*TodoMoldel  new 一个实例 把这个实例传给TodoApp  这样的好处就是：
	保证了TodoModel的保存位置怎么变，TodoApp是不改变的， TodoApp只需要new一个别的实例就行了
	（保证了TodoApp是不动的）
 */