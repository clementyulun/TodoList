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
                <div>
                    <h3><input type="checkbox" name={this.props.index} onChange={this.handleChecked} checked={this.state.isDone} disabled/><input type="text" name="title" value={this.state.title} onChange={this.handlechange}/></h3>
                    <p><input type="text" name="content" value={this.state.content} onChange={this.handlechange}/></p>
                    <button name={this.props.index} onClick={this.handleConfirmEdit}> 確認 </button>
                </div>     
            )
        }else{
            return(
                <div>
                    <h3><input type="checkbox" name={this.props.index} onChange={this.handleChecked} checked={this.state.isDone}/>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <button onClick={this.handleEditTodo} style={{display: this.state.isDone ? 'none' : 'inline'}}> 修改 </button>
                    <button name={this.props.index} onClick={this.handleRemoveTodo}> 刪除 </button>
                </div>   
            )
        }
    }
}

export default TodoCard