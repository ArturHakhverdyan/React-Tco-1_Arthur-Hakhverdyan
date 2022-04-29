import './styles.css'
import { USERS_FRIENDS_LIST } from '../FacebookFriendsList'

const ImgWrap = ({ user }) => {
    const img = 'https://w7.pngwing.com/pngs/246/366/png-transparent-computer-icons-avatar-user-profile-man-avatars-logo-monochrome-black.png'
    return (

        <div className='facebook-div'>
            <img src={img} alt="" className='facebook-logo' />
            <p> <span>Name ::</span>  {user.name}</p>
            <p> <span>Email ::</span> {user.email}</p>
        </div>
    )
}

export const FacebookList = () => {

    const usersJsx = USERS_FRIENDS_LIST.map((user, index) => {
        return <ImgWrap key={index} user={user} />
    })
    return (
        <div >
            <div className='headerBlock'>
                <h1 className='h1'>Artur Hakhverdyan Friends List</h1>
            </div>
            <div className='mainBlock'>
                {usersJsx}
            </div>
        </div>
    )
}