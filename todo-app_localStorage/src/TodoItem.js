/*
* @Author: duqinzhi
* @Date:   2018-06-23 19:34:54
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-24 11:01:43
*/

/*一个todo*/
import React from 'react';
export default class TodoItem extends React.Component{
	render(){
		let todo = this.props.todo
		return(
			<li className='list-group-item'>
				<div className="row">
				{/*多选框 根据completed属性来判断是否要被选*/}
					<div className="col-xs-1">
						<input type="checkbox" checked={todo.completed} onChange={()=>this.props.toggle(todo.id)}/>
					</div>
				{/*要做的事件，要是多选框勾上了 那么就会有一个删除线样式*/}
					<div className="col-xs-10" style={{textDecoration:todo.completed? 'line-through':''}}>
						{todo.title}   {/*接收父组件的传过来的todo*/}
					</div>
				{/*删除按钮*/}
					<div className="col-xs-1">
						<button className='btn btn-danger btn-xs' onClick={()=>this.props.removeItem(todo.id)}>X</button>
					</div>
				</div>
			</li>
		)
	}
}