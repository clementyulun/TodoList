import React, {Component} from 'react'
import Form from './Form'
import Table from './Table'

class TodoList extends Component{
    state = {
        todos: [],
    }

    handleSubmit = (todo) => {
        this.setState({todos: [...this.state.todos, todo]})
    }

    removeTodo = (index) => {
        const {todos} = this.state
        this.setState({
            todos: todos.filter((__, i)=>{
                return i != index
            })
        })
    }

    editTodo = (todo, index)=>{
        const todos = [...this.state.todos]
        todos[index] = todo
        console.log(index)
        console.log(todo)
        this.setState({
            todos: todos
        })
    }

    render(){
        return(
            <div className="TodoList">
                <h1>Todo List</h1>
                <Form handleSubmit={this.handleSubmit}/>
                <Table todosData={this.state.todos} editTodo={this.editTodo} removeTodo={this.removeTodo}/>
            </div>
        )
    }
}

export default TodoList