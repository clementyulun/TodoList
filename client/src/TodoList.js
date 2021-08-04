import React, {Component} from 'react'
import Form from './Form'
// import Table from './Table'

class TodoList extends Component{
    state = {
        todos: []
    }

    handleSubmit = (todo) => {
        this.setState({todos: [...this.state.todos, todo]})
    }

    removeTodo = (index) => {
        const {todos} = this.state

        this.setState({
            todos: todos.filter((todo, i)=>{
                return i !== index
            })
        })
    }

    editTodo = (todo, index)=>{
        const todos = [...this.state.todos]
        todos[index] = todo
        this.setState({
            todos: todos
        })
    }

    render(){
        const {todos} = this.state

        return(
            <div className="TodoList">
                <h1>Todo List</h1>
                <Form handleSubmit={this.handleSubmit}/>
                {/* <Table editTodo={this.editTodo} removeTodo={this.removeTodo}/> */}
            </div>
        )
    }
}

export default TodoList