import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react'

const FormTodo = ({ onAdd }) => {

  const [newTask, setNewTask] = useState({ title: '', description: '' })
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      onAdd(newTask)
      setNewTask({ title: '', description: '' })
    }
  }
  
  return (
    
    <Form onSubmit={handleSubmit}>
			<Form.Field className="panel-heading">
        <label>Todo Name</label>
        <Input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Todo Name"
          required
        />
			</Form.Field>
			<Form.Field>
        <label>Description</label>
        <Input 
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Description"
          required />
			</Form.Field>
			<Form.Field>
        <Button primary type='submit'>Submit</Button>
			</Form.Field>
		</Form>
  )
}

export default FormTodo