import './styles.css'
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap"

export const CardComponent = ({ todo: { status, todo_at, description, title } }) => {
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
          <Button>
            Done
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}