/*
* @Author: duqinzhi
* @Date:   2018-06-23 19:09:34
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-24 16:04:54
*/

//引入react及其他组件
import React from 'react';
import TodoHeader from './TodoHeader.js';
import TodoItem from './TodoItem.js';
import TodoFooter from './TodoFooter.js';
import * as filterTypes from './filterTypes.js'
import 'bootstrap/dist/css/bootstrap.css';

//默认导出这个组件
export default class TodoApp extends React.Component{
	constructor(props){  //props是React帮忙传进来的
		super(props);
		this.state = {
			todos:[],//初始化默认状态
			filterType:filterTypes.ALL  //过滤器的类型
		};  
	}
	//添加待办事件
	addTodo = (todo)=>{
		todo = {id:Date.now(),completed:false,...todo};   //给传回来的todo展开，并增添其他的属性
		let todos = [...this.state.todos,todo];  //把新增的todo放进todos
		this.setState({todos});  //更新数据
	}
	//当多选框改变的时候，改变completed的值
	toggle = (id)=>{  
		let todos = this.state.todos;
		todos = todos.map((todo)=>{  //遍历todo 找到id相同的    会返回新的数组
			if(todo.id === id){
				todo.completed = !todo.completed;  //取反
			}
			return todo;
		})
		this.setState({todos});  //更新todos
	}
	//删除功能(过滤)
	removeItem = (id)=>{
		let todos = this.state.todos;
		todos = todos.filter((item,index)=>item.id !== id);  //过滤掉传过来的id，重新赋给todos
		this.setState({todos});  //更新todos
	}
	//全部(取消或选中) 多选框发生改变
	toggleAll = (event)=>{
		let checked = event.target.checked;
		let todos = this.state.todos;
		//如果是全部选中状态,那么映射使得其completed为true
		todos = todos.map((todo)=>{
				 todo.completed = checked  //让每个todo和全选框的completed一样
				 return todo;
			});
		this.setState({todos});
	}
	//过滤器的类型改变
	changeFilterType = (filterType)=>{
		this.setState({filterType});  //更新过滤器类型
	}
	//删除已经完成的
	clearCompleted = ()=>{
		let todos = this.state.todos;
		todos = todos.filter((todo)=>!todo.completed)     //返回的新数组是completed为false的，因为要删除为true的
		this.setState({todos});   //更新todos
	}
	render(){
		let todos = this.state.todos;

		//未完成的数量，当为0时说明全选中了
		let activeTodoCount = todos.reduce((prev,next)=>{
			return prev + (next.completed?0:1)   //完成+0  未完成+1
		},0)

		//完成状态的数量
		let completedTodoCount = todos.length - activeTodoCount;

		//render的时候进行过滤  然后映射的时候 映射showTodos数组就行了
		 let showTodos = todos.filter((todo)=>{
			switch(this.state.filterType){
				case filterTypes.ACTIVE :   //显示活动状态(未完成)  return 的是 completed是false的
					return !todo.completed;

				case filterTypes.COMPLETED:   //显示完成的
					return todo.completed;

				default:                      //显示全部
					return true
			}
		 })
		 //main 变量(body里面的东西)
		let main = (
				<ul className='list-group'> {/*对于todos进行映射*/}   {/*把todo作为属性传递给子组件使用*/}
		{/*最上面的全选框，当todos数组有东西时候才显示，否则就为null*/}
					{todos.length>0? 
						<li className='list-group-item'>
						<input type="checkbox" 
								checked={activeTodoCount===0} 
								onChange={this.toggleAll}    //当全部多选框发生改变的时候
						/>
						{activeTodoCount===0? '全部取消' : '全部选中'}   {/*当未完成为0时，显示全部取消，当不为0时显示全部选中*/}
						</li> 
						:null
					}
					
		{/*todo列表*/}
					{
						showTodos.map((todo,index)=>
							(<TodoItem 
								todo={todo}            //把遍历的每一项传过去
								key={index}            //索引传过去
								toggle={this.toggle}   //多选框切换方法 
								removeItem = {this.removeItem}  //删除
								></TodoItem>))  
					}
				</ul>	
		);
		return(
			<div className="container" style={{marginTop:20}}>
				<div className="row">
					<div className="col-xs-6 col-xs-offset-3">
						<div className='panel panel-default'>
							<TodoHeader addTodo={this.addTodo}></TodoHeader>
							<div className='panel-body'>
								{main}
							</div>
							<div className='panel-footer'>
								<TodoFooter activeTodoCount = {activeTodoCount}       //未完成的数量
											completedTodoCount = {completedTodoCount}  //完成的数量
											changeFilterType = {this.changeFilterType}   //过滤器类型的改变
											filterType = {this.state.filterType}        //过滤器的类型(用于按钮高亮)
											clearCompleted  = {this.clearCompleted }   //删除已完成的
								></TodoFooter> 
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}