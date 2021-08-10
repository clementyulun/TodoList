import React from 'react'
import TodoCard from './TodoCard'


const Table = (props) => {
    const {removeTodo, editTodo} = props
    const todoCards = props.todosData.map((todoData, index)=>{
        return(
            <TodoCard key={index} index={index} todoData={todoData} removeTodo={removeTodo} editTodo={editTodo}/>
        )
    })

    return(<div>{todoCards}</div>)
}

export default Table