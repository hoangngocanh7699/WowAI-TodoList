import React, { useState, useEffect } from 'react';
import { Table, Input } from "semantic-ui-react";
import Filter from './Filter';
import Task from './Task';
import FormTodo from './Form';
import './style.css'


const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [taskIdCounter, setTaskIdCounter] = useState(1)
  
  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])
  
  //Updates the task ID counter (taskIdCounter) based on data stored in localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
      if (JSON.parse(savedTasks).length === 0) {
        setTaskIdCounter(1)
      } else {
        const maxId = JSON.parse(savedTasks).reduce(
          (max, task) => (task.id > max ? task.id : max),
          0
        )
        setTaskIdCounter(maxId + 1)
      }
    } else {
      setTasks([])
      setTaskIdCounter(1)
    }
  }, [])
  
  useEffect(() => {
    if (tasks.length > 0) {
      const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0)
      setTaskIdCounter(maxId + 1)
    } else {
      setTaskIdCounter(1)
    }
  }, [tasks])
  
  //Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  
  const handleAddTask = (newTask) => {

    const updatedTasks = [
      ...tasks,
      { id: taskIdCounter, title: newTask.title, description: newTask.description, completed: false }
    ]
  
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  
    setTaskIdCounter(taskIdCounter + 1)
    localStorage.setItem("taskIdCounter", (taskIdCounter + 1).toString())
  }
  
  const handleEditTask = (taskId, updatedTask) => {
    setTasks( tasks.map((task) => task.id === taskId ? { ...task, ...updatedTask } : task))
  }
  
  const handleCompleteTask = (taskId) => {
    setTasks( tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task))
  }
  
  const handleDeleteTask = (taskId) => { 
    setTasks(tasks.filter((task) => task.id !== taskId))
  }
  
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue)
  }
  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return false
  })
  
  return (
    <div className='todo-list-container'>
      <h1>Todo List</h1>
      <FormTodo onAdd={handleAddTask} />
      <Table className="todos-list">
        <Table.Header>
          <div>
            <Table.Row>
              <Table.Cell>STT</Table.Cell>
              <Table.Cell>Todo Name</Table.Cell>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Action</Table.Cell>
            </Table.Row>
          </div>
          
          <div>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Input icon="search" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </Table.Cell>
            <Table.Cell>
              <Filter value={filter} onChange={handleFilterChange} />
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          </div>
          
        </Table.Header>

        <Table.Body>
          <div className='tasks'>
            {filteredTasks.filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase())).map((task) => (
              <Task
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </Table.Body>
      </Table>
    </div>
  )
}
  
export default TodoList