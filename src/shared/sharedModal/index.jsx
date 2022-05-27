import { useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { DatePick } from "../../components/DatePick"
import { BACKEND_URL } from "../../consts"
import { IsRequired, MinLength3, MaxLength20, MaxLength500 } from "../../helpers/validations"
import * as moment from "moment";

const AddTaskForm = ({ onSubmitCallback, setTasks }) => {

    const [inputsData, setInputsData] = useState({
        title: {
            value: '',
            error: undefined,
            validations: [IsRequired, MinLength3, MaxLength20]
        },
        description: {
            value: '',
            error: undefined,
            validations: [IsRequired, MinLength3, MaxLength500]
        }
    })

    const [startDate, setStartDate] = useState(new Date());



    const onSubmit = (e) => {
        e.preventDefault();
        const { title: { value: title }, description: { value: description } } = inputsData
        const formData = {
            title,
            description,
            date: moment(startDate).format('YYYY-MM-DD')
        }
        fetch(`${BACKEND_URL}/task`,{
            method:"POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(formData)
        })  
        .then((response) => response.json())
        .then((data) => {
            setTasks((prev) => {
                return [...prev ,data]
            })
        })
        onSubmitCallback()
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const { validations } = inputsData[name];

        let error;

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i]
            const errorMessage = validation(value)

            if (errorMessage) {
                error = errorMessage;
                break;
            }
        }

        setInputsData((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                    error
                },
            };
        });
    }

    return (
        <Form>
            <FormGroup>
                <Label for="titleId">
                    Title
                </Label>
                <Input
                    id="titleId"
                    name="title"
                    placeholder="task Title"
                    type="text"
                    onChange={handleChange}
                    invalid={!!inputsData.title.error}
                />
                {!!inputsData.title.error && (
                    <FormFeedback>{inputsData.title.error}</FormFeedback>
                )}
            </FormGroup>
            <FormGroup>
                <Label for="descriptionId">
                    Description
                </Label>
                <Input
                    id="descriptionId"
                    name="description"
                    placeholder="task Description"
                    type="text"
                    onChange={handleChange}
                    invalid={!!inputsData.description.error}
                />
                {!!inputsData.description.error && (
                    <FormFeedback>{inputsData.description.error}</FormFeedback>
                )}

            </FormGroup>
            <FormGroup>
                <DatePick startDate = {startDate} setStartDate = {setStartDate}/>
            </FormGroup>
            <Button color="primary" onClick={onSubmit}>
                Add Task
            </Button>
            
        </Form>
    )
}


export const SharedModal = ({ onClose, setTasks }) => {
    return (
        <Modal toggle={onClose} isOpen={true}>
            <ModalHeader toggle={onClose}>
                Modal title
            </ModalHeader>
            <ModalBody>
                <AddTaskForm setTasks={setTasks} onSubmitCallback={onClose} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}