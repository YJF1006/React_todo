/*
* @Author: duqinzhi
* @Date:   2018-06-23 19:09:34
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-25 08:18:03
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
		this.state = {  //todos的维护放在了TodoModel里面了
			filterType:filterTypes.ALL  //过滤器的类型
		};  
	}
	//过滤器的类型改变
	changeFilterType = (filterType)=>{
		this.setState({filterType});  //更新过滤器类型
	}
	
	render(){
//通过index.js传过来的model属性上面取todos 
		let todos = this.props.model.todos;   

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
								onChange={this.props.model.toggleAll}    //当全部多选框发生改变的时候
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
								toggle={this.props.model.toggle}   //多选框切换方法 
								removeItem = {this.props.model.removeItem}  //删除
								></TodoItem>))  
					}
				</ul>	
		);
		return(
			<div className="container" style={{marginTop:20}}>
				<div className="row">
					<div className="col-xs-6 col-xs-offset-3">
						<div className='panel panel-default'>
							<TodoHeader addTodo={this.props.model.addTodo}></TodoHeader>
							<div className='panel-body'>
								{main}
							</div>
							<div className='panel-footer'>
								<TodoFooter activeTodoCount = {activeTodoCount}       //未完成的数量
											completedTodoCount = {completedTodoCount}  //完成的数量
											changeFilterType = {this.changeFilterType}   //过滤器类型的改变
											filterType = {this.state.filterType}        //过滤器的类型(用于按钮高亮)
											clearCompleted  = {this.props.model.clearCompleted }   //删除已完成的
								></TodoFooter> 
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}


/* 修改
	1. 把todos状态 和addTodo方法提到了TodoMoldel里面
	2. 本页面render 里面 let todos = this.props.model.todos;  
	3.修改TodoHead 里面addTodo 的传递 this.props.model.addTodo
	4. 关于数据的事件方法(TodoModel.js里面存的方法)，在本页就是this.props.model.方法    因为原来在本页的这些事件被提到model里面了
 */