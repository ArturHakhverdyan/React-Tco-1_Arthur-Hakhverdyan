import { useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { BACKEND_URL } from "../../consts"
import { IsRequired, MaxLength20, MinLength3 } from "../../helpers/validations"


const EditTaskForm = ({ editableState, setTasks, onSubmitCallback }) => {
    const [editTaskValue, setEditTaskValue] = useState({
        title: {
            value: editableState.title,
            error: undefined,
            validations: [IsRequired, MinLength3, MaxLength20]
        },
        description: {
            value: editableState.description,
            error: undefined,
            validations: [IsRequired, MinLength3, MaxLength20]
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
            body: JSON.stringify(formEdit),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks((prev) => {
                    return prev.map(item => {
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
        const { value, name } = e.target;
        const {validations} = editTaskValue[name]

        let error;

        for(let i = 0;i < validations.length;i++) {
            const validation = validations[i]
            const errorMessage = validation(value)

            if(errorMessage) {
                error = errorMessage;
                break
            }
        }

        setEditTaskValue((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                    error
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
                    value={editTaskValue.title.value}
                    onChange={handleChange}
                    invalid = {!!editTaskValue.title.error}

                />
                {!!editTaskValue.title.error && (
                    <FormFeedback>{editTaskValue.title.error}</FormFeedback>
                )}

            </FormGroup>
            <FormGroup>
                <Label for="descriptionId">
                    Description
                </Label>
                <Input id="descriptionId"
                    name="description"
                    placeholder="task Description"
                    type="text"
                    value={editTaskValue.description.value}
                    onChange={handleChange} 
                    invalid = {!!editTaskValue.description.error}
                    />
                      {!!editTaskValue.description.error && (
                    <FormFeedback>{editTaskValue.description.error}</FormFeedback>
                )}
            </FormGroup>
            <Button onClick={onEdit} >
                Edit
            </Button>

        </Form>
    )
}
export const EditModal = ({ onclose, setTasks, editableState }) => {


    return (
        <Modal toggle={onclose} isOpen={true}>
            <ModalHeader toggle={onclose}>
                Modal title
            </ModalHeader>
            <ModalBody>
                <EditTaskForm
                    editableState={editableState}
                    setTasks={setTasks}
                    onSubmitCallback={onclose}
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