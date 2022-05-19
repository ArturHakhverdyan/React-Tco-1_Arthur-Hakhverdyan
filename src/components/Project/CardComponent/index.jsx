import './styles.css'
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap"
import { memo,  useState } from 'react';
import { EditModal } from '../../../shared/editModal';


export const CardComponent = memo(({ todo,
  taskStatusChangeHendler,
  deleteCardHendler,
  setTasks
}) => {
  const { status, description, title, _id } = todo
  const nextStatus = status === 'active' ? 'done' : 'active'
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableState, setEditableState] = useState(null)

  const editOpenHandler = () => {
    if (showEditModal) {
      setShowEditModal(false)
    }
    else {
      setShowEditModal(true)
    }
    setEditableState(todo)
  }

  return (
    <div className="div-card">
      <Card>
        <CardImg
          alt="Card image cap"
          src="https://picsum.photos/318/180"
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            {title}
          </CardTitle>
          <CardText>
            {description}
          </CardText>
          <Button
            color={status === "done" ? "danger" : "success"}
            title="Click to make Done"

            onClick={() => taskStatusChangeHendler(_id, nextStatus)}>
            {status}
          </Button>
          <Button color='danger' style={{ marginLeft: "20px" }} onClick={() => deleteCardHendler(_id)}>
            Delete
          </Button>
          <Button color='warning' style={{ marginLeft: '20px' }} onClick={editOpenHandler}  >
            Edit
          </Button>
          {showEditModal && (<EditModal
          editableState={editableState}
          onclose={() => {
            setShowEditModal(false)
            setEditableState(null)
          }}
            setTasks={setTasks}
          />)}

        </CardBody>
      </Card>
    </div>
  )
})