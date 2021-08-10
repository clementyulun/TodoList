import React, {Component} from 'react'

class TodoCard extends Component{
    InitialState = {
        title: this.props.todoData.title,
        content: this.props.todoData.content,
        isEditing: false,
        isDone: false
    }

    state = this.InitialState

    handlechange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    editTodo = ()=>{
        this.setState({
            isEditing: true
        })
    }

    removeTodo = (event)=>{
        this.props.removeTodo(event.target.name)
    }

    confirmEdit = (event)=>{
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
                    <input type="text" name="title" value={this.state.title} onChange={this.handlechange}/>
                    <input type="text" name="content" value={this.state.content} onChange={this.handlechange}/>
                    <button name={this.props.index} onClick={this.confirmEdit}> 確認 </button>
                </div>     
            )
        }else{
            return(
                <div>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <button onClick={this.editTodo}> 修改 </button>
                    <button name={this.props.index} onClick={this.removeTodo}> 刪除 </button>
                </div>   
            )
        }
    }
}

export default TodoCard