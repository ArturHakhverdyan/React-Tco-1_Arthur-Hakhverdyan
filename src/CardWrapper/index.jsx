import "./styles.css"
import { USERS_FRIENDS_LIST } from "../UsersList/"
const img_URL = "https://www.blexar.com/avatar.png"
const Card = ({ user }) => {
    return (
        <div className="card">
            <img src={img_URL} alt="" />
            <p>  Name ::  {user.name}</p>
            <p> Email ::  {user.email}</p>
        </div>
    )
}

export const CardWrapper = () => {
    const UsersInfo = USERS_FRIENDS_LIST.map((item, index) => {
        return <Card key={index} user={item} />
    })
    return (
        <div>
            <div className="text">
                <h1>My Friends</h1>
            </div>
            <div className="card_wrapper">
                {UsersInfo}
            </div>
        </div>
    )
}