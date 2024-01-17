import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Input, Table } from "semantic-ui-react";

const Task = ({ taskData, tasks, setTasks }) => {

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const [state, setState] = useState({ items: [] })

  useEffect(() => {
    setState({
      items: taskData.map((x) => {
        return {
          id: x.id + "",
          title: x.title,
          description: x.description,
          completed: x.completed,
        }
      })
    })
  }, [taskData])

  function onDragEnd(result) {

    if (!result.destination) {
      return
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    )

    setState({
      items,
    })
  }

  const DragItem = ({ item, index }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editedDescription, setEditedDescription] = useState(item.description)
    const [editedTitle, setEditedTitle] = useState(item.title)

    const handleSave = () => {
      setTasks(
        tasks.map((task) =>
          task.id == item.id
            ? {
                ...task,
                ...{ title: editedTitle, description: editedDescription },
              }
            : task
        )
      )
      setIsEditing(false)
    }

    const handleComplete = () => {
      setTasks(
        tasks.map((task) =>
          task.id == item.id ? { ...task, completed: !task.completed } : task
        )
      )
    }

    const handleDelete = () => {
      setTasks(tasks.filter((task) => task.id != item.id))
    }

    const handleEdit = () => {
      setIsEditing(true)
    }

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
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
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                </>
              )}

              <Table.Cell className="todo-status">
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={handleComplete}
                  />
                  {item.completed ? "Completed" : "Pending"}
                </label>
              </Table.Cell>
              <Table.Cell>
                {isEditing ? (
                  <Button positive onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button primary onClick={handleEdit}>
                    Edit
                  </Button>
                )}
                <Button className="btn-delete" onClick={handleDelete}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Table.Body>
                  {state.items.map((item, index) => (
                    <DragItem item={item} index={index}></DragItem>
                  ))}
                  {provided.placeholder}
                </Table.Body>
              </div>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </>
  )
}

export default Task