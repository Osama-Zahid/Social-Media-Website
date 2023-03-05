import './online.css'

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <li className="rightbarfriend">
        <div className="rightbarprofile">
            <img src={PF+user.profilePicture} alt='' className='rightbarprofileimg'/>
            <span className="rightbaronline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
    </li>
    </div>
  )
}
