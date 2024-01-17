import { useState } from "react";
import { Button, Input, Table, Ref } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Task = ({ task, onEdit, onComplete, onDelete }) => {

  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [isEditing, setIsEditing] = useState(false)
  const [quotes, setQuotes] = useState([task])


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

  const onDragEnd = (result) => {
    console.log(result)
  
    if (!result.destination) {
      return
    }
  
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return
    }
  
    const newQuotes = Array.from(quotes)
    const [removed] = newQuotes.splice(result.source.index, 1)
    newQuotes.splice(result.destination.index, 0, removed)
    setQuotes(newQuotes)
  }
  
  return (
    
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <Droppable droppableId="tableBody">
            {(provided) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps}>
                  {quotes.map((quote, index) => (
                    <Draggable
                      draggableId={quote.id.toString()}
                      index={index}
                      key={quote.id}
                    >
                      {(provided) => (
                        <Ref innerRef={provided.innerRef}>
                          <Table.Row
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Table.Cell>{task.id}</Table.Cell>
                            {isEditing ? (
                              <>
                                <Table.Cell>
                                  <Input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  <Input
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                  />
                                </Table.Cell>
                              </>
                            ) : (
                              <>
                                <Table.Cell>{task.title}</Table.Cell>
                                <Table.Cell>{task.description}</Table.Cell>
                              </>
                            )}
                            <Table.Cell className="todo-status">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={handleComplete}
                                />
                                { task.completed ? "Completed" : "Pending" }
                              </label>
                            </Table.Cell>
                            <Table.Cell>
                              {isEditing ? (
                                <Button positive onClick={handleSave}>Save</Button>
                              ) : (
                                <Button primary onClick={handleEdit}>Edit</Button>
                              )}
                              <Button className="btn-delete" onClick={handleDelete}>Delete</Button>
                            </Table.Cell>
                          </Table.Row>
                        </Ref>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Table.Body>
              </Ref>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </div>
  )
}

export default Task