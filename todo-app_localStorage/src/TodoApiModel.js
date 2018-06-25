/*
* @Author: duqinzhi
* @Date:   2018-06-24 17:15:51
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-25 09:00:43
*/
/*  重大突破
1. 先定义了监听者数组
2. 定义了 订阅函数 和 发布函数
3. 谁调用了订阅，传过来监听者，存放在监听者数组中，(一般把index.js里面的render作为订阅，因为每一次的事件的数据变化，都要让页面重新渲染)
4. 当要各种事件发布的时候，那么会遍历执行监听数组里面的每一个函数

各种事件改的时候  
	1.把原来的改成let todos = this.todos;  todos不再是状态了
	2.不再需要数据更新了  this.setState();
	3.把数据转成JSON.stringify()存放在localStorage里面，
	4.进行发布
 无论怎么改，最后两步是不变的(把最后两步封装成一个函数saveAndNoticy())
 */
/*维护着数据，和引发数据的事件*/
import $ from 'jquery';
export default class TodoModel {
	constructor(){
		//初始化的时候，先看localStorage里面有没有，要是有->就取出来，要是没有->空数组
		this.todos = [];  
		this.init(); //初始化方法
		//这里可以注册监听器，当模型数据发生变化之后，会调用这些监听函数
		this.listeners = [];

	}
	//初始化方法
	init(){
	$.ajax({
			url:'http://localhost:1006/todos',
			type:'GET',
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
	//订阅  on(type,listener)
	subscribe(listener){
		this.listeners.push(listener);   //谁调用订阅函数，就把这个存放在监听函数中
	}
	//发布
	emit(){   //循环遍历执行所有监听函数
		this.listeners.forEach(listener=>listener());
	}
	//保存并且通知发布
	save(todos){
		this.todos = todos;  //把要发布的todos存放在初始化里面的，因为每次读的时候就是在读this.todos
		this.emit();   //进行发布
	}
	//添加待办事件
	addTodo = (todo)=>{
		todo = {id:Date.now(),completed:false,...todo};   //给传回来的todo展开，并增添其他的属性
		$.ajax({
			url:'http://localhost:1006/todos/addTodo',
			type:'POST',
			data:todo,
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
	//当多选框改变的时候，改变completed的值
	toggle = (id)=>{  
		$.ajax({
			url:'http://localhost:1006/todos/toggle',
			type:'GET',
			data:{id},
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
	//删除功能(过滤)
	removeItem = (id)=>{
		$.ajax({
			url:'http://localhost:1006/todos',
			type:'DELETE',
			data:{id},
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
	//全部(取消或选中) 多选框发生改变
	toggleAll = (event)=>{
		let checked = event.target.checked;
		$.ajax({
			url:'http://localhost:1006/todos/toggleAll',
			type:'GET',
			data:{checked},
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
	//删除已经完成的
	clearCompleted = ()=>{
		$.ajax({
			url:'http://localhost:1006/todos/toggleAll',
			type:'GET',
			success(todos){  //一定要让服务器返回最新的todos数组
				this.save(todos);  //发布，让页面重新渲染
			}
		})
	}
}

/**localStorage 里面存放着字符串
 *  1.this.listeners = []   相当于监听者
 *  2.subscript  相当于订阅 on
 */

