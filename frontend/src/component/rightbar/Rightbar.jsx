import './rightbar.css'
import {Users} from '../../dummy'
import Online from '../online/Online.jsx'
export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const Homerightbar=()=>{
    return (
      <div>
        <img className='rightbarAd' alt='' src={`${PF}/person/5.jpg`}/>
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="friendlist">
          {Users.map((u)=>(<Online key={u.id} user={u}/>))}
        </ul>
      </div>
    )
  };
  const Profilerightbar=()=>{
    return(
      <div>
        <h4 className='rightbartitles'>User Information</h4>
        <div className="rightbarinfo">
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">City:</span>
            <span className="rightbarinfovalue">{user.city}</span>
          </div>
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">From:</span>
            <span className="rightbarinfovalue">{user.city}</span>
          </div>
          <div className="rightbarinfoitem">
            <span className="rightbarinfokey">Qualification:</span>
            <span className="rightbarinfovalue">{user.qualification}</span>
          </div>
        </div>
        <h4 className='rightbartitle'>User Friends</h4>
        <div className="rightbarfollowings">
          <div className="rightbarfollowing">
            <img src={`${PF}/person/1.1.jpg`} alt="" className="rightbarfollowingimg" />
            <span className="rightbarfollowingName">Osama</span>
          </div>
          <div className="rightbarfollowing">
            <img src={`${PF}/person/2.jpg`} alt="" className="rightbarfollowingimg" />
            <span className="rightbarfollowingName">Osama</span>
          </div>
          <div className="rightbarfollowing">
            <img src={`${PF}/person/3.jpg`} alt="" className="rightbarfollowingimg" />
            <span className="rightbarfollowingName">Osama</span>
          </div>
          <div className="rightbarfollowing">
            <img src={`${PF}/person/4.jpg`} alt="" className="rightbarfollowingimg" />
            <span className="rightbarfollowingName">Osama</span>
          </div>
          <div className="rightbarfollowing">
            <img src={`${PF}/person/1.1.jpg`} alt="" className="rightbarfollowingimg" />
            <span className="rightbarfollowingName">Osama</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="Rightbar">
      <div className="rightbarwrapper">
        {user ? <Profilerightbar/> : <Homerightbar/>}
      </div>
    </div>
  )
}
