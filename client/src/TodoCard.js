import React, {Component} from 'react'

class TodoCard extends Component{
    state = {
        title: this.props.todoData.title,
        content: this.props.todoData.content,
        isEditing: false,
        isDone: this.props.todoData.isDone
    }


    handlechange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleChecked = (event)=>{
        this.props.handleCheckTodo(event.target.name)
        this.setState({
            isDone: event.target.checked ? true : false
        })
    }

    handleEditTodo = ()=>{
        this.setState({
            isEditing: true
        })
    }

    handleRemoveTodo = (event)=>{
        this.props.removeTodo(event.target.name)
    }

    handleConfirmEdit = (event)=>{
        const todoData = {
            title: this.state.title,
            content: this.state.content,
            isDone: this.state.isDone
        }
        this.props.editTodo(todoData, event.target.name)
        this.setState({
            isEditing: false
        })
    }

    render(){
        if(this.state.isEditing){
            return(
                <div className="content">
                    <div className={this.state.isDone? "title_done":"title"}>
                        <input type="checkbox" name={this.props.index} onChange={this.handleChecked} checked={this.state.isDone} disabled/>
                        <input type="text" name="title" value={this.state.title} onChange={this.handlechange}/>
                        <button className="todoCard_btn" name={this.props.index} onClick={this.handleConfirmEdit}> 確認 </button>
                    </div>
                    <p><input type="text" name="content" value={this.state.content} onChange={this.handlechange}/></p>
                    
                </div>     
            )
        }else{
            return(
                <div className="content">
                    <div className={this.state.isDone? "title_done":"title"}>
                        <input type="checkbox" name={this.props.index} onChange={this.handleChecked} checked={this.state.isDone}/>{this.state.title}
                        <button className="todoCard_btn" onClick={this.handleEditTodo} style={{display: this.state.isDone ? 'none' : 'inline'}}> 修改 </button>
                        <button className="todoCard_btn" name={this.props.index} onClick={this.handleRemoveTodo}> 刪除 </button>
                    </div>
                    <p>{this.state.content}</p>
                </div>   
            )
        }
    }
}

export default TodoCard