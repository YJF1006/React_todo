/*
* @Author: duqinzhi
* @Date:   2018-06-24 11:04:51
* @Last Modified by:   duqinzhi
* @Last Modified time: 2018-06-24 16:23:07
*/

import React from 'react';
import * as filterTypes from './filterTypes.js'
export default class TodoFooter extends React.Component{
	render(){
		return (
			<div className="row">
			 {/*待办数量 当待办事件大于0的时候才显示，否则就是null*/}
				<div className="col-xs-3 text-center">
		    	{
		    		this.props.activeTodoCount>0?
						<a href="#" style={{textDecoration:'none'}}>你有<span className="badge">{this.props.activeTodoCount}</span>件待办 </a>	
					:
						null
		    	}
		    	</div>
			{/*三个按钮 不同按钮，过滤结果不一样，不能直接修改todos */}
				<div className="col-xs-6 text-center">
					<button  className={`btn btn-sm ${this.props.filterType === filterTypes.ALL? 'btn-success':'btn-default'}`}
							 onClick={()=>this.props.changeFilterType(filterTypes.ALL)}>全部</button>

					<button  style={{marginLeft:10}} 
							 className={`btn btn-sm ${this.props.filterType === filterTypes.ACTIVE? 'btn-success':'btn-default'}`}
							 onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}>未完成</button>

					<button  style={{marginLeft:10}} 
							 className={`btn btn-sm ${this.props.filterType === filterTypes.COMPLETED? 'btn-success':'btn-default'}`}
							 onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)}>已完成</button>
				</div>
			{/*删除已完成(按钮)  当已完成数量大于0的时候这个button才出现，否则就是null */}
				<div className="col-xs-3 text-center">
					{
						this.props.completedTodoCount>0?
								<button className='btn btn-danger btn-sm'
									onClick = {this.props.clearCompleted}>删除已完成</button>
							: 	
								null
					}
				</div>
			</div>
		)
	}
}

