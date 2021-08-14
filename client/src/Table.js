import React from 'react'
import TodoCard from './TodoCard'


const Table = (props) => {
    const {removeTodo, editTodo, handleCheckTodo} = props
    const todoCards = props.todosData.map((todoData, index)=>{
        return(
            <TodoCard key={todoData._id} index={todoData._id} todoData={todoData} removeTodo={removeTodo} editTodo={editTodo} handleCheckTodo={handleCheckTodo}/>
        )
    })

    return(<div className="todo_area">{todoCards}</div>)
}

export default Table