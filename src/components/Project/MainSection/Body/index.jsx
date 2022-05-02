import "./styles.css";
import { USERS_FRIENDS_LIST } from "../../UsersList/index"



const Card = ({ user }) => {
  return (
      <div class="card-column">
        <div class="card">
          <img src={user.img} alt="" />
          <p>    {user.name}</p>
          <button className="card-button">...</button>
        </div>
      </div>
  )
}



const CardWrapper = () => {
  const UsersInfo = USERS_FRIENDS_LIST.map((item, index) => {
    return <Card key={index} user={item} />
  })
  return (
    <div>
      <div className="card_wrapper">
        {UsersInfo}
      </div>
    </div>
  )
}
export const Body = () => {
  return <div className="main-section-body">

    <CardWrapper />
  </div>;
};
