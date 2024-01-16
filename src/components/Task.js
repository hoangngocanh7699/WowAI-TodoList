import { useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";

const Task = ({ task, onEdit, onComplete, onDelete }) => {

  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [isEditing, setIsEditing] = useState(false)


  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(task.id, { title: editedTitle, description: editedDescription })
    setIsEditing(false)
  }
  
  const handleComplete = () => {
    onComplete(task.id)
  }
  
  const handleDelete = () => {
    onDelete(task.id)
  }
  
  return (
    <>
      <Table.Row>
        <Table.Cell>{task.id}</Table.Cell>
        {isEditing ? 
          (<>
            <Table.Cell>
              <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            </Table.Cell>
            <Table.Cell>
              <Input value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
            </Table.Cell>
          </>) : (<>
            <Table.Cell>{task.title}</Table.Cell>
            <Table.Cell>{task.description}</Table.Cell>
          </>
        )}
        <Table.Cell className="todo-status">
          <label>
            <input type="checkbox" checked={task.completed} onChange={handleComplete} />
            {task.completed ? 'Completed' : 'Pending'}
          </label>
        </Table.Cell>
        <Table.Cell>
          {isEditing ? (<Button positive onClick={handleSave}>Save</Button>) : (<Button primary onClick={handleEdit}>Edit</Button>)}
          <Button className="btn-delete" onClick={handleDelete}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default Task