import './styles.css'
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap"
import { memo } from 'react';


export const CardComponent = memo(({ todo: { status, todo_at, description, title, _id },
   taskStatusChangeHendler,
   deleteCardHendler
   }) => {
    const nextStatus = status === 'active' ?'done':'active'
    console.log("ReRender");

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

            onClick={()=>taskStatusChangeHendler(_id ,nextStatus )}>
            {status}
          </Button>
          <Button style={{ marginLeft: "20px" }} onClick={()=>deleteCardHendler(_id )}>
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  )
})