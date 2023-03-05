import Feed from "../../component/feed/Feed";
import Sidebar from "../../component/sidebar/Sidebar";
import Rightbar from "../../component/rightbar/Rightbar";
import Topbar from "../../component/topbar/Topbar";
import Eand from "../../component/btw_S_and_F/Eand";
import './profile.css'
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router"
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setuser]=useState({})
  const username=useParams().username
  useEffect(()=>{
    const fetchuser = async () =>{
        const res = await axios.get(`/users?username=${username}`);
        setuser(res.data)
    }
    fetchuser();
  },[username])
  return (
    <div>
        <Topbar/>
        <div className="profile">
          <Sidebar/>
          <Eand/>
          <div className="profileright">
            <div className="profilerighttop">
              <div className="profilecover">
                <img src={`${PF}person/cover.jpg`} alt="" className="profilecoverimage"/>
                <img src={`${PF}person/1.1.jpg`} alt="" className="profileuserimage"/>
              </div>
              <div className="profileinfo">
                <h4 className="profileinfoName">{user.username}</h4>
                <span className="profileinfodesc">{user.bio}</span>
              </div>
            </div>
            <div className="profilerightbotttom">
              <Feed username={username}/>
            </div>
          </div>
        </div>      
      </div>
  )
}
