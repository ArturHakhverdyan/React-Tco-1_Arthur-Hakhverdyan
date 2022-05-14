import './styles.css'
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap"
import { useState } from 'react';

export const CardComponent = ({ todo: { status, todo_at, description, title, _id }, setTasks, tasks }) => {

  const [taskStatus, setTaskStatus] = useState(status);

  const taskStatusChangeHendler = () => {
    fetch(`http://localhost:3001/task/${_id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        status: "done",
      }),
    })
      .then((res) => res.json())
      .then((task) => {
        setTaskStatus(task.status);
      });
  }

  const deleteCardHendler = () => {
    fetch(`http://localhost:3001/task/${_id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(prev=>{
         return prev.filter(task => {
            return task._id !== _id
          })
        })
      })

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
            color={taskStatus === "done" ? "danger" : "success"}
            title="Click to make Done"

            onClick={taskStatusChangeHendler}>
            {taskStatus}
          </Button>
          <Button style={{ marginLeft: "20px" }} onClick={deleteCardHendler}>
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}