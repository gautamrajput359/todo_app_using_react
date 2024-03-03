import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./Main.css"

const Main = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [showFinished, setShowFinished] = useState(true)
    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if(todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos)
        }
    }, [])
    const saveToLocalStorage = () => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    const handleSave = () => {
        if(todo.length>0) {
            setTodos([...todos, {todo, id: uuidv4(), isCompleted: false}])
                    setTodo("")
                    console.log(todos)
                    saveToLocalStorage()
        }
    }
    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id ===id)
        setTodo(t[0].todo)
        let newTodos= todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        console.log(todos)
        saveToLocalStorage()
    }
    const handleCheckBox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        console.log(id)
        console.log(index)
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos)
        saveToLocalStorage()
    }
    const handleDelete = (e, id) => {
        let newTodos= todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        console.log(todos)
        saveToLocalStorage()
    }
  return (
    <>
    <div className="container">
        <div className="content " id={todo.id}>
            <div className="title">
                iTask - Manage your todos at one place
            </div>
                <h2 className='heading'>Add your Tasks</h2>
            <div className='box'>
                <input type='text' id="inputBox" className='input' value={todo} onChange={handleChange} />
                <button className='save' onClick={handleSave}>Save</button>
            </div>
            <h2 className='heading'>Today's Todo list</h2>
            <div className="finishedTask">
            <input type="checkbox" name="" id="" checked={showFinished} onChange={()=> setShowFinished(!showFinished)} />
            <div className="finished">Show finished tasks</div>
            </div><hr/>
                {todos.length <1 && <div className="noTask">No tasks to display</div>}
            {todos.map(item =>{
                return (showFinished || !item.isCompleted) && <div className="items" id={item.id}>
                    <div className="one">
                    <input type="checkbox" name={item.id} id="" checked={item.isCompleted} onChange={handleCheckBox} />
                <div className={item.isCompleted?'text': ''}>{item.todo}</div>
                    </div>
                <div className='buttons'>
                <button className="edit" onClick={(e)=>handleEdit(e,item.id)}><FaEdit /></button>
                <button className="delete" onClick={(e) =>handleDelete(e, item.id)}><MdDelete /></button>
                </div>
            </div>
            })}
        </div>
    </div>
    </>
  )
}

export default Main
