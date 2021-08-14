import React, {Component} from 'react'
import Form from './Form'
import Table from './Table'
import './stylesheets/style.css'

class TodoList extends Component{
    state = {
        todos: [],
    }

    getList(){
        fetch("http://localhost:3000/api/getList")
        .then(res => res.json())
        .then(
          (result) => {
              const todos = []
              result.forEach(element => {
                  todos.push(element)
              });
              this.setState({
                  todos: todos
              });
          },
          (error) => {
              alert(error)
          }
        )
    }


    componentDidMount() {
        this.getList()
    }
    

    handleSubmit = (todo) => {
        fetch("http://localhost:3000/api/addTodo",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                title: todo.title,
                content: todo.content
            })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result.status == 0){
                    const {todos} = this.state
                    this.setState({
                        todos: todos.filter((todo)=>{
                            return todo._id != _id
                        })
                    })
                }
            },
            (error) => {
                alert(error)
            }
        )
        this.setState({todos: [...this.state.todos, todo]})
    }

    removeTodo = (_id) => {
        fetch("http://localhost:3000/api/removeTodo",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                id: _id
            })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result.status == 0){
                    this.getList()
                }
            },
            (error) => {
                alert(error)
            }
        )

    }

    editTodo = (todoData, id) => {
        fetch("http://localhost:3000/api/updateTodo",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                content: todoData.content,
                title: todoData.title
            })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result.status == 0){
                    this.getList()
                }
            },
            (error) => {
                alert(error)
            }
        )
    }

    handleCheckTodo = (id) => {
        fetch("http://localhost:3000/api/changeStatus",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                isDone: this.state.isDone? false:true
            })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result.status == 0){
                    this.getList()
                }
            },
            (error) => {
                alert(error)
            }
        )
    }

    render(){
        return(
            <div className="TodoList">
                <h1>Todo List</h1>
                <Form handleSubmit={this.handleSubmit}/>
                <br/>
                <br/>
                <Table todosData={this.state.todos} editTodo={this.editTodo} removeTodo={this.removeTodo} handleCheckTodo={this.handleCheckTodo}/>
            </div>
        )
    }
}

export default TodoList