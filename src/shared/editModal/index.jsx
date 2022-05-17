import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

export const EditModal = ({onclose}) => {
    return (
        <Modal toggle={onclose} isOpen={true}>
            <ModalHeader toggle={onclose}>
                Modal title
            </ModalHeader>
            <ModalBody>
            <Label for="titleId">
                    Title
                </Label>
                <Input id="titleId"
                    name="title"
                    placeholder="task Title"
                    type="text" />
                    <Label for="descriptionId">
                    Description
                </Label>
                <Input id="descriptionId"
                    name="description"
                    placeholder="task Description"
                    type="text" />
                    <Label for="idId">
                    ID
                </Label>
                <Input id = 'idId'
                name = 'id' 
                placeholder="ID"
                type="text"/>

            </ModalBody>
            <ModalFooter>
                <Button >
                    Done
                </Button>
                <Button onClick={onclose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}