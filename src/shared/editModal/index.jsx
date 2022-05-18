import { useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { BACKEND_URL } from "../../consts"


const EditTaskForm = ({ editableState,setTasks,onSubmitCallback }) => {
    const [editTaskValue, setEditTaskValue] = useState({
        title: {
            value: editableState.title
        },
        description: {
            value: editableState.description
        }
    })
    const onEdit = (e) => {
        e.preventDefault();
        const { title: { value: title }, description: { value: description } } = editTaskValue
        const formEdit = {
            title,
            description
        }

        fetch(`${BACKEND_URL}/task/${editableState._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( formEdit ),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks((prev) => {
                  return  prev.map(item => {
                        if (item._id === editableState._id) {
                          return data 

                        } 
                        return item 
                    })
                })
                onSubmitCallback()
            })
         


    }
    const handleChange = (e) => {
        const {value,name} = e.target;

        setEditTaskValue((prev) => {
            return {
                ...prev,
                [name]:{
                    ...prev[name],
                    value
                }
            }    
            
        })
    }
    return (
        <Form onSubmit={onEdit}>
            <FormGroup>
                <Label for="titleId">
                    Title
                </Label>
                <Input id="titleId"
                    name="title"
                    placeholder="task Title"
                    type="text"
                    value = {editTaskValue.title.value}
                    onChange = {handleChange}
                />

            </FormGroup>
            <FormGroup>
                <Label for="descriptionId">
                    Description
                </Label>
                <Input id="descriptionId"
                    name="description"
                    placeholder="task Description"
                    type="text"
                    value = {editTaskValue.description.value}
                    onChange = {handleChange} />
            </FormGroup>
            <Button onClick={onEdit} >
                Edit
            </Button>

        </Form>
    )
}
export const EditModal = ({ onclose, setTasks,editableState }) => {


    return (
        <Modal toggle={onclose} isOpen={true}>
            <ModalHeader toggle={onclose}>
                Modal title
            </ModalHeader>
            <ModalBody>
                <EditTaskForm  
                editableState = {editableState}
                setTasks = {setTasks}
                onSubmitCallback = {onclose}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={onclose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}