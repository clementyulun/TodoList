import React from 'react'
import TodoCard from './TodoCard'


const Table = (props) => {
    const todoCards = props.todosData.map((todoData, index)=>{
        return(
            <TodoCard key={index} todoData={todoData}/>
        )
    })

    return(<div>{todoCards}</div>)
}

export default Table