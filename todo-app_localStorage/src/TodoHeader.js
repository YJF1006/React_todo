/*
* @Author: duqinzhi
* @Date:   2018-06-23 19:18:09
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-24 11:24:18
*/
import React from 'react';	

const ENTER_KEY = 13  //回车键
export default class TodoHeader extends React.Component{
	handleKeyDown = (event)=>{
		if(event.keyCode === ENTER_KEY){
			if(event.target.value !== null &&event.target.value.length>0){
				let title = event.target.value; //获取到输入框中的值
				this.props.addTodo({title});  //把这个值传给父组件的方法   因为子组件不能修改状态
				event.target.value='';   //添加之后清空输入框
			}
		}
	}
	render(){
		return(
				<div className="from-group">
					<input type="text" className='form-control' autoFocus={true} 
							onKeyDown={this.handleKeyDown} />  {/*自动获取焦点 autoFocus*/}
				</div>
		)
	}
}

/*不写form的原因
1. 写了之后，就会自动进行表单提交，然后要是阻止表单自动提交，就要在handleKeyDown 事件里+ event.preventDefault()
2. 加了event.preventDefault(),之后，就不能进行event.keyCode事件了

所以不加form标签了
*/